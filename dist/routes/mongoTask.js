"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const taskController_1 = require("../controllers/taskController");
// Get all the tasks
router.get("/", taskController_1.taskList);
// Add new task
router.post("/", taskController_1.taskListCreate);
// Update the task
router.put("/:id", taskController_1.taskListUpdate);
// Delete the task
router.delete("/:id", taskController_1.taskListDelete);
