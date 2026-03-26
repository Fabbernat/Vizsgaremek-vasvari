import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AllRestaurantStyle.css";
import type { Restaurant } from "../types/Restaurant.ts";
import apiClient from "../api/apiClient.ts";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";

import TestImg from "./good-food.jpg";
import { toast } from "react-toastify";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] =
    useState<Restaurant | null>(null);
  const navigate = useNavigate();

  const handleOpenDeleteModal = (restaurant: Restaurant) => {
    setRestaurantToDelete(restaurant);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRestaurantToDelete(null);
  };

  const confirmDeleteRestaurant = () => {
    if (!restaurantToDelete) return;

    apiClient
      .delete(`/restaurants/${restaurantToDelete.id}`)
      .then(() => {
        toast.success("Restaurant has been deleted");
        setRestaurants((prev) =>
          prev.filter((r) => r.id !== restaurantToDelete.id),
        );
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete restaurant");
      });
  };

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  const handleDelete = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    handleOpenDeleteModal(restaurant);
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
                    onClick={(e) => handleDelete(e, r)}
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

        <Modal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          centered
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete
            <strong>
              {" "}
              {restaurantToDelete?.name ?? "this restaurant"}
            </strong>? <br />
          </Modal.Body>
          <Modal.Body>
            <strong className="fs-15 mt-1">This cannot be undone.</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteRestaurant}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AllRestaurant;
