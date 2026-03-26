import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AllRestaurantStyle.css";
import type { Restaurant } from "../types/Restaurant.ts";
import apiClient from "../api/apiClient.ts";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import TestImg from "./good-food.jpg";
import { toast } from "react-toastify";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  const handleDelete = (e: React.MouseEvent, restaurantId: number) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      apiClient
        .delete(`/restaurants/${restaurantId}`)
        .then(() => {
          toast.success("Restaurant has been deleted");
          setRestaurants(restaurants.filter((r) => r.id !== restaurantId));
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <h1>Restaurants</h1>

      <Container>
        <Row>
          {restaurants.map((r) => (
            <Col key={r.id} md={4} className="mb-4">
              <Card
                style={{ width: "25vw" }}
                data-bs-theme="dark"
                className="RestCard"
              >
                <Card.Header id="CardHeadR">
                  <Button
                    variant="dark"
                    onClick={(e) => handleDelete(e, r.id)}
                    className="DeleteBtn"
                  >
                    x
                  </Button>
                  <Card.Title className="m-1 p-1 DeleteTxt">Delete?</Card.Title>
                </Card.Header>
                <Link
                  to={`/restaurants/${r.id}`}
                  className="card-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card.Img variant="top" src={TestImg} />
                  <Card.Body className="RestCardBody">
                    <Card.Title>
                      <strong>{r.name}</strong>
                    </Card.Title>
                    <Card.Text>{r.description}</Card.Text>
                    {/* <Card.Subtitle>{r.imageUrl}</Card.Subtitle> */}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          variant="info"
          onClick={() => navigate(`/add-restaurant`)}
          className="mt-3 mb-5 w-50 mx-auto d-block"
        >
          Add Restaurant
        </Button>
      </Container>
    </>
  );
};

export default AllRestaurant;
