/************************************************************************
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 *************************************************************************
 */

#include <exception>
#include <stdexcept>
#include <string>

#include <cstdio>
#include <iostream>
#include <vector>
#include <thread>

// #include <uwebsockets/App.h>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h> // For additional helper functions
#include <windows.h>  // Ensure this comes after winsock2.h

#endif

#include "../src/utilities/UxpAddon.h"
#include "../src/utilities/UxpTask.h"
#include "../src/utilities/UxpValue.h"

namespace {

    std::string execSyncWin(const char* cmd) {
        #ifdef _WIN32
            std::string result;
            HANDLE hPipeRead, hPipeWrite;

            SECURITY_ATTRIBUTES saAttr = { sizeof(SECURITY_ATTRIBUTES) };
            saAttr.bInheritHandle = TRUE;  // Ensure the read handle to the pipe for STDOUT is inherited.
            saAttr.lpSecurityDescriptor = NULL;

            // Create a pipe for the child process's STDOUT.
            if (!CreatePipe(&hPipeRead, &hPipeWrite, &saAttr, 0))
                throw std::runtime_error("Failed to create pipe");

            STARTUPINFOA si = { sizeof(STARTUPINFOA) };
            si.dwFlags = STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES;
            si.hStdOutput = hPipeWrite;
            si.hStdError = hPipeWrite;
            si.wShowWindow = SW_HIDE;  // Prevents cmd window from flashing.
                                        // Requires STARTF_USESHOWWINDOW in dwFlags.

            PROCESS_INFORMATION pi = { 0 };

            std::string commandStr = cmd;
            if (commandStr.find(".exe") == std::string::npos) {
                // Prepend with cmd.exe path and /C switch
                commandStr = "C:\\Windows\\System32\\cmd.exe /C " + commandStr;
            }


            // Create a child process that uses the previously created pipes for STDOUT.
            if (!CreateProcessA(NULL, (LPSTR)commandStr.c_str(), NULL, NULL, TRUE, 0, NULL, NULL, &si, &pi)) {
                CloseHandle(hPipeWrite);
                CloseHandle(hPipeRead);
                throw std::runtime_error("Failed to create process");
            }

            CloseHandle(hPipeWrite);  // Close the write end of the pipe before reading from the read end of the pipe.

            // Read output from the child process's pipe for STDOUT and write to the parent process's pipe for STDOUT.
            DWORD dwRead;
            CHAR chBuf[4096];
            bool bSuccess = FALSE;
            for (;;) {
                bSuccess = ReadFile(hPipeRead, chBuf, 4096, &dwRead, NULL);
                if (!bSuccess || dwRead == 0) break;

                std::string part(chBuf, dwRead);
                result += part;
            }

            CloseHandle(hPipeRead);

            // Wait for the child process to exit.
            WaitForSingleObject(pi.hProcess, INFINITE);

            // Close process and thread handles.
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);

            return result;
        #else
        // For non-Windows systems, return an empty string or handle differently as needed
        return "";
        #endif
    }

std::string execSyncMac(const char* cmd) {
    char buffer[128];
    std::string result = "";
    
    #ifdef __APPLE__
        FILE* pipe = popen(cmd, "r");
    #elif _WIN32
        FILE* pipe = _popen(cmd, "r");
    #endif
    
    
    if (!pipe) throw std::runtime_error("popen() failed!");
    try {
        while (fgets(buffer, sizeof buffer, pipe) != NULL) {
            result += buffer;
        }
    }
    catch (...) {
        #ifdef __APPLE__
            pclose(pipe);
        #elif _WIN32
            _pclose(pipe);
        #endif
        throw;
    }
    #ifdef __APPLE__
        pclose(pipe);
    #elif _WIN32
        _pclose(pipe);
    #endif
    return result;
}

addon_value ExecSync(addon_env env, addon_callback_info info)
{
    addon_status status;
    addon_value msg;
    size_t argc = 1;
    addon_value argv[1];

    status = UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, argv, NULL, NULL);
    if (status != addon_ok)
    {
        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
    }

    // Get length of param
    size_t name_length;
    status = UxpAddonApis.uxp_addon_get_value_string_utf8(env, argv[0], NULL, 0, &name_length);

    char *name = new char[name_length + 1];
    if (name == nullptr)
    {
        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Invalid function name allocation");
        return nullptr;
    }

    // Get value of param
    status = UxpAddonApis.uxp_addon_get_value_string_utf8(env, argv[0], name, name_length + 1, &name_length);
    name[name_length] = '\0';

    std::string output;

#ifdef __APPLE__
    output = execSyncMac(name);
#elif _WIN32
    output = execSyncWin(name);
#else

#endif


    status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &msg);
    if (status != addon_ok) {
        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Unable to create string");
    }
    delete[] name; // Don't forget to delete the dynamically allocated memory
    return msg;

    //return nullptr;
}


///  EXEC

addon_value Exec(addon_env env, addon_callback_info info) {
    try {        
        // Allocate space for the first argument
        addon_value arg1;
        size_t argc = 1;
        Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

        // Convert the first argument to a value that can be retained past the
        // return from this function. This is needed if you want to pass arguments
        // to an asynchronous/deferred task hand;er
        Value stdValue(env, arg1);

        // Create a heap copy using move. This prevents a deep copy of the data & we can pass that
        // ptr to another context
        std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(stdValue)));

        auto scriptThreadHandler = [](Task& task, addon_env env, addon_deferred deferred, std::string str) {
            try {
                HandlerScope scope(env);

                bool isError = false;
                addon_value resultValue;
                addon_status status;

                //status = UxpAddonApis.uxp_addon_create_string_utf8(env, str.c_str(), str.size(), &resultValue);

                std::string output;
                char* name = &str[0];
                name[str.length()] = '\0';

#ifdef __APPLE__
                output = execSyncMac(name);
#elif _WIN32
                output = execSyncWin(name);
#else

#endif

                status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &resultValue);
      
                if (status != addon_ok)
                {
                    UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
                    isError = true;
                }
                // std::this_thread::sleep_for(std::chrono::seconds(5)); // Test Delay

                if (isError) {
                    Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                }
                else {
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            }
            catch (...) {
                std::string errMsg = "There was an error.";
                addon_value resultValue;
                addon_status status;
                status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
            }
        };

        auto mainThreadHandler = [valuePtr, scriptThreadHandler](Task& task) {
            try {
                // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)
                addon_env env = task.GetEnv();
                addon_deferred deferred = task.GetDeferred();
                
                // manually pass string to new thread
                auto resultOg = valuePtr.get();
                const Value& result = *resultOg;
                auto str = result.GetString();                


                // Launch scriptThreadHandler on a native thread
                std::thread nativeThread([&task, env, deferred, str, scriptThreadHandler]() {
                    scriptThreadHandler(task, env, deferred, str);
                    });
                nativeThread.detach();
            }
            catch (...) {
                
                addon_env env = task.GetEnv();
                addon_deferred deferred = task.GetDeferred();

                std::string errMsg = "There was an error.";
                addon_value resultValue;
                addon_status status;                
                status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
            }
        };

        auto task = Task::Create();
        return task->ScheduleOnMainThread(env, mainThreadHandler);
    }
    catch (...) {
        return CreateErrorFromException(env);
    }
}

///
///
/// EXAMPLE UXP HYBRID PLUGIN FUNCTIONS FROM ADOBE
///
///


/*
 * The function is used to return 'hello world' message.
 * Javascript equivalent function() { return 'hello world'; }; in C++
 * No entry point should throw an exception. The implementation must use try/catch
 * and return nullptr if an exception was caught.
 * This method is invoked on the JavaScript thread.
 */
addon_value MyFunction(addon_env env, addon_callback_info info) {
    try {
        addon_value message = nullptr;
        Check(UxpAddonApis.uxp_addon_create_string_utf8(env, "hello world", 11, &message));
        return message;
    } catch (...) {
        return CreateErrorFromException(env);
    }
}

/*
 * This function will echo the provided argument after converting to and from a
 * standard value type.
 * No entry point should throw an exception. The implementation must use try/catch
 * and return nullptr if an exception was caught.
 * This method is invoked on the JavaScript thread.
 */
addon_value MyEcho(addon_env env, addon_callback_info info) {
    try {
        // Allocate space for the first argument
        addon_value arg1;
        size_t argc = 1;
        Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

        // Convert the first argument to a value that can be retained past the
        // return from this function. This is needed if you want to pass arguments
        // to an asynchronous/deferred task handler
        Value stdValue(env, arg1);

        return stdValue.Convert(env);
    } catch (...) {
        return CreateErrorFromException(env);
    }
}

/*
 * This function will echo the provided argument after converting to and from a
 * standard value type.
 * The implementation illustrates how to create an asynchronous task, where the
 * initial call returns a promise/deferred which is then later resolved.
 * No entry point should throw an exception. The implementation must use try/catch
 * and return nullptr if an exception was caught.
 * This method is invoked on the JavaScript thread.
 */
addon_value MyAsyncEcho(addon_env env, addon_callback_info info) {
    try {
        // Allocate space for the first argument
        addon_value arg1;
        size_t argc = 1;
        Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

        // Convert the first argument to a value that can be retained past the
        // return from this function. This is needed if you want to pass arguments
        // to an asynchronous/deferred task hand;er
        Value stdValue(env, arg1);

        // Create a heap copy using move. This prevents a deep copy of the data & we can pass that
        // ptr to another context
        std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(stdValue)));

        auto scriptThreadHandler = [](Task& task, addon_env env, addon_deferred deferred) {
            try {
                HandlerScope scope(env);
                bool isError = false;
                const Value& result = task.GetResult(isError);
                addon_value resultValue = result.Convert(env);

                if (isError)
                    Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                else
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
            } catch (...) {
            }
        };

        auto mainThreadHandler = [valuePtr, scriptThreadHandler](Task& task) {
            try {
                task.SetResult(std::move(*(valuePtr.get())), false);
                task.ScheduleOnScriptingThread(scriptThreadHandler);
            } catch (...) {
            }
        };

        auto task = Task::Create();
        return task->ScheduleOnMainThread(env, mainThreadHandler);
    } catch (...) {
        return CreateErrorFromException(env);
    }
}

#pragma comment(lib, "Ws2_32.lib")

#define PORT 8080
#define BUFFER_SIZE 1024

addon_value StartServerNative(addon_env env, addon_callback_info info) {
    try {
        // Allocate space for the callback argument
        addon_value callback;
        size_t argc = 1;
        Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &callback, nullptr, nullptr));

        // Convert the callback argument
        Value callbackValue(env, callback);
        std::shared_ptr<Value> callbackPtr(std::make_shared<Value>(std::move(callbackValue)));

        auto serverThread = [callbackPtr]() {
            try {
                WSADATA wsaData;
                SOCKET serverSocket, clientSocket;
                struct sockaddr_in serverAddr, clientAddr;
                char buffer[BUFFER_SIZE];
                int addrLen = sizeof(clientAddr);

                // Initialize Winsock
                if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
                    std::cerr << "WSAStartup failed." << std::endl;
                    return;
                }

                // Create server socket
                serverSocket = socket(AF_INET, SOCK_STREAM, 0);
                if (serverSocket == INVALID_SOCKET) {
                    std::cerr << "Socket creation failed." << std::endl;
                    WSACleanup();
                    return;
                }

                // Configure server address
                serverAddr.sin_family = AF_INET;
                serverAddr.sin_addr.s_addr = INADDR_ANY;
                serverAddr.sin_port = htons(PORT);

                // Bind socket
                if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == SOCKET_ERROR) {
                    std::cerr << "Socket bind failed." << std::endl;
                    closesocket(serverSocket);
                    WSACleanup();
                    return;
                }

                // Listen for connections
                if (listen(serverSocket, 3) == SOCKET_ERROR) {
                    std::cerr << "Listen failed." << std::endl;
                    closesocket(serverSocket);
                    WSACleanup();
                    return;
                }

                std::cout << "Server listening on port " << PORT << std::endl;

                while (true) {
                    // Accept client connection
                    clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &addrLen);
                    if (clientSocket == INVALID_SOCKET) {
                        std::cerr << "Client connection failed." << std::endl;
                        continue;
                    }

                    std::cout << "Client connected." << std::endl;

                    // Receive data
                    int bytesRead = recv(clientSocket, buffer, BUFFER_SIZE, 0);
                    if (bytesRead > 0) {
                        buffer[bytesRead] = '\0';
                        std::cout << "Received: " << buffer << std::endl;

                        // Echo back data
                        send(clientSocket, buffer, bytesRead, 0);
                    }

                    closesocket(clientSocket);
                }

                closesocket(serverSocket);
                WSACleanup();
            }
            catch (const std::exception& e) {
                std::cerr << "Server thread exception: " << e.what() << std::endl;
            }
        };

        // Run server on a separate thread
        std::thread(serverThread).detach();

        // Return success
        // UxpAddonApis.uxp_addon
        // return UxpAddonApis.uxp_addon_create_boolean(env, true);
    }
    catch (...) {
        return CreateErrorFromException(env);
    }
}


addon_value StartServer(addon_env env, addon_callback_info info) {
 //   try {
 //       // Allocate space for the callback argument
 //       addon_value callback;
 //       size_t argc = 1;
 //       Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &callback, nullptr, nullptr));
 //
 //       // Convert the callback argument
 //       Value callbackValue(env, callback);
 //       std::shared_ptr<Value> callbackPtr(std::make_shared<Value>(std::move(callbackValue)));
 //
 //       auto serverThread = [callbackPtr]() {
 //           try {
 //               uWS::App().ws<struct PerSocketData>("/*", {
 //                   /* Settings */
 //                   .compression = uWS::DEDICATED_COMPRESSOR_3KB,
 //                   .maxPayloadLength = 16 * 1024,
 //                   .idleTimeout = 10,
 //                   .open = [](auto* ws, auto* req) {
 //                       std::cout << "WebSocket connection opened." << std::endl;
 //                   },
 //                   .message = [](auto* ws, std::string_view message, uWS::OpCode opCode) {
 //                       std::cout << "Received: " << message << std::endl;
 //                       ws->send(message, opCode); // Echo back the message
 //                   },
 //                   .close = [](auto* ws, int code, std::string_view message) {
 //                       std::cout << "WebSocket connection closed." << std::endl;
 //                   }
 //                   }).listen(8080, [](auto* token) {
 //                       if (token) {
 //                           std::cout << "Server listening on port 8080." << std::endl;
 //                       }
 //                       else {
 //                           std::cerr << "Failed to start server." << std::endl;
 //                       }
 //                       }).run();
 //           }
 //           catch (const std::exception& e) {
 //               std::cerr << "Server thread exception: " << e.what() << std::endl;
 //           }
 //       };
 //
 //       // Run server on a separate thread
 //       std::thread(serverThread).detach();
 //
 //       // Return success
 //       return UxpAddonApis.uxp_addon_create_boolean(env, true);
 //   }
 //   catch (...) {
        return CreateErrorFromException(env);
 //   }
}



/* Method invoked when the addon module is being requested by JavaScript
 * This method is invoked on the JavaScript thread.
 */
addon_value Init(addon_env env, addon_value exports, const addon_apis& addonAPIs) {
    addon_status status = addon_ok;
    addon_value fn = nullptr;

    // PRODUCTION FUNCTIONS
    
    // execSync
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, ExecSync, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "execSync", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }
 
    // exec
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, Exec, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "exec", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }

    // R&D FUNCTIONS

    // StartServer
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, StartServer, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "start_server", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }

    // ADOBE EXAMPLE FUNCTIONS

    // MyFunction
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyFunction, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_function", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }

    // MyEcho
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyEcho, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_echo", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }

    // MyAsyncEcho
    {
        status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyAsyncEcho, NULL, &fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
        }

        status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_echo_async", fn);
        if (status != addon_ok) {
            addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
        }
    }

    return exports;
}

}  // namespace

/*
 * Register initialization routine
 * Invoked by UXP during uxpaddon load.
 */
UXP_ADDON_INIT(Init)

void terminate(addon_env env) {
    try {
    } catch (...) {
    }
}

/* Register addon termination routine
 * Invoked by UXP during uxpaddon un-load.
 */
UXP_ADDON_TERMINATE(terminate)
