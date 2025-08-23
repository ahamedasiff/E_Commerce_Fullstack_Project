import express from 'express';
import { registerUser, loginUser, adminLogin} from '../controllers/userController.js';

const userRouter = express.Router();

// Example controller functions (replace with your actual controllers)

// Register a new user
userRouter.post('/register', registerUser);

// Login user
userRouter.post('/login', loginUser);

userRouter.post('/admin', adminLogin);


export default userRouter;