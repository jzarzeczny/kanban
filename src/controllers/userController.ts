import { userModel } from "../models/userModel";
import { Request, Response } from "express";

const loginUser = async function (req: Request, res: Response) {
    const user = await userModel.findOne({ user: req.body.user });
    const token = user?.generateAccessToken(req.body.user);

    if (user === null) return res.status(400).send({ message: "User not found", code: 400 });

    if (user.validPassword(req.body.password)) {
        return res.status(201).send({ message: "User logged in", code: 201, jwt: token });
    } else {
        return res.status(400).send({ message: "Invalid password", code: 401 });
    }
};

const registerUser = async function (req: Request, res: Response) {
    let newUser = new userModel();

    newUser.user = req.body.user;
    newUser.setPassword(req.body.password);
    const token = newUser.generateAccessToken(req.body.user);

    try {
        await newUser.save();

        return res.status(201).send({ message: "User added successfully", code: 201, jwt: token });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).send({ message: "User already exists", code: 401 });
        }
        return res.status(400).send({ message: "Failed to add user", code: 400 });
    }
};

const decodeUser = async function (req: Request, res: Response) {
    let newUser = new userModel();
    try {
        const user = newUser.decodeAccessToken(req.body.value);
        return res.status(200).send({ user: user });
    } catch (error: any) {
        console.log(error);
        return res.status(400).send({ message: "Error! " + error.message });
    }
};

export { loginUser, registerUser, decodeUser };
