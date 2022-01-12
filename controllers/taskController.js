const TaskModel = require("../models/taskModel");

// GET list of all tasks
exports.taskList = async function (req, res) {
    console.log("Sending the task list");
    const tasks = await TaskModel.find();
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

// POST create the new task
exports.taskListCreate = async function (req, res) {
    const task = new TaskModel({
        header: req.body.header,
        content: req.body.content,
        color: req.body.color,
        position: req.body.position,
        id: req.body.id,
    });
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT handle change of task
exports.taskListUpdate = async function (req, res) {
    try {
        await TaskModel.findByIdAndUpdate(req.params.id, req.body);
        await TaskModel.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE handle task delete
exports.taskListDelete = async function (req, res) {
    try {
        const food = await TaskModel.findByIdAndDelete(req.params.id);
        if (!food) {
            res.status(404).send("Item not found");
        }
        res.status(200).send();
    } catch (err) {
        res.status(500).send(error);
    }
};
