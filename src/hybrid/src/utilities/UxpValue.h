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

#include <deque>
#include <map>
#include <string>

#include "../api/UxpAddonTypes.h"

/** The Value class can be used to convert data from scripting types to
 standard types (vector, map, string).
 This is needed if the implementation needs to access the value after
 the scripting thread callback. Values provided to scripting thread callbacks
 (addon_value) are *only* valid within the single callback context and may be garbage
 collected later.
*/

class Value {
 public:
    enum class Kind { undefined, boolean, number, string, list, map };

    using ListType = std::deque<Value>;
    using MapType = std::map<std::string, Value>;

    Value(Value&& value);

    // create undefined value
    Value();

    // type specific creators
    explicit Value(bool value);
    explicit Value(double value);
    explicit Value(std::string value);

    // used to create either a list or a map value
    explicit Value(Kind kind);

    ~Value();

    // @{ Accessors
    Kind GetKind() const { return kind; }

    bool GetBoolean() const;
    double GetNumber() const;
    std::string GetString() const;
    const ListType& GetList() const;
    const MapType& GetMap() const;
    // @} Accessors

    // @{ Mutators
    ListType& GetList();
    MapType& GetMap();
    // @} Mutators

    // @{ Converters to and from JavaScript values
    // Create a value from a scripting value
    Value(addon_env env, addon_value value);

    // Convert a value to a scripting value
    addon_value Convert(addon_env env) const;
    // @}

 private:
    static addon_value ConvertValue(addon_env env, const Value& value);

    void RequireKind(Kind expectedKind) const;

    Kind kind;
    union u {
        bool boolean;
        double number;
        std::string* string;
        ListType* list;
        MapType* map;
    } data;
};
