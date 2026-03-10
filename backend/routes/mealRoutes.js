import express from "express";
import * as Meals from "../data/mealData.js";

const routes = express.Router();

// Get all meals
routes.get("/meals", (req, res) => {
  const meals = Meals.getMeals();
});
