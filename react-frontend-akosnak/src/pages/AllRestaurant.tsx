import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllRestaurantStyle.css";
import type { Restaurant } from "../types/Restaurant.ts";
import apiClient from "../api/apiClient.ts";
import { Card, Container, Row, Col } from "react-bootstrap";

import TestImg from "./good-food.jpg";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  return (
    <>
      <h1>Restaurants</h1>

      <Container>
        <Row>
          {restaurants.map((r) => (
            <Col key={r.id} md={4} className="mb-4">
              <Link
                to={`/restaurants/${r.id}`}
                className="card-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  style={{ width: "25vw" }}
                  data-bs-theme="dark"
                  className="RestCard"
                >
                  <Card.Img variant="top" src={TestImg} />
                  <Card.Body className="RestCardBody">
                    <Card.Title>
                      <strong>{r.name}</strong>
                    </Card.Title>
                    <Card.Text>
                      This is a TEST decription for the restaurant. More details
                      will be added later.
                    </Card.Text>
                    {/* <Card.Subtitle>{r.imageUrl}</Card.Subtitle> */}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllRestaurant;
