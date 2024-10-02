import express from "express";
import { registerUser } from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/register", registerUser);

export default router;
