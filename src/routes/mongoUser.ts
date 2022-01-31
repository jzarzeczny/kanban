import { Router } from "express";
const userRouter = Router();
import { loginUser, registerUser, decodeUser } from "../controllers/userController";

userRouter.post("/login", loginUser);

userRouter.post("/register", registerUser);

userRouter.post("/getUser", decodeUser);

export { userRouter };
