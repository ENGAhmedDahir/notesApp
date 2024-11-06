import express from 'express';
import { getUser, getUsers, login, registerUser, updatePassword, updateUser } from '../controller/userControler.js';

const userRouter = express.Router();

userRouter.post('/register-user',registerUser);
userRouter.post('/login-user', login)
userRouter.get('/get-user/:id', getUser)
userRouter.get('/get-users', getUsers)
userRouter.put('/edit-user/:id', updateUser)
userRouter.put('/edit-userPassword/:id', updatePassword)

export default userRouter;