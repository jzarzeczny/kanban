import { Router } from "express";
const userRouter = Router();
import { loginUser, registerUser } from "../controllers/userController";

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

export { userRouter };
