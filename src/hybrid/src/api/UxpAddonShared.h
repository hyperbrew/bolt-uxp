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

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>  // NOLINT

// When used in torq, we don't want to include UxpAddonTypes.h . But when used in addon, we want to include it.
#ifndef UXP_SOURCE
#include "UxpAddonTypes.h"
#endif

#ifdef __cplusplus
#define EXTERN_C_START extern "C" {
#define EXTERN_C_END }
#else
#define EXTERN_C_START
#define EXTERN_C_END
#endif

#define ADDON_INITIALIZER uxp_addon_init
#define ADDON_TERMINATE uxp_addon_terminate

#ifdef _WIN32
// 32 bit and ARM use a default alignment of 8. 64 bit intel use 16
#if defined(_M_ARM64) && _M_ARM64
#pragma pack(push, uxp_addon_components_settings, 8)
#elif defined(_WIN64)
#pragma pack(push, uxp_addon_components_settings, 16)
#else
#pragma pack(push, uxp_addon_components_settings, 8)
#endif
#endif

#ifdef _WIN32
#define UXP_EXTERN_API_STDCALL(type) __declspec(dllexport) type __stdcall
#elif __GNUC__ && defined(__APPLE__)
#define UXP_EXTERN_API_STDCALL(type) __attribute__((visibility("default"))) type
#else
UXP_EXTERN_API_STDCALL(type)
#endif

#define HYBRID_PLUGIN_SDK_VERSION "0.1.0"

typedef void* addon_task_data;
typedef void (*addon_task)(addon_task_data);
typedef void (*addon_task_destructor)(addon_task_data);

struct addon_apis {
    addon_status (*uxp_addon_create_int32)(addon_env env, int32_t value, addon_value* result);
    addon_status (*uxp_addon_get_cb_info)(
        addon_env env, addon_callback_info cbinfo, size_t* argc, addon_value* argv, addon_value* this_arg, void** data);

    addon_status (*uxp_addon_throw_error)(addon_env env, const char* code, const char* msg);
    addon_status (*uxp_addon_get_value_int32)(addon_env env, addon_value value, int32_t* result);
    addon_status (*uxp_addon_create_function)(
        addon_env env, const char* utf8name, size_t length, addon_callback cb, void* data, addon_value* result);
    addon_status (*uxp_addon_set_named_property)(
        addon_env env, addon_value object, const char* utf8name, addon_value value);

    addon_status (*uxp_addon_get_last_error_info)(addon_env env, const addon_extended_error_info** result);

    // Getters for defined singletons
    addon_status (*uxp_addon_get_undefined)(addon_env env, addon_value* result);
    addon_status (*uxp_addon_get_null)(addon_env env, addon_value* result);
    addon_status (*uxp_addon_get_global)(addon_env env, addon_value* result);
    addon_status (*uxp_addon_get_boolean)(addon_env env, bool value, addon_value* result);

    // Methods to create Primitive types/Objects
    addon_status (*uxp_addon_create_object)(addon_env env, addon_value* result);
    addon_status (*uxp_addon_create_array)(addon_env env, addon_value* result);
    addon_status (*uxp_addon_create_array_with_length)(addon_env env, size_t length, addon_value* result);
    addon_status (*uxp_addon_create_double)(addon_env env, double value, addon_value* result);
    addon_status (*uxp_addon_create_uint32)(addon_env env, uint32_t value, addon_value* result);
    addon_status (*uxp_addon_create_int64)(addon_env env, int64_t value, addon_value* result);
    addon_status (*uxp_addon_create_string_latin1)(addon_env env, const char* str, size_t length, addon_value* result);
    addon_status (*uxp_addon_create_string_utf8)(addon_env env, const char* str, size_t length, addon_value* result);
    addon_status (*uxp_addon_create_string_utf16)(
        addon_env env, const char16_t* str, size_t length, addon_value* result);
    addon_status (*uxp_addon_create_symbol)(addon_env env, addon_value description, addon_value* result);
    addon_status (*uxp_addon_create_error)(addon_env env, addon_value code, addon_value msg, addon_value* result);
    addon_status (*uxp_addon_create_type_error)(addon_env env, addon_value code, addon_value msg, addon_value* result);
    addon_status (*uxp_addon_create_range_error)(addon_env env, addon_value code, addon_value msg, addon_value* result);

    // Methods to get the native addon_value from Primitive type
    addon_status (*uxp_addon_typeof)(addon_env env, addon_value value, addon_valuetype* result);
    addon_status (*uxp_addon_get_value_double)(addon_env env, addon_value value, double* result);
    addon_status (*uxp_addon_get_value_uint32)(addon_env env, addon_value value, uint32_t* result);
    addon_status (*uxp_addon_get_value_int64)(addon_env env, addon_value value, int64_t* result);
    addon_status (*uxp_addon_get_value_bool)(addon_env env, addon_value value, bool* result);

    // Copies LATIN-1 encoded bytes from a string into a buffer.
    addon_status (*uxp_addon_get_value_string_latin1)(
        addon_env env, addon_value value, char* buf, size_t bufsize, size_t* result);

    // Copies UTF-8 encoded bytes from a string into a buffer.
    addon_status (*uxp_addon_get_value_string_utf8)(
        addon_env env, addon_value value, char* buf, size_t bufsize, size_t* result);

    // Copies UTF-16 encoded bytes from a string into a buffer.
    addon_status (*uxp_addon_get_value_string_utf16)(
        addon_env env, addon_value value, char16_t* buf, size_t bufsize, size_t* result);

    // Methods to coerce values
    addon_status (*uxp_addon_coerce_to_bool)(addon_env env, addon_value value, addon_value* result);
    addon_status (*uxp_addon_coerce_to_number)(addon_env env, addon_value value, addon_value* result);
    addon_status (*uxp_addon_coerce_to_object)(addon_env env, addon_value value, addon_value* result);
    addon_status (*uxp_addon_coerce_to_string)(addon_env env, addon_value value, addon_value* result);

    // Methods to work with Objects
    addon_status (*uxp_addon_get_prototype)(addon_env env, addon_value object, addon_value* result);
    addon_status (*uxp_addon_get_property_names)(addon_env env, addon_value object, addon_value* result);
    addon_status (*uxp_addon_set_property)(addon_env env, addon_value object, addon_value key, addon_value value);
    addon_status (*uxp_addon_has_property)(addon_env env, addon_value object, addon_value key, bool* result);
    addon_status (*uxp_addon_get_property)(addon_env env, addon_value object, addon_value key, addon_value* result);
    addon_status (*uxp_addon_delete_property)(addon_env env, addon_value object, addon_value key, bool* result);
    addon_status (*uxp_addon_has_own_property)(addon_env env, addon_value object, addon_value key, bool* result);
    addon_status (*uxp_addon_has_named_property)(addon_env env, addon_value object, const char* utf8name, bool* result);
    addon_status (*uxp_addon_get_named_property)(
        addon_env env, addon_value object, const char* utf8name, addon_value* result);
    addon_status (*uxp_addon_set_element)(addon_env env, addon_value object, uint32_t index, addon_value value);
    addon_status (*uxp_addon_has_element)(addon_env env, addon_value object, uint32_t index, bool* result);
    addon_status (*uxp_addon_get_element)(addon_env env, addon_value object, uint32_t index, addon_value* result);
    addon_status (*uxp_addon_delete_element)(addon_env env, addon_value object, uint32_t index, bool* result);
    addon_status (*uxp_addon_define_properties)(
        addon_env env, addon_value object, size_t property_count, const addon_property_descriptor* properties);

    // Methods to work with Arrays
    addon_status (*uxp_addon_is_array)(addon_env env, addon_value value, bool* result);
    addon_status (*uxp_addon_get_array_length)(addon_env env, addon_value value, uint32_t* result);

    // Methods to compare values
    addon_status (*uxp_addon_strict_equals)(addon_env env, addon_value lhs, addon_value rhs, bool* result);

    // Methods to work with Functions
    addon_status (*uxp_addon_call_function)(
        addon_env env, addon_value recv, addon_value func, size_t argc, const addon_value* argv, addon_value* result);

    addon_status (*uxp_addon_new_instance)(
        addon_env env, addon_value constructor, size_t argc, const addon_value* argv, addon_value* result);
    addon_status (*uxp_addon_instanceof)(addon_env env, addon_value object, addon_value constructor, bool* result);

    addon_status (*uxp_addon_get_new_target)(addon_env env, addon_callback_info cbinfo, addon_value* result);

    // Methods to work with external data objects
    addon_status (*uxp_addon_wrap)(
        addon_env env,
        addon_value js_object,
        void* native_object,
        addon_finalize finalize_cb,
        void* finalize_hint,
        addon_ref* result);
    addon_status (*uxp_addon_unwrap)(addon_env env, addon_value js_object, void** result);
    addon_status (*uxp_addon_remove_wrap)(addon_env env, addon_value js_object, void** result);
    addon_status (*uxp_addon_create_external)(
        addon_env env, void* data, addon_finalize finalize_cb, void* finalize_hint, addon_value* result);
    addon_status (*uxp_addon_get_value_external)(addon_env env, addon_value value, void** result);

    // Methods to control object lifespan

    // Set initial_refcount to 0 for a weak reference, >0 for a strong reference.
    addon_status (*uxp_addon_create_reference)(
        addon_env env, addon_value value, uint32_t initial_refcount, addon_ref* result);

    // Deletes a reference. The referenced value is released, and may
    // be GC'd unless there are other references to it.
    addon_status (*uxp_addon_delete_reference)(addon_env env, addon_ref ref);

    // Increments the reference count, optionally returning the resulting count.
    // After this call the  reference will be a strong reference because its
    // refcount is >0, and the referenced object is effectively "pinned".
    // Calling this when the refcount is 0 and the object is unavailable
    // results in an error.
    addon_status (*uxp_addon_reference_ref)(addon_env env, addon_ref ref, uint32_t* result);

    // Decrements the reference count, optionally returning the resulting count.
    // If the result is 0 the reference is now weak and the object may be GC'd
    // at any time if there are no other references. Calling this when the
    // refcount is already 0 results in an error.
    addon_status (*uxp_addon_reference_unref)(addon_env env, addon_ref ref, uint32_t* result);

    // Attempts to get a referenced value. If the reference is weak,
    // the value might no longer be available, in that case the call
    // is still successful but the result is NULL.
    addon_status (*uxp_addon_get_reference_value)(addon_env env, addon_ref ref, addon_value* result);

    addon_status (*uxp_addon_open_handle_scope)(addon_env env, addon_handle_scope* result);
    addon_status (*uxp_addon_close_handle_scope)(addon_env env, addon_handle_scope scope);
    addon_status (*uxp_addon_open_escapable_handle_scope)(addon_env env, addon_escapable_handle_scope* result);
    addon_status (*uxp_addon_close_escapable_handle_scope)(addon_env env, addon_escapable_handle_scope scope);

    addon_status (*uxp_addon_escape_handle)(
        addon_env env, addon_escapable_handle_scope scope, addon_value escapee, addon_value* result);

    // Methods to support error handling
    addon_status (*uxp_addon_throw)(addon_env env, addon_value error);
    addon_status (*uxp_addon_throw_type_error)(addon_env env, const char* code, const char* msg);
    addon_status (*uxp_addon_throw_range_error)(addon_env env, const char* code, const char* msg);
    addon_status (*uxp_addon_is_error)(addon_env env, addon_value value, bool* result);

    // Methods to support catching exceptions
    addon_status (*uxp_addon_is_exception_pending)(addon_env env, bool* result);
    addon_status (*uxp_addon_get_and_clear_last_exception)(addon_env env, addon_value* result);

    // Methods to work with array buffers and typed arrays
    addon_status (*uxp_addon_is_arraybuffer)(addon_env env, addon_value value, bool* result);
    addon_status (*uxp_addon_create_arraybuffer)(addon_env env, size_t byte_length, void** data, addon_value* result);
    addon_status (*uxp_addon_create_external_arraybuffer)(
        addon_env env,
        void* external_data,
        size_t byte_length,
        addon_finalize finalize_cb,
        void* finalize_hint,
        addon_value* result);
    addon_status (*uxp_addon_get_arraybuffer_info)(
        addon_env env, addon_value arraybuffer, void** data, size_t* byte_length);
    addon_status (*uxp_addon_is_typedarray)(addon_env env, addon_value value, bool* result);
    addon_status (*uxp_addon_create_typedarray)(
        addon_env env,
        addon_typedarray_type type,
        size_t length,
        addon_value arraybuffer,
        size_t byte_offset,
        addon_value* result);
    addon_status (*uxp_addon_create_dataview)(
        addon_env env, size_t length, addon_value arraybuffer, size_t byte_offset, addon_value* result);
    addon_status (*uxp_addon_is_dataview)(addon_env env, addon_value value, bool* result);
    addon_status (*uxp_addon_get_dataview_info)(
        addon_env env,
        addon_value dataview,
        size_t* bytelength,
        void** data,
        addon_value* arraybuffer,
        size_t* byte_offset);

    // Promises
    addon_status (*uxp_addon_create_promise)(addon_env env, addon_deferred* deferred, addon_value* promise);
    addon_status (*uxp_addon_resolve_deferred)(addon_env env, addon_deferred deferred, addon_value resolution);
    addon_status (*uxp_addon_reject_deferred)(addon_env env, addon_deferred deferred, addon_value rejection);
    addon_status (*uxp_addon_is_promise)(addon_env env, addon_value promise, bool* is_promise);

    // APIs to schedule task on javascript/main queue
    void (*uxp_addon_schedule_on_javascript_queue)(
        addon_env env, addon_task task, addon_task_data data, addon_task_destructor deleter);
    void (*uxp_addon_schedule_on_main_queue)(
        addon_env env, addon_task task, addon_task_data data, addon_task_destructor deleter);

    // Dates
    addon_status (*uxp_addon_create_date)(addon_env env, double time, addon_value* result);

    addon_status (*uxp_addon_is_date)(addon_env env, addon_value value, bool* is_date);

    addon_status (*uxp_addon_get_date_value)(addon_env env, addon_value value, double* result);

    // Add finalizer for pointer
    addon_status (*uxp_addon_add_finalizer)(
        addon_env env,
        addon_value js_object,
        void* native_object,
        addon_finalize finalize_cb,
        void* finalize_hint,
        addon_ref* result);
};

typedef addon_value (*uxp_addon_initialize_func)(addon_env env, addon_value exports, addon_apis&& addonAPIs);
typedef addon_value (*uxp_addon_terminate_func)(addon_env env);

// Forward declare of the two required entry points for the addon
extern "C" {
UXP_EXTERN_API_STDCALL(addon_value) ADDON_INITIALIZER(addon_env env, addon_value exports, addon_apis&& addonAPIs);
UXP_EXTERN_API_STDCALL(void) ADDON_TERMINATE(addon_env env);
}

#ifdef _WIN32
#pragma pack(pop, uxp_addon_components_settings)
#endif
