/************************************************************************
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 *************************************************************************
 */

#include "UxpAddon.h"

#include <stdexcept>
#include <string>

addon_value CreateErrorFromException(addon_env env) noexcept {
    std::string message;
    try {
        throw;
    } catch (std::exception& except) {
        message = except.what();
    } catch (...) {
        message = "unknown exception";
    }

    // Don't throw from this function (ignore further errors)
    addon_value errorCode = nullptr;
    std::string code("-1");
    UxpAddonApis.uxp_addon_create_string_utf8(env, code.c_str(), code.size(), &errorCode);

    addon_value errorMessage = nullptr;
    UxpAddonApis.uxp_addon_create_string_utf8(env, message.c_str(), message.size(), &errorMessage);

    addon_value error = nullptr;
    UxpAddonApis.uxp_addon_create_error(env, errorCode, errorMessage, &error);
    return error;
}
