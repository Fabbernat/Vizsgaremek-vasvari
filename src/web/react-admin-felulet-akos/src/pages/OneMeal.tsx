import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import type { Meals } from "../types/Meals";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const OneMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meals>();
  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    apiClient
      .get(`/meals/${id}`)
      .then((response) => {
        const mealData = response.data.data;
        setMeal(mealData);

        // Fetch restaurant details
        if (mealData.restaurantId) {
          apiClient
            .get(`/restaurants/${mealData.restaurantId}`)
            .then((res) => setRestaurantName(res.data.data.name))
            .catch((error) =>
              console.error("Failed to fetch restaurant:", error),
            );
        }
      })
      .catch((error) => console.error(error));
  }, []);

  //   Delete and Edit funcion
  const handleDelete = () => {
    apiClient
      .delete(`/meals/${id}`)
      .then(() => {
        toast("Meal deleted successfully!", { type: "success" });
        setMeal(undefined);
        navigate(`/restaurants/${id}`);
      })
      .catch((error) => {
        console.error(error);
        toast("Failed to delete meal.", { type: "error" });
      });
  };

  const navigateEdit = () => {
    navigate(`/meals/${id}/edit`);
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        {meal ? (
          <Card style={{ width: "20vw" }} data-bs-theme="dark">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <strong>{meal.name}</strong>
              </Card.Title>
              <Card.Subtitle className="mb-2">
                <strong>Description:</strong>
                <div className="text-muted mt-2">{meal.description}</div>
              </Card.Subtitle>
              <Card.Text>
                <strong>Price:</strong> {meal.price}Ft
              </Card.Text>
              <Card.Text>
                <strong>Restaurant:</strong> {restaurantName || "Loading..."}
              </Card.Text>

              {/* Delete and Edit Button */}
              <Button
                variant="primary"
                className="justify-content-center"
                onClick={navigateEdit}
              >
                Edit
              </Button>
              <Button variant="danger" className="ms-3 justify-content-center">
                <span onClick={handleDelete}>Delete</span>
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  );
};

export default OneMeal;
