const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/taskController");

// Get all the tasks
router.get("/", tasksController.taskList);

// Add new task
router.post("/", tasksController.taskListCreate);

// Update the task
router.put("/:id", tasksController.taskListUpdate);

// Delete the task
router.delete("/:id", tasksController.taskListDelete);

module.exports = router;
