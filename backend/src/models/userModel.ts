import mongoose, { Document } from "mongoose";

// Define interface for TypeScript support
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
