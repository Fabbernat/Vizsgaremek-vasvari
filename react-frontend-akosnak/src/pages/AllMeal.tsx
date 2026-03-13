import type { Meals } from "../types/Meals.ts";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { Card, Container, Row, Col } from "react-bootstrap";

const AllMeal = () => {
  const [meals, setMeals] = useState<Array<Meals>>([]);

  useEffect(() => {
    apiClient
      .get("meals")
      .then((response) => setMeals(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  return (
    <>
      <h1>Meals</h1>

      <Container>
        <Row>
          {meals.map((m) => (
            <Col key={m.id} md={4} className="mb-4">
              <Card style={{ width: "25vw" }} data-bs-theme="dark">
                <Card.Body>
                  <Card.Title>
                    <strong>{m.name}</strong>
                  </Card.Title>
                  <Card.Text>{m.description}</Card.Text>
                  <Card.Text>Price: {m.price}Ft</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllMeal;
