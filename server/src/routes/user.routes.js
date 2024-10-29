import express from "express"
import {auth} from "../middleware/auth.js"
import {createUser, getUsers, getUserById, login, deleteUserById, updateUserDetails} from '../controllers/user.controller.js'

const userRouter = express.Router();

userRouter.post('/api/user', createUser);
userRouter.get('/api/users', auth, getUsers);
userRouter.get('/api/users/:user_id', auth, getUserById);
userRouter.post('/api/login', login);
userRouter.put('/api/user/:user_id',auth, updateUserDetails);
userRouter.delete('/api/user/:user_id',auth, deleteUserById);


export default userRouter;