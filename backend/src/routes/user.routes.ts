import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Create a new user
router.post("/register", registerUser);
router.patch("/:id", updateUser);

export default router;
