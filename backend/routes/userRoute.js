import express from 'express';
import { loginUser, registerUser, updateAccount, forgetPassword, reset_password, changePassword } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update", updateAccount);
userRouter.post("/forget-password", forgetPassword);
userRouter.get("/reset-password/:id/:token", reset_password);
userRouter.post("/reset-password/:id/:token", changePassword);

export default userRouter;