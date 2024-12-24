
import jwt from "jsonwebtoken";
import { sample_users } from "./../data";
import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

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
            res.send(HTTP_BAD_REQUEST).send("Username or password is not valid");
        }
    }
))

router.post("/register", asynceHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.send(HTTP_BAD_REQUEST).send("User already exist");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            token: '',
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));

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