"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../../models/task-model"));
exports.default = {
    Query: {
        async task(root, { _id }) {
            return await task_model_1.default.findById(_id);
        },
        async tasks(root) {
            return await task_model_1.default.find();
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
            return await task_model_1.default.create(newTask);
        },
        async editTask(root, { _id, text }) {
            var _a;
            const task = await task_model_1.default.findById(_id);
            (_a = task) === null || _a === void 0 ? void 0 : _a.set('text', text).save();
            return task;
        },
        async deleteTask(root, { _id }) {
            return task_model_1.default.findById(_id).remove();
        }
    },
};
