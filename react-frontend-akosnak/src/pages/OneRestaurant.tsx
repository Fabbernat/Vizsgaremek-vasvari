import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Restaurant } from "../types/Restaurant";
import { toast } from "react-toastify";
import apiClient, { baseURL } from "../store/store";
import { Button, Col, Container, Row } from "react-bootstrap";
import goodFood from "./good-food.jpg";

const OneRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, [id]);

  const deleteRestaurant = () => {
    apiClient
      .delete(`/restaurants/${id}`)
      .then(() => {
        toast.success("Sikeres törlés!");
        navigate("/"); // kezdőlapra irányítás
      })
      .catch(() => toast.error("Sikertelen törlés!"));
  };

  const editRestaurant = () => {
    navigate(`/edit-restaurant/${id}`);
  };

  return (
    <Container>
      {restaurant ? (
        <Row>
          <Col sm={8}>
            <h1>{restaurant.nev}</h1>

            <Button variant="warning" onClick={editRestaurant}>
              Szerkesztés
            </Button>
            <Button variant="danger" onClick={deleteRestaurant}>
              Törlés
            </Button>
          </Col>
        </Row>
      ) : (
        <>A pizza nem található!</>
      )}
    </Container>
  );
};

export default OneRestaurant;
