import { Request, Response } from "express";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const user = new User({ name, email, password });

    await user.save();
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};
