/************************************************************************
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 *************************************************************************
 */

#include <vector>

#include "UxpAddon.h"
#include "UxpValue.h"

namespace {

// Return the type of the V8 object
Value::Kind GetType(const addon_apis& apis, addon_env env, addon_value value) {
    addon_valuetype type = addon_undefined;
    Check(apis.uxp_addon_typeof(env, value, &type));
    switch (type) {
    case addon_undefined: return Value::Kind::undefined;
    case addon_boolean: return Value::Kind::boolean;
    case addon_number: return Value::Kind::number;
    case addon_string: return Value::Kind::string;
    case addon_object: return Value::Kind::map;
    default: break;
    }

    // explicit test for array
    bool isArray = false;
    Check(apis.uxp_addon_is_array(env, value, &isArray));
    if (isArray)
        return Value::Kind::list;

    throw "unsupported type";
}

std::string GetString(const addon_apis& apis, addon_env env, addon_value value) {
    size_t length = 0;
    Check(apis.uxp_addon_get_value_string_utf8(env, value, nullptr, 0, &length));

    std::string result;
    if (length > 0) {
        std::vector<char> buffer(length + 2);
        size_t actualLength = 0;
        Check(apis.uxp_addon_get_value_string_utf8(env, value, &buffer[0], length + 1, &actualLength));
        if (actualLength > 0) {
            // Make sure that we have a zero terminated string
            if (buffer[length] != 0)
                buffer[length] = 0;
            result = std::string(&buffer[0]);
        }
    }
    return result;
}

bool GetBoolean(const addon_apis& apis, addon_env env, addon_value value) {
    bool result = false;
    Check(apis.uxp_addon_get_value_bool(env, value, &result));
    return result;
}

double GetNumber(const addon_apis& apis, addon_env env, addon_value value) {
    double result = 0.0;
    Check(apis.uxp_addon_get_value_double(env, value, &result));
    return result;
}

void GetList(const addon_apis& apis, Value::ListType& list, addon_env env, addon_value value) {
    list.clear();

    uint32_t result = 0;
    Check(apis.uxp_addon_get_array_length(env, value, &result));

    for (uint32_t index = 0; index < result; ++index) {
        addon_value element = nullptr;
        Check(apis.uxp_addon_get_element(env, value, index, &element));

        Value elementValue(env, element);
        list.emplace_back(std::move(elementValue));
    }
}

void GetMap(const addon_apis& apis, Value::MapType& map, addon_env env, addon_value value) {
    map.clear();

    addon_value napiKeys = nullptr;
    Check(apis.uxp_addon_get_property_names(env, value, &napiKeys));

    uint32_t keyCount = 0;
    Check(apis.uxp_addon_get_array_length(env, napiKeys, &keyCount));

    for (uint32_t index = 0; index < keyCount; ++index) {
        addon_value key = nullptr;
        Check(apis.uxp_addon_get_element(env, napiKeys, index, &key));

        std::string keyStr = GetString(apis, env, key);

        addon_value element = nullptr;
        Check(apis.uxp_addon_get_property(env, value, key, &element));

        map.emplace(std::make_pair(keyStr, Value(env, element)));
    }
}

addon_value Convert(const addon_apis& apis, addon_env env, const std::string& value) {
    addon_value result = nullptr;
    Check(apis.uxp_addon_create_string_utf8(env, value.c_str(), value.size(), &result));
    return result;
}

}  // namespace

Value::Value() : kind(Kind::undefined) {
}

Value::Value(bool value) : kind(Kind::boolean) {
    data.boolean = value;
}

Value::Value(double value) : kind(Kind::number) {
    data.number = value;
}

Value::Value(std::string value) : kind(Kind::string) {
    data.string = new std::string(std::move(value));
}

Value::~Value() {
    try {
        switch (kind) {
        case Kind::string: delete data.string; break;
        case Kind::list: delete data.list; break;
        case Kind::map: delete data.map; break;
        default: break;
        }
    } catch (...) {
    }
}

Value::Value(Kind kindValue) : kind(kindValue) {
    if (kind == Kind::list)
        data.list = new ListType;
    else if (kind == Kind::map)
        data.map = new MapType;
    else
        throw "invalid kind";
}

Value::Value(Value&& value) : kind(value.kind) {
    switch (value.kind) {
    case Kind::undefined: break;
    case Kind::boolean: data.boolean = value.data.boolean; break;
    case Kind::number: data.number = value.data.number; break;
    case Kind::string:
        data.string = value.data.string;
        value.data.string = nullptr;
        break;
    case Kind::list:
        data.list = value.data.list;
        value.data.list = nullptr;
        break;
    case Kind::map:
        data.map = value.data.map;
        value.data.map = nullptr;
        break;
    }
}

void Value::RequireKind(Kind expectedKind) const {
    if (kind != expectedKind)
        throw "Incorrect value kind";
}

Value::Value(addon_env env, addon_value value) {
    kind = GetType(UxpAddonApis, env, value);

    switch (kind) {
    case Kind::boolean: data.boolean = ::GetBoolean(UxpAddonApis, env, value); break;
    case Kind::number: data.number = ::GetNumber(UxpAddonApis, env, value); break;
    case Kind::string: data.string = new std::string(::GetString(UxpAddonApis, env, value)); break;
    case Kind::list: {
        data.list = new ListType;
        ::GetList(UxpAddonApis, *(data.list), env, value);
    } break;
    case Kind::map: {
        data.map = new MapType;
        ::GetMap(UxpAddonApis, *(data.map), env, value);
    } break;
    case Kind::undefined: break;
    }
}

bool Value::GetBoolean() const {
    RequireKind(Kind::boolean);
    return data.boolean;
}

double Value::GetNumber() const {
    RequireKind(Kind::number);
    return data.number;
}

std::string Value::GetString() const {
    RequireKind(Kind::string);
    return *(data.string);
}

const Value::ListType& Value::GetList() const {
    RequireKind(Kind::list);
    return *(data.list);
}

const Value::MapType& Value::GetMap() const {
    RequireKind(Kind::map);
    return *(data.map);
}

Value::ListType& Value::GetList() {
    RequireKind(Kind::list);
    return *(data.list);
}

Value::MapType& Value::GetMap() {
    RequireKind(Kind::map);
    return *(data.map);
}

addon_value Value::Convert(addon_env env) const {
    return ConvertValue(env, *this);
}

addon_value Value::ConvertValue(addon_env env, const Value& value) {
    addon_value result = nullptr;
    switch (value.GetKind()) {
    case Value::Kind::undefined: {
        Check(UxpAddonApis.uxp_addon_get_undefined(env, &result));
    } break;
    case Value::Kind::boolean: {
        Check(UxpAddonApis.uxp_addon_get_boolean(env, value.data.boolean, &result));
    } break;
    case Value::Kind::number: {
        Check(UxpAddonApis.uxp_addon_create_double(env, value.data.number, &result));
    } break;
    case Value::Kind::string: {
        result = ::Convert(UxpAddonApis, env, *(value.data.string));
    } break;
    case Value::Kind::list: {
        Check(UxpAddonApis.uxp_addon_create_array(env, &result));

        const ListType& sourceList = *(value.data.list);
        uint32_t index = 0;
        for (const auto& element : sourceList) {
            addon_value elementValue = ConvertValue(env, element);
            Check(UxpAddonApis.uxp_addon_set_element(env, result, index++, elementValue));
        }
    } break;
    case Value::Kind::map: {
        Check(UxpAddonApis.uxp_addon_create_object(env, &result));

        const MapType& sourceMap = *(value.data.map);
        for (const auto& iter : sourceMap) {
            addon_value key = ::Convert(UxpAddonApis, env, iter.first);
            addon_value elementValue = ConvertValue(env, iter.second);
            Check(UxpAddonApis.uxp_addon_set_property(env, result, key, elementValue));
        }
    } break;
    }
    return result;
}
