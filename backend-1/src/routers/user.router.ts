
import jwt from "jsonwebtoken";
import { sample_users } from "./../data";
import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("User Seed is already done");
            return;
        }

        await UserModel.create(sample_users);
        res.send("User Seed is done");
    }
))

// Login API
router.post("/login", asynceHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const users = await UserModel.findOne({ email, password });
        if (users) {
            res.send(generateTokenResponse(users));
        } else {
            const BAD_REQUEST = 400;
            res.send(BAD_REQUEST).send("Username or password is not valid");
        }
    }
))

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

export default router;