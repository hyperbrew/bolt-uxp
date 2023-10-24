/************************************************************************
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 *************************************************************************
 */

#pragma once

#include <functional>
#include <memory.h>
#include <stdio.h>
#include <string>

#include "../api/UxpAddonShared.h"

class UxpAddonInterface {
 public:
    static UxpAddonInterface& instance() {
        static UxpAddonInterface instance_;
        return instance_;
    }

    void setAddonAPIs(const addon_apis& addonAPIs) { addonAPIs_ = addonAPIs; }

    const addon_apis& getAddonAPIs() { return addonAPIs_; }

 private:
    addon_apis addonAPIs_;
};

using initAddonCallback = std::function<addon_value(addon_env env, addon_value exports, addon_apis addonAPIs)>;
using terminateAddonCallback = std::function<void(addon_env env)>;

#define UxpAddonApis UxpAddonInterface::instance().getAddonAPIs()
#define SET_ADDON_APIS(addonAPIs) UxpAddonInterface::instance().setAddonAPIs(addonAPIs)

#define UXP_ADDON_INIT(initAddonCallback)                                                       \
    addon_value ADDON_INITIALIZER(addon_env env, addon_value exports, addon_apis&& addonAPIs) { \
        SET_ADDON_APIS(addonAPIs);                                                              \
        addon_value updatedAddonExports = nullptr;                                              \
        try {                                                                                   \
            updatedAddonExports = initAddonCallback(env, exports, addonAPIs);                   \
        } catch (const std::exception& exc) {                                                   \
            std::string errorMessage("Error occured while addon initialize : ");                \
            errorMessage.append(exc.what());                                                    \
            UxpAddonApis.uxp_addon_throw_error(env, NULL, errorMessage.c_str());                \
        }                                                                                       \
        return updatedAddonExports;                                                             \
    }

#define UXP_ADDON_TERMINATE(terminateAddonCallback)                              \
    void ADDON_TERMINATE(addon_env env) {                                        \
        try {                                                                    \
            terminateAddonCallback(env);                                         \
        } catch (const std::exception& exc) {                                    \
            std::string errorMessage("Error occured while addon terminate : ");  \
            errorMessage.append(exc.what());                                     \
            UxpAddonApis.uxp_addon_throw_error(env, NULL, errorMessage.c_str()); \
        }                                                                        \
    }

inline void Check(addon_status status) {
    if (status != addon_ok)
        throw "error";
}

// Return a V8 error object from a current pending exception.
// This method can only be called from inside a catch handler
addon_value CreateErrorFromException(addon_env env) noexcept;

/** This class must be used to create a V8 context scope when
 tasks are scheduled onto the scripting thread
*/
class HandlerScope {
 public:
    explicit HandlerScope(addon_env env) : mEnv(env) {
        Check(UxpAddonApis.uxp_addon_open_handle_scope(mEnv, &mScope));
    }
    ~HandlerScope() { UxpAddonApis.uxp_addon_close_handle_scope(mEnv, mScope); }

    HandlerScope(const HandlerScope&) = delete;
    HandlerScope& operator=(const HandlerScope&) = delete;

 private:
    const addon_env mEnv;
    addon_handle_scope mScope = nullptr;
};
