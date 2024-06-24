import { Router } from "express";
import { sample_foods } from '../data';
import { sample_tags } from '../data';
import asynceHandler from 'express-async-handler';
import { FoodModel } from "../models/food.model";

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Seed is already done");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed is done");
    }
))


router.get("/", (req, res) => {
    res.send(sample_foods);
})

router.get("/tags", (req, res) => {
    res.send(sample_tags);
})

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.filter(food => food.id == foodId);
    res.send(food[0]);
})

export default router;