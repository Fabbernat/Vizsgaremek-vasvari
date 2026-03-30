import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AllRestaurantStyle.css";
import type { Restaurant } from "../types/Restaurant.ts";
import apiClient from "../api/apiClient.ts";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Offcanvas,
  Alert,
} from "react-bootstrap";

import TestImg from "./good-food.jpg";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar.tsx";

const AllRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] =
    useState<Restaurant | null>(null);

  const [show, setShow] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null,
  );

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const lowerQuery = searchTerm.toLowerCase();
    const name = restaurant.name ? restaurant.name.toLowerCase() : "";
    const description = restaurant.description
      ? restaurant.description.toLowerCase()
      : "";

    return name.includes(lowerQuery) || description.includes(lowerQuery);
  });
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

  const handleEdit = (e: React.MouseEvent, restaurant: Restaurant) => {
    e.stopPropagation();
    setEditingRestaurant(restaurant);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditingRestaurant(null);
  };

  const handleEditClose = () => {
    handleClose();
    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editingRestaurant) {
      setEditingRestaurant({
        ...editingRestaurant,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRestaurant) {
      apiClient
        .put(`/restaurants/${editingRestaurant.id}`, editingRestaurant)
        .then(() => {
          toast.success("Restaurant updated successfully!");
          handleEditClose();
        })
        .catch((error) => {
          console.error(
            "A problem has occurred while updating the restaurant:",
            error,
          );
          toast.error("Failed to update restaurant. Please try again.");
        });
    }
  };

  return (
    <>
      <h1>Restaurants</h1>

      <Container>
        <SearchBar
          query={searchTerm}
          onQueryChange={setSearchTerm}
          placeholder="Search..."
        />
        <Row>
          {filteredRestaurants.map((r) => (
            <Col key={r.id} xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{ width: "100%", minHeight: "300px" }}
                data-bs-theme="dark"
                className="RestCard h-70"
              >
                <Card.Header id="CardHeadR">
                  <Button
                    variant="dark"
                    onClick={(e) => handleDelete(e, r)}
                    className="DeleteBtn d-inline-flex align-items-center"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                  <Card.Title className="m-1 p-1 DeleteTxt">Delete?</Card.Title>

                  <Button
                    onClick={(e) => handleEdit(e, r)}
                    className="EditBtn d-inline-flex align-items-center"
                    variant="dark"
                  >
                    <i className="bi bi-pen"></i>
                  </Button>
                  <Card.Title className="m-1 p-1 EditTxt">Edit</Card.Title>
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
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          variant="info"
          onClick={() => navigate(`/add-restaurant`)}
          className="mt-5 mb-5 w-100 w-md-50 mx-auto d-block"
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
            <Alert variant="danger">
              <i className="bi bi-exclamation-circle me-3"></i>
              This cannot be undone!
            </Alert>
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

        <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit Restaurant</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {editingRestaurant && (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editingRestaurant.name}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="description" className="form-label mt-3">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={editingRestaurant.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <Button variant="primary" type="submit">
                  Update Restaurant
                </Button>
              </form>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
};

export default AllRestaurant;
