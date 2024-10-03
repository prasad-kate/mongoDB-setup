import dotenv from "dotenv";
import express from "express";
import homePageRoutes from "./routes/home.route";
import userRoutes from "./routes/user.routes";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/", homePageRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
