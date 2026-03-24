import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import type { Restaurant } from "../types/Restaurant";
import { toast } from "react-toastify";
import { Button, Card, Container } from "react-bootstrap";

const EditRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .then((response) => {
        setRestaurant(response.data.data);
      })
      .catch((error) => {
        console.error(
          "A problem has occurred while fetching restaurant details:",
          error,
        );
      });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (restaurant) {
      setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (restaurant) {
      apiClient
        .put(`/restaurants/${id}`, restaurant)
        .then(() => {
          toast.success("Restaurant updated successfully!");
          navigate("/restaurants/" + id);
        })
        .catch((error) => {
          console.error(
            "A problem has occurred while updating the restaurant:",
            error,
          );
          toast.error("Failed to update restaurant. Please try again.");
        });
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="mt-4" data-bs-theme="dark">
        <Card style={{ width: "20vw" }}>
          <Card.Body>
            <Card.Title>Edit Restaurant</Card.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={restaurant.name}
                  onChange={handleInputChange}
                  required
                />

                <Card.Subtitle className="mt-3">Description</Card.Subtitle>
                <div className="mt-3">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={restaurant.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <Button variant="primary" type="submit">
                Update Restaurant
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default EditRestaurant;
