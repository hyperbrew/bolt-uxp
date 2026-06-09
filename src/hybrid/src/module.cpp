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

#ifdef _WIN32
#include <windows.h>
#endif

#include "../src/utilities/UxpAddon.h"
#include "../src/utilities/UxpTask.h"
#include "../src/utilities/UxpValue.h"

namespace
{

    std::string execWin(const char *cmd)
    {
#ifdef _WIN32
        try
        {
            std::string result;
            HANDLE hPipeRead, hPipeWrite;

            SECURITY_ATTRIBUTES saAttr = {sizeof(SECURITY_ATTRIBUTES)};
            saAttr.bInheritHandle = TRUE; // Ensure the read handle to the pipe for STDOUT is inherited.
            saAttr.lpSecurityDescriptor = NULL;

            // Create a pipe for the child process's STDOUT.
            if (!CreatePipe(&hPipeRead, &hPipeWrite, &saAttr, 0))
                throw std::runtime_error("Failed to create pipe");

            STARTUPINFOA si = {sizeof(STARTUPINFOA)};
            si.dwFlags = STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES;
            si.hStdOutput = hPipeWrite;
            si.hStdError = hPipeWrite;
            si.wShowWindow = SW_HIDE; // Prevents cmd window from flashing.
                                      // Requires STARTF_USESHOWWINDOW in dwFlags.

            PROCESS_INFORMATION pi = {0};

            std::string commandStr = cmd;
            if (commandStr.find(".exe") == std::string::npos)
            {
                // Prepend with cmd.exe path and /C switch
                commandStr = "C:\\Windows\\System32\\cmd.exe /C " + commandStr;
            }

            // Create a child process that uses the previously created pipes for STDOUT.
            if (!CreateProcessA(NULL, (LPSTR)commandStr.c_str(), NULL, NULL, TRUE, 0, NULL, NULL, &si, &pi))
            {
                CloseHandle(hPipeWrite);
                CloseHandle(hPipeRead);
                std::string msg = "Failed to create process";
                return msg;
            }

            CloseHandle(hPipeWrite); // Close the write end of the pipe before reading from the read end of the pipe.

            // Read output from the child process's pipe for STDOUT and write to the parent process's pipe for STDOUT.
            DWORD dwRead;
            CHAR chBuf[4096];
            bool bSuccess = FALSE;
            for (;;)
            {
                bSuccess = ReadFile(hPipeRead, chBuf, 4096, &dwRead, NULL);
                if (!bSuccess || dwRead == 0)
                    break;

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
        }
        catch (int err)
        {
            return std::to_string(err);
        }
#else
        // For return empty for non-Windows systems
        return "";
#endif
    }

    std::string execMac(const char *cmd)
    {
        char buffer[128];
        std::string result = "";

#ifdef __APPLE__
        FILE *pipe = popen(cmd, "r");
#elif _WIN32
        FILE *pipe = _popen(cmd, "r");
#endif

        if (!pipe)
            throw std::runtime_error("popen() failed!");
        try
        {
            while (fgets(buffer, sizeof buffer, pipe) != NULL)
            {
                result += buffer;
            }
        }
        catch (...)
        {
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
        // Mac Code
        output = execMac(name);
#elif _WIN32
        output = execWin(name);
#else

#endif

        status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &msg);
        if (status != addon_ok)
        {
            UxpAddonApis.uxp_addon_throw_error(env, NULL, "Unable to create string");
        }
        delete[] name; // Don't forget to delete the dynamically allocated memory
        return msg;

        // return nullptr;
    }

    // * execAsync - is blocking the UXP Plugin
    // *
    // *
    // *
    // *

    addon_value ExecAsync(addon_env env, addon_callback_info info)
    {
        try
        {
            // Allocate space for the first argument
            addon_status status;
            addon_value arg1;
            size_t argc = 1;
            Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

            // status = UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, NULL, NULL);
            // if (status != addon_ok)
            // {
            //     UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
            // }

            // // Get length of param
            // size_t name_length;
            // status = UxpAddonApis.uxp_addon_get_value_string_utf8(env, arg1, NULL, 0, &name_length);

            // char *name = new char[name_length + 1];
            // if (name == nullptr)
            // {
            //     UxpAddonApis.uxp_addon_throw_error(env, NULL, "Invalid function name allocation");
            //     return nullptr;
            // }

            // // Get value of param
            // status = UxpAddonApis.uxp_addon_get_value_string_utf8(env, arg1, name, name_length + 1, &name_length);
            // name[name_length] = '\0';

            // Convert the first argument to a value that can be retained past the
            // return from this function. This is needed if you want to pass arguments
            // to an asynchronous/deferred task handler
            Value stdValue(env, arg1);

            // Create a heap copy using move. This prevents a deep copy of the data & we can pass that
            // ptr to another context
            std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(stdValue)));

            auto scriptThreadHandler = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    addon_status status;
                    addon_value msg;

                    std::string nameStr = result.GetString();
                    const char *name = nameStr.c_str();
                    // UxpAddonApis.uxp_addon_get_value_string_utf8(env, argv[0], result, name_length + 1, &name_length);
                    // name[name_length] = '\0';

                    std::string output;

#ifdef __APPLE__
                    // Mac Code
                    output = execMac(name);
#elif _WIN32
                    output = execWin(name);
#else

#endif

                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &msg);
                    if (status != addon_ok)
                    {
                        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Unable to create string");
                    }
                    // delete[] name; // Don't forget to delete the dynamically allocated memory

                    if (isError)
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, msg));
                    else
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, msg));
                }
                catch (...)
                {
                }
            };

            auto mainThreadHandler = [valuePtr, scriptThreadHandler](Task &task)
            {
                try
                {
                    task.SetResult(std::move(*(valuePtr.get())), false);
                    task.ScheduleOnScriptingThread(scriptThreadHandler);
                }
                catch (...)
                {
                }
            };

            auto task = Task::Create();
            return task->ScheduleOnMainThread(env, mainThreadHandler);
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    // * Exec is non-blocking
    // *
    // *
    // *
    // *

    // * Version A: Script > Main > Middle > Main > Script
    // *
    // * This version doesn't throw errors but fails to resolve even though it seeems like it should work
    // * Script Thread > Main Thread > Middle Thread > Main Thread > Script Thread
    addon_value ExecA(addon_env env, addon_callback_info info)
    {
        try
        {
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

            auto scriptThreadHandlerFinal = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    // addon_status status;

                    /*status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &resultValue);

                    if (status != addon_ok)
                    {
                        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
                        isError = true;
                    }*/
                    if (isError)
                    {
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    }
                    else
                    {
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                    }
                }
                catch (...)
                {
                }
            };

            auto mainThreadHandler2 = [valuePtr, scriptThreadHandlerFinal](Task &task)
            {
                try
                {
                    // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)
                    // addon_env env = task.GetEnv();
                    // addon_deferred deferred = task.GetDeferred();

                    // manually pass string to new thread
                    // auto resultOg = valuePtr.get();
                    // const Value& result = *resultOg;
                    // auto str = result.GetString();

                    // Launch Final Scripting Task
                    task.SetResult(std::move(*(valuePtr.get())), false);
                    task.ScheduleOnScriptingThread(scriptThreadHandlerFinal);
                }
                catch (...)
                {

                    addon_env env = task.GetEnv();
                    addon_deferred deferred = task.GetDeferred();

                    std::string errMsg = "There was an error.";
                    addon_value resultValue;
                    addon_status status;
                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            };

            auto middleThreadHandler = [scriptThreadHandlerFinal, mainThreadHandler2](Task &task, addon_env env, addon_deferred deferred, std::string str)
            {
                try
                {
                    HandlerScope scope(env);

                    bool isError = false;
                    addon_value resultValue;
                    addon_status status;

                    std::string output;

                    // Can't access these functions in a middle thread
                    // const Value& result = task.GetResult(isError);
                    // auto nameStr = result.GetString();
                    // nameStr[nameStr.length()] = '\0';
                    // const char *name = nameStr.c_str();

                    char *name = &str[0];
                    name[str.length()] = '\0';

#ifdef __APPLE__
                    output = execMac(name);
#elif _WIN32
                    output = execWin(name);
#else
#endif

                    // std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(result)));
                    // std::shared_ptr<Value> valuePtr2(std::make_shared<Value>(std::move(result)));

                    try
                    {
                        //!!!!!!!!!!!!!!!!!!!!!!!!!TODO: Pass output into setResult
                        // task.SetResult(output, false);
                        // task.SetResult(std::move(*(valuePtr.get())), false);
                        // task.ScheduleOnScriptingThread(scriptThreadHandlerFinal);

                        auto task = Task::Create();
                        return task->ScheduleOnMainThread(env, mainThreadHandler2);
                    }
                    catch (...)
                    {
                    }
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                    addon_value resultValue;
                    addon_status status;
                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            };

            auto mainThreadHandler = [valuePtr, middleThreadHandler, scriptThreadHandlerFinal, mainThreadHandler2](Task &task)
            {
                try
                {
                    // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)
                    addon_env env = task.GetEnv();
                    addon_deferred deferred = task.GetDeferred();

                    // manually pass string to new thread
                    auto resultOg = valuePtr.get();
                    const Value &result = *resultOg;
                    auto str = result.GetString();

                    // Launch scriptThreadHandler on a native thread
                    std::thread nativeThread([&task, env, deferred, middleThreadHandler, str]()
                                             { middleThreadHandler(task, env, deferred, str); });
                    nativeThread.detach();
                }
                catch (...)
                {

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
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    // * Version A1: Simplified

    addon_value ExecA1(addon_env env, addon_callback_info info)
    {
        try
        {
            addon_value arg1;
            size_t argc = 1;
            Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));
            Value stdValue(env, arg1);
            std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(stdValue)));

            auto scriptThreadHandlerFinal = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    // addon_status status;

                    /*status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &resultValue);

                    if (status != addon_ok)
                    {
                        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
                        isError = true;
                    }*/
                    if (isError)
                    {
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    }
                    else
                    {
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                    }
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                }
            };

            auto mainThreadHandler2 = [valuePtr, scriptThreadHandlerFinal](Task &task)
            {
                try
                {
                    // task.SetResult(std::move(*(valuePtr.get())), false);
                    task.ScheduleOnScriptingThread(scriptThreadHandlerFinal);
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                }
            };

            auto middleThreadHandler = [mainThreadHandler2](Task &task, addon_env env, addon_deferred deferred, std::string str)
            {
                try
                {
                    HandlerScope scope(env);

                    bool isError = false;
                    addon_value resultValue;
                    addon_status status;

                    std::string output;
                    char *name = &str[0];
                    name[str.length()] = '\0';

#ifdef __APPLE__
                    output = execMac(name);
#elif _WIN32
                    output = execWin(name);
#else
#endif
                    try
                    {
                        //!!!!!!!!!!!!!!!!!!!!!!!!!TODO: Pass output into setResult
                        // task.SetResult(output, false);
                        // task.SetResult(std::move(*(valuePtr.get())), false);
                        auto task2 = Task::Create();
                        // task2->SetResult(std::move(*(output)), false);
                        return task2->ScheduleOnMainThread(env, mainThreadHandler2);
                        // task.ScheduleOnMainThread(env, mainThreadHandler2);
                    }
                    catch (...)
                    {
                        std::string errMsg = "There was an error.";
                    }
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                }
            };

            auto mainThreadHandler = [valuePtr, middleThreadHandler](Task &task)
            {
                try
                {
                    // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)

                    addon_env env = task.GetEnv();
                    addon_deferred deferred = task.GetDeferred();

                    // manually pass string to new thread
                    auto resultOg = valuePtr.get();
                    const Value &result = *resultOg;
                    auto str = result.GetString();

                    // Launch scriptThreadHandler on a native thread
                    std::thread nativeThread([&task, env, deferred, middleThreadHandler, str]()
                                             { middleThreadHandler(task, env, deferred, str); });
                    nativeThread.detach();
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                }
            };

            auto task = Task::Create();
            return task->ScheduleOnMainThread(env, mainThreadHandler);
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    // * Version B: Script > Middle > Main > Script
    // *
    // * Verdict: ______
    // * Script Thread > Middle Thread > Main Thread > Script Thread
    addon_value ExecB(addon_env env, addon_callback_info info)
    {
        try
        {
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

            auto scriptThreadHandlerFinal = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    // addon_status status;

                    /*status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &resultValue);

                    if (status != addon_ok)
                    {
                        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
                        isError = true;
                    }*/
                    if (isError)
                    {
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    }
                    else
                    {
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                    }
                }
                catch (...)
                {
                }
            };

            auto mainThreadHandler2 = [valuePtr, scriptThreadHandlerFinal](Task &task)
            {
                try
                {
                    // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)
                    // addon_env env = task.GetEnv();
                    // addon_deferred deferred = task.GetDeferred();

                    // manually pass string to new thread
                    // auto resultOg = valuePtr.get();
                    // const Value& result = *resultOg;
                    // auto str = result.GetString();

                    // Launch Final Scripting Task
                    task.SetResult(std::move(*(valuePtr.get())), false);
                    task.ScheduleOnScriptingThread(scriptThreadHandlerFinal);
                }
                catch (...)
                {

                    addon_env env = task.GetEnv();
                    addon_deferred deferred = task.GetDeferred();

                    std::string errMsg = "There was an error.";
                    addon_value resultValue;
                    addon_status status;
                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            };

            auto middleThreadHandler = [scriptThreadHandlerFinal, mainThreadHandler2](std::string str, addon_env env)
            {
                try
                {
                    // addon_env env = task.GetEnv();
                    // HandlerScope scope(env);

                    bool isError = false;
                    addon_value resultValue;
                    addon_status status;

                    std::string output;

                    // Can't access these functions in a middle thread
                    // const Value& result = task.GetResult(isError);
                    // auto nameStr = result.GetString();
                    // nameStr[nameStr.length()] = '\0';
                    // const char *name = nameStr.c_str();

                    char *name = &str[0];
                    name[str.length()] = '\0';

#ifdef __APPLE__
                    output = execMac(name);
#elif _WIN32
                    output = execWin(name);
#else
#endif

                    // std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(result)));
                    // std::shared_ptr<Value> valuePtr2(std::make_shared<Value>(std::move(result)));

                    try
                    {
                        auto task = Task::Create();
                        task->ScheduleOnScriptingThread(scriptThreadHandlerFinal);

                        //!!!!!!!!!!!!!!!!!!!!!!!!!TODO: Pass output into setResult
                        // task.SetResult(output, false);
                        // task.SetResult(std::move(*(valuePtr.get())), false);
                        //  task.ScheduleOnScriptingThread(scriptThreadHandlerFinal);

                        // return task->ScheduleOnMainThread(env, mainThreadHandler2);
                    }
                    catch (...)
                    {
                    }
                }
                catch (...)
                {
                }
            };

            auto resultOg = valuePtr.get();
            const Value &result = *resultOg;
            auto str = result.GetString();
            std::thread nativeThread([middleThreadHandler, str, env]()
                                     { middleThreadHandler(str, env); });
            nativeThread.detach();
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    //* broken currently
    addon_value ExecC(addon_env env, addon_callback_info info)
    {
        try
        {
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

            auto scriptThreadHandler = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);

                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    addon_status status;

                    // status = UxpAddonApis.uxp_addon_create_string_utf8(env, str.c_str(), str.size(), &resultValue);

                    /*if (status != addon_ok)
                    {
                        UxpAddonApis.uxp_addon_throw_error(env, NULL, "Failed to pass the arguments");
                        isError = true;
                    }*/
                    // std::this_thread::sleep_for(std::chrono::seconds(5)); // Test Delay

                    if (isError)
                    {
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    }
                    else
                    {
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                    }
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                    addon_value resultValue;
                    addon_status status;
                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, errMsg.c_str(), errMsg.size(), &resultValue);
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            };

            auto mainThreadHandler = [valuePtr, scriptThreadHandler](Task &task)
            {
                try
                {
                    // Access `mEnv` and `mDeferred` directly (updated get methods in UxpTask.h)
                    addon_env env = task.GetEnv();
                    addon_deferred deferred = task.GetDeferred();

                    // manually pass string to new thread
                    auto resultOg = valuePtr.get();
                    const Value &result = *resultOg;
                    auto str = result.GetString();
                    task.SetResult(std::move(*(valuePtr.get())), false);

                    // Launch scriptThreadHandler on a native thread

                    // auto task2 = Task::Create();

                    std::thread nativeThread([&task, env, deferred, str, scriptThreadHandler]()
                                             {

                    bool isError = false;
                    const Value& result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);
                    addon_status status;

                    auto cmdStr = result.GetString();
                    const char *cmd = cmdStr.c_str();
                    std::string output;

#ifdef __APPLE__
                        output = execMac(cmd);
#elif _WIN32
                    output = execWin(cmd);
#else
#endif

                    status = UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &resultValue);
                    //task.SetResult(resultValue, false);
                    std::shared_ptr<Value> valuePtr(std::make_shared<Value>(std::move(resultValue)));
                    task.SetResult(std::move(*(valuePtr.get())), false);
                    // scriptThreadHandler(task, env, deferred, str);
                    task.ScheduleOnScriptingThread(scriptThreadHandler); });
                    // nativeThread.detach();
                }
                catch (...)
                {

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
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    // rewrite from scratch, more errors than before...
    addon_value ExecD(addon_env env, addon_callback_info info)
    {
        try
        {
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

            /*std::string output;
            std::shared_ptr<std::string> valuePtr(std::make_shared<std::string>(std::move(output)));*/

            auto scriptThreadHandler = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);

                    if (isError)
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    else
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
                catch (...)
                {
                }
            };

            auto mainThreadHandlerMiddle = [valuePtr, scriptThreadHandler](Task &task)
            {
                try
                {
                    // addon_value msg;
                    //  addon_env env = task.GetEnv();
                    //  UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &msg);

                    // // store value on heap then add to task
                    // Value stdValue(env, msg);
                    // std::shared_ptr<Value> valuePtr2(std::make_shared<Value>(std::move(stdValue)));
                    // task.SetResult(std::move(*(valuePtr2.get())), false);

                    // Run Final Thread on Script Thread
                    task.ScheduleOnScriptingThread(scriptThreadHandler);
                }
                catch (...)
                {
                }
            };
            auto mainThreadHandlerStart = [valuePtr, mainThreadHandlerMiddle](Task &task)
            {
                try
                {
                    // Launch child nativeThread from main thread to process in background
                    std::thread nativeThread([&task, valuePtr, mainThreadHandlerMiddle]()
                                             {
                                                 // Convert Command to C_STR
                                                 auto value = &valuePtr;
                                                 auto str = value->get()->GetString();
                                                 const char *cmd = str.c_str();
                                                 std::string outputNew;

// Run Command
#ifdef __APPLE__
                                                 outputNew = execMac(cmd);
#elif _WIN32
                                                 outputNew = execWin(cmd);
#else
#endif

                                                 // not working currently
                                                 // output = outputNew;

                                                 // output = outputNew;
                                                 // *valuePtr =

                                                 //! Currently causes access violation

                                                 // // create addon value from output
                                                 addon_value msg;
                                                 addon_env env = task.GetEnv();
                                                 // UxpAddonApis.uxp_addon_create_string_utf8(env, output.c_str(), output.size(), &msg);

                                                 // // store value on heap then add to task
                                                 // Value stdValue(env, msg);
                                                 // std::shared_ptr<Value> valuePtr2(std::make_shared<Value>(std::move(stdValue)));
                                                 // task.SetResult(std::move(*(valuePtr2.get())), false);

                                                 // Run Final Thread on Script Thread
                                                 task.ScheduleOnMainThread(env, mainThreadHandlerMiddle);

                                                 //! Access Violation
                                                 // task.ScheduleOnScriptingThread(scriptThreadHandler);
                                             });
                    nativeThread.detach();
                }
                catch (...)
                {
                }
            };

            auto task = Task::Create();
            return task->ScheduleOnMainThread(env, mainThreadHandlerStart);
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    // TEST
    //* So this appears to be working, stress-test it and test on mac, make sure it doesn't crash on PS close
    addon_value Exec(addon_env env, addon_callback_info info)
    {
        try
        {
            addon_value arg1;
            size_t argc = 1;

            Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

            Value stdValue(env, arg1);

            auto valuePtr =
                std::make_shared<Value>(std::move(stdValue));

            auto outputPtr =
                std::make_shared<std::string>();

            auto isErrorPtr =
                std::make_shared<boolean>(false);

            auto scriptThreadHandler = [outputPtr, isErrorPtr](Task &task, addon_env env, addon_deferred deferred)
            {
                HandlerScope scope(env);

                addon_value resultValue;

                Check(UxpAddonApis.uxp_addon_create_string_utf8(env, outputPtr->c_str(), outputPtr->size(), &resultValue));
                if (isErrorPtr)
                {
                    Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                }
                else
                {
                    Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
            };

            auto mainThreadHandler2 = [outputPtr, isErrorPtr, scriptThreadHandler](Task &task)
            {
                try
                {
                    task.ScheduleOnScriptingThread(scriptThreadHandler);
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                    *isErrorPtr = true;
                }
            };

            auto mainThreadHandler = [valuePtr, outputPtr, isErrorPtr, mainThreadHandler2, scriptThreadHandler](Task &task)
            {
                try
                {
                    auto taskPtr = task.shared_from_this();
                    addon_env env = task.GetEnv();

                    std::string command = valuePtr->GetString();

                    std::thread([taskPtr, outputPtr, isErrorPtr, command, scriptThreadHandler]()
                                {
                            try
                            {
#ifdef __APPLE__
                                *outputPtr = execMac(command.c_str());
#elif _WIN32
                                *outputPtr = execWin(command.c_str());
#endif
                                taskPtr->ScheduleOnScriptingThread(scriptThreadHandler);
                            }
                            catch (...)
                            {
                                *outputPtr = "ERROR";
                                *isErrorPtr = true;
                                taskPtr->ScheduleOnScriptingThread(scriptThreadHandler);
                            } })
                        .detach();
                }
                catch (...)
                {
                    std::string errMsg = "There was an error.";
                    *isErrorPtr = true;
                }
            };

            auto task = Task::Create();
            return task->ScheduleOnMainThread(env, mainThreadHandler);
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    /*
     * The function is used to return 'hello world' message.
     * Javascript equivalent function() { return 'hello world'; }; in C++
     * No entry point should throw an exception. The implementation must use try/catch
     * and return nullptr if an exception was caught.
     * This method is invoked on the JavaScript thread.
     */
    addon_value MyFunction(addon_env env, addon_callback_info info)
    {
        try
        {
            addon_value message = nullptr;
            Check(UxpAddonApis.uxp_addon_create_string_utf8(env, "hello world", 11, &message));
            return message;
        }
        catch (...)
        {
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
    addon_value MyEcho(addon_env env, addon_callback_info info)
    {
        try
        {
            // Allocate space for the first argument
            addon_value arg1;
            size_t argc = 1;
            Check(UxpAddonApis.uxp_addon_get_cb_info(env, info, &argc, &arg1, nullptr, nullptr));

            // Convert the first argument to a value that can be retained past the
            // return from this function. This is needed if you want to pass arguments
            // to an asynchronous/deferred task handler
            Value stdValue(env, arg1);

            return stdValue.Convert(env);
        }
        catch (...)
        {
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
    addon_value MyAsyncEcho(addon_env env, addon_callback_info info)
    {
        try
        {
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

            auto scriptThreadHandler = [](Task &task, addon_env env, addon_deferred deferred)
            {
                try
                {
                    HandlerScope scope(env);
                    bool isError = false;
                    const Value &result = task.GetResult(isError);
                    addon_value resultValue = result.Convert(env);

                    if (isError)
                        Check(UxpAddonApis.uxp_addon_reject_deferred(env, deferred, resultValue));
                    else
                        Check(UxpAddonApis.uxp_addon_resolve_deferred(env, deferred, resultValue));
                }
                catch (...)
                {
                }
            };

            auto mainThreadHandler = [valuePtr, scriptThreadHandler](Task &task)
            {
                try
                {
                    task.SetResult(std::move(*(valuePtr.get())), false);
                    task.ScheduleOnScriptingThread(scriptThreadHandler);
                }
                catch (...)
                {
                }
            };

            auto task = Task::Create();
            return task->ScheduleOnMainThread(env, mainThreadHandler);
        }
        catch (...)
        {
            return CreateErrorFromException(env);
        }
    }

    /* Method invoked when the addon module is being requested by JavaScript
     * This method is invoked on the JavaScript thread.
     */
    addon_value Init(addon_env env, addon_value exports, const addon_apis &addonAPIs)
    {
        addon_status status = addon_ok;
        addon_value fn = nullptr;

        // MyFunction
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyFunction, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_function", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        // MyEcho
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyEcho, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_echo", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        // MyAsyncEcho
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, MyAsyncEcho, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "my_echo_async", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        // execSync
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, ExecSync, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "execSync", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        // execAsync
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, ExecAsync, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "execAsync", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        // exec
        {
            status = addonAPIs.uxp_addon_create_function(env, NULL, 0, Exec, NULL, &fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to wrap native function");
            }

            status = addonAPIs.uxp_addon_set_named_property(env, exports, "exec", fn);
            if (status != addon_ok)
            {
                addonAPIs.uxp_addon_throw_error(env, NULL, "Unable to populate exports");
            }
        }

        return exports;
    }

} // namespace

/*
 * Register initialization routine
 * Invoked by UXP during uxpaddon load.
 */
UXP_ADDON_INIT(Init)

void terminate(addon_env env)
{
    try
    {
    }
    catch (...)
    {
    }
}

/* Register addon termination routine
 * Invoked by UXP during uxpaddon un-load.
 */
UXP_ADDON_TERMINATE(terminate)
