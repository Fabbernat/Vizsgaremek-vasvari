import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Restaurant } from "../types/Restaurant.ts";
import type { Meals } from "../types/Meals.ts";
import apiClient from "../api/apiClient.ts";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const OneRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <h1 className="mt-3">{restaurant.name}</h1>
      <h2 className="mb-5 text-center">
        Choose a meal to <strong>edit</strong> or <strong>add</strong> a new one
      </h2>
      <h3 className="m-5">Meals</h3>
      <Row>
        {meals.map((meal) => (
          <Col key={meal.id} md={4} className="mb-4">
            <Link
              to={`/meals/${meal.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card data-bs-theme="dark" style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    <strong>{meal.name}</strong>
                  </Card.Title>
                  <Card.Text>{meal.description}</Card.Text>
                  <Card.Text>Price: {meal.price}Ft</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button href={`/add-meal`} className="add-button m-2" variant="success">
          Add Meal
        </Button>

        <Button
          variant="primary"
          onClick={() => navigate(`/restaurants`)}
          className="m-2"
        >
          Go back
        </Button>

        <Button
          onClick={() => navigate(`/restaurants/${id}/edit`)}
          className="m-2"
          variant="warning"
        >
          Edit Restaurant
        </Button>
      </div>
    </Container>
  );
};

export default OneRestaurant;
