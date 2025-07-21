import express from 'express';
import { loginUser,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();
import { authenticateUser } from '../middleware/auth.js';

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/me", authenticateUser, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default userRouter;



