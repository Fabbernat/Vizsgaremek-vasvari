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

  useEffect(() => {
    apiClient
      .get(`/meals/${id}`)
      .then((response) => setMeal(response.data.data))
      .catch((error) => console.error(error));
  }, [id]);

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

  return (
    <>
      <Container>
        {meal ? (
          <Card style={{ width: "20vw" }} data-bs-theme="dark">
            <Card.Body>
              <Card.Title>
                <strong>{meal.name}</strong>
              </Card.Title>
              <Card.Text>{meal.description}</Card.Text>
              <Card.Text>Price: {meal.price}Ft</Card.Text>

              {/* Delete and Edit Button */}
              <Button variant="primary" className="me-3">
                Edit
              </Button>
              <Button variant="danger">
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
