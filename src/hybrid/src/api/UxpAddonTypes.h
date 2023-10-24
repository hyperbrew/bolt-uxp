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

#include "stdint.h"

#ifdef _WIN32
#pragma pack(push, uxp_addon_components_settings, 16)
#endif

// JSVM API types are all opaque pointers for ABI stability
// typedef undefined structs instead of void* for compile time type safety
typedef struct addon_env__* addon_env;
typedef struct addon_value__* addon_value;
typedef struct addon_ref__* addon_ref;
typedef struct addon_handle_scope__* addon_handle_scope;
typedef struct addon_escapable_handle_scope__* addon_escapable_handle_scope;
typedef struct addon_callback_info__* addon_callback_info;
typedef struct addon_deferred__* addon_deferred;

typedef addon_value (*addon_callback)(addon_env env, addon_callback_info info);
typedef void (*addon_finalize)(addon_env env, void* finalize_data, void* finalize_hint);

enum addon_property_attributes : unsigned int {
    addon_default = 0,
    addon_writable = 1 << 0,
    addon_enumerable = 1 << 1,
    addon_configurable = 1 << 2,
    addon_static = 1 << 10,
};

enum addon_valuetype : unsigned int {
    // ES6 types (corresponds to typeof)
    addon_undefined,
    addon_null,
    addon_boolean,
    addon_number,
    addon_string,
    addon_symbol,
    addon_object,
    addon_function,
    addon_external,
    addon_bigint,
    addon_empty,
};

enum addon_typedarray_type : unsigned int {
    addon_int8_array,
    addon_uint8_array,
    addon_uint8_clamped_array,
    addon_int16_array,
    addon_uint16_array,
    addon_int32_array,
    addon_uint32_array,
    addon_float32_array,
    addon_float64_array,
    addon_bigint64_array,
    addon_biguint64_array,
};

enum addon_status : unsigned int {
    addon_ok,
    addon_invalid_arg,
    addon_object_expected,
    addon_string_expected,
    addon_name_expected,
    addon_function_expected,
    addon_number_expected,
    addon_boolean_expected,
    addon_array_expected,
    addon_generic_failure,
    addon_pending_exception,
    addon_cancelled,
    addon_escape_called_twice,
    addon_handle_scope_mismatch,
    addon_callback_scope_mismatch,
    addon_queue_full,
    addon_closing,
    addon_bigint_expected,
    addon_date_expected,
    addon_arraybuffer_expected,
    addon_detachable_arraybuffer_expected,
};

struct addon_property_descriptor {
    // One of utf8name or name should be NULL.
    const char* utf8name;
    addon_value name;

    addon_callback method;
    addon_callback getter;
    addon_callback setter;
    addon_value value;

    addon_property_attributes attributes;
    void* data;
};

struct addon_extended_error_info {
    const char* error_message;
    void* engine_reserved;
    uint32_t engine_error_code;
    addon_status error_code;
};

#ifdef _WIN32
#pragma pack(pop, uxp_addon_components_settings)
#endif
