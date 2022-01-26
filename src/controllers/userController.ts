import { userModel } from "../models/userModel";
import { Request, Response } from "express";

// Szukanie po nazwie uzytkownika
const loginUser = async function (req: Request, res: Response) {
    const user = await userModel.findOne({ user: req.body.user });
    if (user === null) {
        return res.status(400).send({ message: "User not found" });
    } else {
        if (user.validPassword(req.body.password)) {
            return res.status(201).send({ message: "User logged in" });
        } else {
            return res.status(400).send({ message: "Invalid password" });
        }
    }
};

const registerUser = async function (req: Request, res: Response) {
    let newUser = new userModel();

    newUser.user = req.body.name;
    newUser.setPassword(req.body.password);

    try {
        await newUser.save();
        return res.status(201).send({ message: "User added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Failed to add user" });
    }
};

export { loginUser, registerUser };
