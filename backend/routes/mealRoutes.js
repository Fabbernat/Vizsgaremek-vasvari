import express from "express";
import * as Meals from "../data/mealData.js";

const routes = express.Router();

// Get all meals
routes.get("/meals", (req, res) => {
  const meals = Meals.getMeals();
  res.status(201).json(meals);
});

routes.get("/meals/:id", (req, res) => {
  const meal = Meals.getMealById(+req.params.id);
  if (!meal) {
    return res.status(404).json({ message: "Meal not found!" });
  }
  const data = {
    id: meal.id,
    name: meal.name,
    description: meal.description,
    price: meal.price,
    // categoryid: meal.categoryid,
    // Keep a camelCase version for clients that expect it
    restaurantId: meal.restaurantid,
  };
  res.status(200).json({ message: "Meal loaded:", data });
});

routes.post("/add-meal", (req, res) => {
  const { name, description, price, restaurantId } = req.body;
  if (!name || !description || !price || !restaurantId) {
    return res.status(400).json({
      message:
        "Name, description, price, categoryid and restaurantId are required!",
    });
  }
  const meal = Meals.createMeal(
    name,
    description,
    price,
    /*     categoryid || null, */
    restaurantId,
  );
  res.status(201).json({ message: "Meal created!", meal });
});

routes.put("/meals/:id", (req, res) => {
  const { name, description, price, restaurantId } = req.body;
  if (!name || !description || !price || !restaurantId) {
    return res.status(400).json({
      message:
        "Name, description, price, categoryid and restaurantId are required!",
    });
  }
  const meal = Meals.updateMeal(
    +req.params.id,
    name,
    description,
    price,
    /*   categoryid, */
    restaurantId,
  );
  if (!meal.changes) {
    return res.status(404).json({ message: "Meal not found!" });
  }
  res.status(200).json({ message: "Meal updated!", meal });
});

routes.delete("/meals/:id", (req, res) => {
  const meal = Meals.deleteMeal(+req.params.id);
  if (!meal) {
    return res.status(404).json({ message: "Meal not found!" });
  }
  res.status(200).json({ message: "Meal deleted!", meal });
});

export default routes;
