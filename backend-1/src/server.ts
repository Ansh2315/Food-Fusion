import express from "express";
import cors from 'cors';
import foodRouter from './routers/food.router';
import userRouter from "./routers/user.router";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./configs/database.config";
dbConnect();

// We need cors only for development period for
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

// Login Ends

const port = 5000;
app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
})