"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const types = __importStar(require("./actionTypes"));
function onCreateTask(content) {
    const newTask = {
        id: uuid_1.v4(),
        text: content,
        owner: 'anonym',
        status: "NEW",
        created: new Date().toString(),
        updated: new Date().toString(),
        isDone: false,
        isEdit: false,
    };
    return { type: types.ADD_TASK, payload: newTask };
}
exports.onCreateTask = onCreateTask;
function deleteTask(id) {
    return { type: types.DELETE_TASK, payload: id };
}
exports.deleteTask = deleteTask;
function changeStatus(id, status) {
    return {
        type: types.CHANGE_STATUS,
        payload: { id, status }
    };
}
exports.changeStatus = changeStatus;
function editTask(id) {
    return { type: types.EDIT_TASK, payload: id };
}
exports.editTask = editTask;
function saveEditTask(id, text) {
    return { type: types.SAVE_EDIT_TASK, payload: { id, text } };
}
exports.saveEditTask = saveEditTask;
