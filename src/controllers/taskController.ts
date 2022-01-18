import { taskModel } from "../models/taskModel";
import { Request, Response } from "express";
import { Task } from "../validators/taskValidators";

// GET list of all tasks
const taskList = async function (req: Request, res: Response): Promise<void> {
    console.log("Sending the task list");
    const tasks = await taskModel.find();
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

// POST create the new task
const taskListCreate = async function (req: Request, res: Response): Promise<void> {
    const task = new taskModel({
        header: req.body.header,
        content: req.body.content,
        color: req.body.color,
        position: req.body.position,
    });
    try {
        await task.save();
        res.send(task as Task);
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT handle change of task
const taskListUpdate = async function (req: Request, res: Response): Promise<void> {
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body);
        await task?.save();
        res.send(task as Task);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE handle task delete
const taskListDelete = async function (req: Request, res: Response): Promise<void> {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send("Item not found");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { taskList, taskListCreate, taskListUpdate, taskListDelete };
