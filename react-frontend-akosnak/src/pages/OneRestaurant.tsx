import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Restaurant } from "../types/Restaurant.ts";
import type { Meals } from "../types/Meals.ts";
import apiClient from "../api/apiClient.ts";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const OneRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [meals, setMeals] = useState<Array<Meals>>([]);

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .then((response) => setRestaurant(response.data.data))
      .catch((error) => console.error(error));

    apiClient
      .get(`/restaurants/${id}/meals`)
      .then((response) => setMeals(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h3>Meals</h3>
      <Row>
        {meals.map((meal) => (
          <Col key={meal.id} md={4} className="mb-4">
            <Card data-bs-theme="dark">
              <Card.Body>
                <Card.Title>{meal.name}</Card.Title>
                <Card.Text>{meal.description}</Card.Text>
                <Card.Text>Price: {meal.price}Ft</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button href="/restaurants" className="back-button">
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default OneRestaurant;
