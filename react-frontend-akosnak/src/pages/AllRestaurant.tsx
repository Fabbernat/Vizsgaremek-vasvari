import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  OverlayTrigger,
  Tooltip,
  Modal,
  Offcanvas,
  Alert,
} from "react-bootstrap";

import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar.tsx";
import AddRestaurantModal from "../components/AddRestaurantModal.tsx";
import UploadPhoto from "../components/UploadPhoto.tsx";

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
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const lowerQuery = searchTerm.toLowerCase();
    const name = restaurant.name ? restaurant.name.toLowerCase() : "";

    return name.includes(lowerQuery);
  });

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

  const leghtOfTheDescription = (
    description: string | null | undefined,
    maxLength: number = 50,
  ): string => {
    if (!description) {
      return "";
    }
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
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
      <h1>Éttermek</h1>

      <Container>
        <SearchBar
          query={searchTerm}
          onQueryChange={setSearchTerm}
          placeholder="Keresés..."
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
                  <Card.Title className="m-1 p-1 DeleteTxt">Törlöd?</Card.Title>

                  <Button
                    onClick={(e) => handleEdit(e, r)}
                    className="EditBtn d-inline-flex align-items-center"
                    variant="dark"
                  >
                    <i className="bi bi-pen"></i>
                  </Button>
                  <Card.Title className="m-1 p-1 EditTxt">
                    Szerkesztés
                  </Card.Title>
                </Card.Header>
                <Link
                  to={`/restaurants/${r.id}`}
                  className="card-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {r.imageurl ? (
                    <Card.Img
                      variant="top"
                      src={
                        r.imageurl.startsWith("/uploads")
                          ? `http://localhost:3000${r.imageurl}`
                          : r.imageurl
                      }
                      alt={r.name}
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "contain",
                        backgroundColor: "#111",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "200px",
                        background: "#222",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Nincs kép
                    </div>
                  )}
                  <Card.Body className="RestCardBody">
                    <Card.Title>
                      <strong>{r.name}</strong>
                    </Card.Title>
                    <Card.Text>
                      {leghtOfTheDescription(r.description, 100)}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <Col xs={12} sm={6} md={4}>
          <OverlayTrigger
            overlay={<Tooltip className="mb-2 OvrlayTrgr">Új Étterem</Tooltip>}
          >
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center FloatBtn"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
          </OverlayTrigger>
        </Col>

        <Modal
          size="lg"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Új étterem hozzáadása
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddRestaurantModal
              onSuccess={() => {
                setShowAddModal(false);
                apiClient
                  .get("/restaurants")
                  .then((response) => setRestaurants(response.data))
                  .catch((error) => console.error(error));
              }}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          centered
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>Étterem törlése</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Biztos, hogy ki akarod törölni ezt:
            <strong>
              {" "}
              {restaurantToDelete?.name ?? <i className="bi bi-bug"></i>}
            </strong>
            ? <br />
          </Modal.Body>
          <Modal.Body>
            <Alert variant="danger">
              <i className="bi bi-exclamation-circle me-3"></i>A törlés nem
              vonható vissza!
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Mégse
            </Button>
            <Button variant="danger" onClick={confirmDeleteRestaurant}>
              Törlés
            </Button>
          </Modal.Footer>
        </Modal>

        <Offcanvas show={show} onHide={handleClose} data-bs-theme="dark">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Étterem szerkesztése</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {editingRestaurant && (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Név
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
                    Leírás
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

                {editingRestaurant && (
                  <div className="mt-4">
                    <label htmlFor="photo" className="form-label">
                      Étterm fotó feltöltése
                    </label>
                    <UploadPhoto
                      restaurantId={editingRestaurant.id}
                      onUploadSuccess={() => {
                        apiClient
                          .get("/restaurants")
                          .then((response) => setRestaurants(response.data))
                          .catch((error) => console.error(error));
                      }}
                    />
                  </div>
                )}
                <Button variant="primary" type="submit" className="mt-3">
                  Étterem frissítése
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
