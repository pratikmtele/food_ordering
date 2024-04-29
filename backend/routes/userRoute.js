import express from 'express';
import { loginUser, registerUser, updateAccount } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update", updateAccount);

export default userRouter;