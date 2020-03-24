"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const task_model_1 = __importDefault(require("../../models/task-model"));
const pubSub = new apollo_server_express_1.PubSub();
const TASK_CREATED = "TASK_CREATED";
const TASK_DELETED = "TASK_DELETED";
const TASK_EDITED = "TASK_EDITED";
exports.default = {
    Subscription: {
        taskCreated: {
            resolve: (data) => {
                console.log("Subscription taskCreated: ", data);
                return data;
            },
            subscribe: () => pubSub.asyncIterator([TASK_CREATED])
        },
        taskDeleted: {
            resolve: (data) => {
                console.log("Subscription taskDeleted: ", data);
                return data;
            },
            subscribe: () => pubSub.asyncIterator([TASK_DELETED])
        },
        taskEdited: {
            resolve: (data) => {
                console.log("Subscription taskEdited: ", data);
                return data;
            },
            subscribe: () => pubSub.asyncIterator([TASK_EDITED])
        }
    },
    Query: {
        async task(root, { _id }) {
            return await task_model_1.default.findById(_id);
        },
        async tasks(root, { owner }) {
            return await task_model_1.default.find(owner && { owner: owner });
        }
    },
    Mutation: {
        async createTask(root, { text, owner }) {
            const created = new Date().toString();
            const updated = created;
            const status = 'NEW';
            const isDone = false;
            const newTask = {
                text, owner, status, created, updated, isDone
            };
            const task = await task_model_1.default.create(newTask);
            pubSub.publish(TASK_CREATED, task);
            return task;
        },
        async editTask(root, { _id, text }) {
            var _a;
            const task = await task_model_1.default.findById(_id);
            (_a = task) === null || _a === void 0 ? void 0 : _a.set('text', text).set('updated', new Date().toString()).save();
            pubSub.publish(TASK_EDITED, task);
            return task;
        },
        async changeTaskStatus(root, { _id, status }) {
            var _a;
            const task = await task_model_1.default.findById(_id);
            (_a = task) === null || _a === void 0 ? void 0 : _a.set('status', status).set('updated', new Date().toString()).save();
            pubSub.publish(TASK_EDITED, task);
            return task;
        },
        async makeTaskDone(root, { _id }) {
            var _a;
            const task = await task_model_1.default.findById(_id);
            (_a = task) === null || _a === void 0 ? void 0 : _a.set('isDone', true).set('updated', new Date().toString()).save();
            pubSub.publish(TASK_EDITED, task);
            return task;
        },
        async deleteTask(root, { _id }) {
            task_model_1.default.deleteOne({ _id: _id }).exec();
            pubSub.publish(TASK_DELETED, _id);
            return _id;
        }
    },
};
