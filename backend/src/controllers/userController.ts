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

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body; // Partial data to update

    const updateFields: { [key: string]: string | undefined } = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Find user by ID and update only the provided fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};
