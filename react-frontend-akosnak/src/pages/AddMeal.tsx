import { useState } from "react";
import apiClient from "../api/apiClient";
import { Button, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const AddMeal = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [restaurantId, setRestaurantId] = useState<number>(0);

  const handleSubmit = () => {
    apiClient
      .post(`/add-meal`, {
        name,
        description,
        price,
        restaurantId,
      })
      .then(() => {
        toast.success("Meal added successfully!");
      })
      .catch((error) => {
        console.error("A problem has occured while adding the meal:", error);
      });
  };

  return (
    <>
      <h1>Add a new Meal</h1>

      <Container>
        <Card style={{ width: "20vw" }} data-bs-theme="dark">
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <input
              type="text"
              placeholder="Product name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Card.Title>Description</Card.Title>
            <input
              type="text"
              placeholder="Product description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Card.Title>Price</Card.Title>
            <input
              type="number"
              placeholder="Product price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              required
            />
            <Card.Title>Restaurant ID</Card.Title>
            <input
              type="number"
              placeholder="Restaurant ID"
              className="form-control"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.valueAsNumber)}
              required
            />
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
