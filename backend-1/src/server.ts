import express from "express";
import cors from 'cors';
import { sample_foods, sample_users } from './data'
import { sample_tags } from './data'
import jwt from "jsonwebtoken"

// We need cors only for development period for
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.filter(food => food.id == foodId);
    res.send(food[0]);
})

// Login API
app.post("/api/users/login", (req, res) => {
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

// Login Ends

const port = 5000;
app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
})