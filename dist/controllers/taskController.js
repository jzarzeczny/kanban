"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskListDelete = exports.taskListUpdate = exports.taskListCreate = exports.taskList = void 0;
const taskModel_1 = require("../models/taskModel");
// GET list of all tasks
const taskList = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Sending the task list");
        const tasks = yield taskModel_1.taskModel.find();
        try {
            res.send(tasks);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
};
exports.taskList = taskList;
// POST create the new task
const taskListCreate = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = new taskModel_1.taskModel({
            header: req.body.header,
            content: req.body.content,
            color: req.body.color,
            position: req.body.position,
        });
        try {
            yield task.save();
            res.send(task);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
};
exports.taskListCreate = taskListCreate;
// PUT handle change of task
const taskListUpdate = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield taskModel_1.taskModel.findByIdAndUpdate(req.params.id, req.body);
            yield (task === null || task === void 0 ? void 0 : task.save());
            res.send(task);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
};
exports.taskListUpdate = taskListUpdate;
// DELETE handle task delete
const taskListDelete = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield taskModel_1.taskModel.findByIdAndDelete(req.params.id);
            if (!task) {
                res.status(404).send("Item not found");
            }
            res.status(200).send(task);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
};
exports.taskListDelete = taskListDelete;
