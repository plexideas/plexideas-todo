"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
    text: String,
    owner: { type: String, required: true },
    status: { type: String, required: true },
    created: { type: String, required: true },
    updated: { type: String, required: true },
    isDone: { type: String, required: true },
});
exports.default = mongoose_1.default.model("task", taskSchema);
