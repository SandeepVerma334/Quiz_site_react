import express from 'express';
import { userLogin, createUser, userLogout, getAllUsers } from '../controller/register.controler.js';
import { authenticateUser } from '../middelwere/authantication.js';

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/create", createUser);
userRouter.post('/logout', authenticateUser, userLogout);
userRouter.get('/get', getAllUsers)

export default userRouter;
