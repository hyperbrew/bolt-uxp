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
#include <memory>

#include "../api/UxpAddonShared.h"
#include "../api/UxpAddonTypes.h"
#include "UxpValue.h"

/** The Task class can be used to implement tasks that are asynchonous in nature.
 An example of such a task is something that needs to invoke APIs on the main thread.
 The general flow of a Task is that the scripting thread creates the task and an
 assocated deferred value. This value is returned to JavaScript and becomes and awaitable
 promise.
 When the task is complete, then it must schedule a promise resolution on the scripting thread.
*/

class Task : public std::enable_shared_from_this<Task> {
 public:
    static std::shared_ptr<Task> Create();

    using Handler = std::function<void(Task&)>;
    addon_value ScheduleOnMainThread(addon_env env, const Handler& handler);

    using ResultHandler = std::function<void(Task&, addon_env env, addon_deferred deferred)>;
    void ScheduleOnScriptingThread(const ResultHandler& resultHandler);

    void SetResult(Value&& value, bool isError);
    const Value& GetResult(bool& isError) const;

 protected:
    Task() {}

 private:
    friend struct TaskWrapper;
    void InvokeMainThreadHandler();
    void InvokeScriptingThreadHandler();

    Handler mHandler;
    ResultHandler mResultHandler;
    addon_deferred mDeferred{nullptr};
    std::unique_ptr<Value> mResult;
    bool mIsError{false};

    // Cached script environment
    addon_env mEnv{nullptr};
};
