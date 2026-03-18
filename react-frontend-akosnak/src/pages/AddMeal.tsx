import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { Button, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../types/Restaurant";

const AddMeal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [restaurantId, setRestaurantId] = useState<number | "">("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch restaurants:", error);
      });
  }, []);

  const handleSubmit = () => {
    if (!restaurantId) {
      toast.error("Please select a restaurant");
      return;
    }

    apiClient
      .post(`/add-meal`, {
        name,
        description,
        price,
        restaurantId: Number(restaurantId),
      })
      .then(() => {
        toast.success("Meal added successfully!");
        navigate("/meals");
      })
      .catch((error) => {
        console.error("A problem has occured while adding the meal:", error);
        toast.error("Failed to add meal. Please try again.");
      });
  };

  return (
    <>
      <h1>Add a new Meal</h1>

      <Container>
        <Card style={{ width: "20vw" }} data-bs-theme="dark">
          <Card.Body>
            <Card.Title className="mt-3">Name</Card.Title>
            <input
              type="text"
              placeholder="Product name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Card.Title className="mt-3">Description</Card.Title>
            <input
              type="text"
              placeholder="Product description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Card.Title className="mt-3">Price</Card.Title>
            <input
              type="number"
              placeholder="Product price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              required
            />
            <Card.Title className="mt-3">Restaurant</Card.Title>
            <select
              className="form-control"
              value={restaurantId}
              onChange={(e) =>
                setRestaurantId(e.target.value ? Number(e.target.value) : "")
              }
              required
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </Card.Body>
          <Button variant="success" className="mb-3" onClick={handleSubmit}>
            Add Meal
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default AddMeal;
