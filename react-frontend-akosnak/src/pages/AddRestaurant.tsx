import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !description) {
      toast.warn("Please fill all the missing data");
      return;
    }

    apiClient
      .post("/add-restaurant", { name, description })
      .then(() => {
        toast.success("Restaurant added successfully!");
        navigate("/restaurants");
      })
      .catch((error) => {
        console.error(
          "A problem has occurred while adding the restaurant:",
          error,
        );
        toast.error("Failed to add restaurant. Please try again.");
      });
  };

  return (
    <>
      <h1>Add a new Restaurant</h1>

      <Container>
        <Card style={{ width: "20vw" }} data-bs-theme="dark">
          <Card.Body>
            <Card.Title className="mt-3">Name</Card.Title>
            <input
              type="text"
              placeholder="Restaurant name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Card.Subtitle className="mt-3">Description</Card.Subtitle>
            <textarea
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Card.Body>
          <Button variant="success" className="mb-3" onClick={handleSubmit}>
            Add Restaurant
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default AddRestaurant;
