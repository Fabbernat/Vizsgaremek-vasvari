import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import type { Meals } from "../types/Meals";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

const OneMeal = () => {
  const { id } = useParams();

  const [meal, setMeal] = useState<Meals>();

  useEffect(() => {
    apiClient
      .get(`/meals/${id}`)
      .then((response) => setMeal(response.data.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <Container>
        {meal ? (
          <Card style={{ width: "25vw" }} data-bs-theme="dark">
            <Card.Body>
              <Card.Title>
                <strong>{meal.name}</strong>
              </Card.Title>
              <Card.Text>{meal.description}</Card.Text>
              <Card.Text>Price: {meal.price}Ft</Card.Text>
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
