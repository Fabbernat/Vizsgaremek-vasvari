import express, { Router } from "express";
import * as Restaurants from "../data/restaurantData.js";

const routes = express.Router();

// Get all restaurants
routes.get("/restaurants", (req, res) => {
  const restaurants = Restaurants.getRestaurants();
  res.status(201).json(restaurants);
});

export default routes;
