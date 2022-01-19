import { Router } from "express";
import {
    categoryList,
    categoryListCreate,
    categoryListDelete,
} from "../controllers/categoryController";
const categoryRouter = Router();

// Get all the tasks
categoryRouter.get("/", categoryList);

// Add new task
categoryRouter.post("/", categoryListCreate);

// Delete the task
categoryRouter.delete("/:id", categoryListDelete);

export { categoryRouter };
