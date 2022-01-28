import { userModel } from "../models/userModel";
import { Request, Response } from "express";

const loginUser = async function (req: Request, res: Response) {
    const user = await userModel.findOne({ user: req.body.user });
    if (user === null) {
        return res.status(400).send({ message: "User not found", code: 400 });
    } else {
        if (user.validPassword(req.body.password)) {
            return res.status(201).send({ message: "User logged in", code: 201 });
        } else {
            return res.status(400).send({ message: "Invalid password", code: 401 });
        }
    }
};

const registerUser = async function (req: Request, res: Response) {
    let newUser = new userModel();

    newUser.user = req.body.user;
    newUser.setPassword(req.body.password);

    try {
        await newUser.save();
        return res.status(201).send({ message: "User added successfully", code: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).send({ message: "User already exists", code: 401 });
        }
        return res.status(400).send({ message: "Failed to add user", code: 400 });
    }
};

export { loginUser, registerUser };
