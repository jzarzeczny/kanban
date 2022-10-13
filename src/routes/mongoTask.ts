import { Router } from "express";
const taskRouter = Router();
import {
    taskList,
    taskListCreate,
    taskListUpdate,
    taskListDelete,
} from "../controllers/taskController";

// Get all the tasks
taskRouter.get("/", taskList);

// Add new task
taskRouter.post("/", taskListCreate);

// Update the task
taskRouter.put("/:id", taskListUpdate);

// Delete the task
taskRouter.delete("/:id", taskListDelete);

export { taskRouter };
