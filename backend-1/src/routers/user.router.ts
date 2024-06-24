
import jwt from "jsonwebtoken";
import { sample_users } from "./../data";
import { Router } from "express";

const router = Router();
// Login API
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = sample_users.find(user => user.email === email && user.password === password);
    if (users) {
        res.send(generateTokenResponse(users));
    } else {
        res.send(400).send("Username or password is not valid");
    }
})

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

export default router;