import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
const userRouter = express.Router();
import { authenticateUser } from '../middleware/auth.js';
import userModel from '../models/userModel.js';

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authenticateUser, (req, res) => {
  res.json({ success: true, user: req.user });
});
userRouter.get("/profile/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json({ user });
  } catch {
    res.status(404).json({ user: null });
  }
});

// Get all registered users
userRouter.get("/all", async (req, res) => {
  try {
    const users = await userModel.find({}, { name: 1, email: 1, createdAt: 1 });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});



export default userRouter;



