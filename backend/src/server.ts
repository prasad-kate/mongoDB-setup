import dotenv from "dotenv";
import express from "express";
import homePageRoutes from "./routes/home.route";
import userRoutes from "./routes/user.routes";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/", homePageRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
