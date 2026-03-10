import { useEffect, useState } from "react";
import "./AllRestaurantStyle.css";
import type { Restaurant } from "../types/Restaurant.ts";
import apiClient from "../api/apiClient.ts";
import MyNavbar from "../router/Navbar.tsx";
import { Card, Container, Row } from "react-bootstrap";

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
      <title>Restaurants</title>

      <Container>
        <Row>
          {restaurants.map((r) => (
            <Card.Body>
              <Card.Title>{r.name}</Card.Title>
              {/* <Card.Subtitle>{r.imageUrl}</Card.Subtitle> */}
            </Card.Body>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllRestaurant;
