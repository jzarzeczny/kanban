"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const mongoose_1 = require("mongoose");
const TaskModelSchema = new mongoose_1.Schema({
    header: String,
    content: String,
    color: String,
    position: Number,
});
const taskModel = (0, mongoose_1.model)("TaskModel", TaskModelSchema);
exports.taskModel = taskModel;
