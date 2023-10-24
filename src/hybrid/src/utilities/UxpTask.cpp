/************************************************************************
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 *************************************************************************
 */

#include "UxpTask.h"

#include "UxpAddon.h"

struct TaskWrapper {
    static void MainThreadThunk(addon_task_data data);
    static void ScriptingThreadThunk(addon_task_data data);
    std::shared_ptr<Task> task;
};

void TaskWrapperDestructor(addon_task_data data) {
    try {
        delete reinterpret_cast<TaskWrapper*>(data);
    } catch (...) {
    }
}

void TaskWrapper::MainThreadThunk(addon_task_data data) {
    try {
        reinterpret_cast<TaskWrapper*>(data)->task->InvokeMainThreadHandler();
    } catch (...) {
    }
}

void TaskWrapper::ScriptingThreadThunk(addon_task_data data) {
    try {
        reinterpret_cast<TaskWrapper*>(data)->task->InvokeScriptingThreadHandler();
    } catch (...) {
    }
}

std::shared_ptr<Task> Task::Create() {
    return std::shared_ptr<Task>(new Task);
}

addon_value Task::ScheduleOnMainThread(addon_env env, const Handler& handler) {
    if (mDeferred != nullptr)
        throw "Tasks can only be used to schedule one operation";

    this->mHandler = handler;

    addon_value promise = nullptr;
    Check(UxpAddonApis.uxp_addon_create_promise(env, &mDeferred, &promise));

    TaskWrapper* wrapper = new TaskWrapper;
    wrapper->task = shared_from_this();

    mEnv = env;

    UxpAddonApis.uxp_addon_schedule_on_main_queue(env, TaskWrapper::MainThreadThunk, wrapper, TaskWrapperDestructor);

    return promise;
}

void Task::ScheduleOnScriptingThread(const ResultHandler& resultHandler) {
    mResultHandler = resultHandler;

    TaskWrapper* wrapper = new TaskWrapper;
    wrapper->task = shared_from_this();

    UxpAddonApis.uxp_addon_schedule_on_javascript_queue(
        mEnv, TaskWrapper::ScriptingThreadThunk, wrapper, TaskWrapperDestructor);
}

void Task::InvokeMainThreadHandler() {
    Handler tmpHandler;
    std::swap(tmpHandler, mHandler);
    if (tmpHandler != nullptr)
        tmpHandler(*this);
}

void Task::InvokeScriptingThreadHandler() {
    ResultHandler tmpHandler;
    std::swap(tmpHandler, mResultHandler);

    addon_deferred tmpDeferred = nullptr;
    std::swap(tmpDeferred, mDeferred);

    if (tmpHandler != nullptr)
        tmpHandler(*this, mEnv, tmpDeferred);
}

void Task::SetResult(Value&& value, bool isError) {
    mResult = std::make_unique<Value>(std::move(value));
    mIsError = isError;
}

const Value& Task::GetResult(bool& isError) const {
    isError = mIsError;
    if (mResult.get() == nullptr)
        throw "No result was set";
    return *mResult;
}
