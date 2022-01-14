import { Router } from "express";
const router = Router();
import {
    taskList,
    taskListCreate,
    taskListUpdate,
    taskListDelete,
} from "../controllers/taskController";

// Get all the tasks
router.get("/", taskList);

// Add new task
router.post("/", taskListCreate);

// Update the task
router.put("/:id", taskListUpdate);

// Delete the task
router.delete("/:id", taskListDelete);

export { router };
