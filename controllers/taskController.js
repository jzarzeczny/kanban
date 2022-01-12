const TaskModel = require("../models/taskModel");

// GET list of all tasks
exports.taskList = function (req, res, next) {
    console.log("Sending the task list");
    TaskModel.find().exec((err, listTasks) => {
        if (err) {
            return next(err);
        }
        console.log(listTasks);
        res.send(listTasks);

        //   res.send("NOT IMPLEMENTED: Tasks list");
    });
};

// POST create the new task
exports.taskListCreate = function (req, res) {
    res.send("POST NOT IMPLEMENTED");
};

// PUT handle change of task
exports.taskListUpdate = function (req, res) {
    res.send("PUT NOT IMPLEMENTED");
};

// DELETE handle task delete
exports.taskListDelete = function (req, res) {
    res.send("DELETE NOT IMPLEMENTED");
};
