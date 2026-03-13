import express, { Router } from "express";
import * as Restaurants from "../data/restaurantData.js";
import * as Meals from "../data/mealData.js";

const routes = express.Router();

// Get all restaurants
routes.get("/restaurants", (req, res) => {
  const restaurants = Restaurants.getRestaurants();
  res.status(201).json(restaurants);
});

routes.get("/restaurants/:id", (req, res) => {
  const restaurants = Restaurants.getRestaurantById(+req.params.id);
  if (!restaurants) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }

  const data = {
    id: restaurants.id,
    name: restaurants.name,
  };
  res.status(200).json({ message: "Restaurant loaded:", data });
});

routes.get("/restaurants/:id/meals", (req, res) => {
  const meals = Meals.getMealsByRestaurantId(+req.params.id);
  res.status(200).json(meals);
});

routes.post("/restaurants", (req, res) => {
  const { name, ownerid } = req.body;
  if (!name || !ownerid) {
    return res.status(400).json({ message: "Name and ownerid are required!" });
  }
  const restaurant = Restaurants.createRestaurant(name, ownerid);
  res.status(201).json({ message: "Restaurant created!", restaurant });
});

routes.put("/restaurants/:id", (req, res) => {
  const { name, ownerid } = req.body;
  if (!name || !ownerid) {
    return res.status(400).json({ message: "Name and ownerid are required!" });
  }
  const restaurant = Restaurants.updateRestaurant(
    +req.params.id,
    name,
    ownerid,
  );
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }
  res.status(200).json({ message: "Restaurant updated!", restaurant });
});

routes.delete("/restaurants/:id", (req, res) => {
  const restaurant = Restaurants.deleteRestaurant(+req.params.id);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found!" });
  }
  res.status(200).json({ message: "Restaurant deleted!", restaurant });
});

export default routes;
