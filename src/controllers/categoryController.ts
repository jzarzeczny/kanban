import { categoryModel } from "../models/categoryModel";
import { Request, Response } from "express";
import { Category } from "../validators/categoryValidators";

// GET list of all categories
const categoryList = async function (req: Request, res: Response): Promise<void> {
    console.log("Sending the category list");
    const tasks = await categoryModel.find();
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

// POST create the new task
const categoryListCreate = async function (req: Request, res: Response): Promise<void> {
    const task = new categoryModel({
        name: req.body.name,
        color: req.body.color,
    });
    try {
        await task.save();
        res.send(task as Category);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE handle task delete
const categoryListDelete = async function (req: Request, res: Response): Promise<void> {
    try {
        const task = await categoryModel.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send("Item not found");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { categoryList, categoryListCreate, categoryListDelete };
