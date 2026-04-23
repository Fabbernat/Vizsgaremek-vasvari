import type { Meals } from "../types/Meals.ts";
import type { Restaurant } from "../types/Restaurant.ts";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
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
  Form,
} from "react-bootstrap";
import SearchBar from "../components/SearchBar.tsx";
import AddMealModal from "../components/AddMealModal.tsx";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const AllMeal = () => {
  const [meals, setMeals] = useState<Array<Meals>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [show, setShow] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meals | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meals | null>(null);

  const normalizeMeal = (meal: any): Meals => ({
    ...meal,
    restaurantId: meal.restaurantId ?? meal.restaurantid,
  });

  const filteredMeals = meals.filter((meal) => {
    const lowerQuery = searchTerm.toLowerCase();
    const name = meal.name ? meal.name.toLowerCase() : "";
    const description = meal.description ? meal.description.toLowerCase() : "";
    const available = meal.available === 1 ? "elérhető" : "nem elérhető";

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      available.includes(lowerQuery)
    );
  });

  const truncateDescription = (
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

  const handleClose = () => {
    setShow(false);
    setEditingMeal(null);
  };

  const handleEdit = (meal: Meals) => {
    setEditingMeal(meal);
    setShow(true);
  };

  const handleDelete = (meal: Meals) => {
    setMealToDelete(meal);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setMealToDelete(null);
  };

  const confirmDeleteMeal = () => {
    if (!mealToDelete) return;

    apiClient
      .delete(`/meals/${mealToDelete.id}`)
      .then(() => {
        toast.success("Étel törölve!");
        setMeals((prev) => prev.filter((m) => m.id !== mealToDelete.id));
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Nem sikerült törölni az ételt!");
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editingMeal) {
      const { name, value } = e.target;
      setEditingMeal({
        ...editingMeal,
        [name]: name === "price" ? Number(value) : value,
      });
    }
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editingMeal) {
      setEditingMeal({
        ...editingMeal,
        restaurantId: Number(e.target.value),
      });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMeal) {
      apiClient
        .put(`/meals/${editingMeal.id}`, editingMeal)
        .then(() => {
          toast.success("Étel frissítve!");
          apiClient
            .get("/meals")
            .then((response) => setMeals(response.data.map(normalizeMeal)))
            .catch((error) => console.error(error));
          handleClose();
        })
        .catch((error) => {
          console.error("Hiba az ételt frissítésnél:", error);
          toast.error("Nem sikerült frissíteni az ételt!");
        });
    }
  };

  useEffect(() => {
    apiClient
      .get("/meals")
      .then((response) => setMeals(response.data.map(normalizeMeal)))
      .catch((error) => console.error(error));

    apiClient
      .get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  return (
    <>
      <h1>Ételek</h1>

      <Container>
        <SearchBar
          query={searchTerm}
          onQueryChange={setSearchTerm}
          placeholder="Keresés..."
        />
        <Row>
          {filteredMeals.map((m) => (
            <Col key={m.id} xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  width: "100%",
                  minHeight: "100%",
                  opacity: m.available === 0 ? 0.5 : 1,
                  cursor: "pointer",
                }}
                data-bs-theme="dark"
                className="h-50 RestCard"
                onClick={() => handleEdit(m)}
              >
                <Card.Body>
                  <Card.Title>
                    <strong>{m.name}</strong>
                  </Card.Title>
                  <Card.Text>
                    {truncateDescription(m.description, 50)}
                  </Card.Text>
                  <Card.Text>Price: {m.price}Ft</Card.Text>
                  <Card.Text
                    style={{
                      color: m.available === 1 ? "#28a745" : "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    {m.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Col xs={12} sm={6} md={4}>
          <OverlayTrigger
            overlay={<Tooltip className="mb-2 OvrlayTrgr">Új Étel</Tooltip>}
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
              Új étel hozzáadása
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddMealModal
              onSuccess={() => {
                setShowAddModal(false);
                apiClient
                  .get("/meals")
                  .then((response) =>
                    setMeals(response.data.map(normalizeMeal)),
                  )
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
            <Modal.Title>Étel törlése</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Biztos, hogy ki akarod törölni ezt:{" "}
            <strong>{mealToDelete?.name}</strong>?
            <br />
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
            <Button variant="danger" onClick={confirmDeleteMeal}>
              Törlés
            </Button>
          </Modal.Footer>
        </Modal>

        <Offcanvas
          show={show}
          onHide={handleClose}
          data-bs-theme="dark"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Étel szerkesztése</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {editingMeal && (
              <>
                <form onSubmit={handleEditSubmit} id="edit-form">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Étel neve
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editingMeal.name}
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
                        value={editingMeal.description}
                        onChange={handleInputChange}
                        required
                        rows={5}
                      />
                    </div>

                    <label htmlFor="price" className="form-label mt-3">
                      Ár (Ft)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={editingMeal.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                    />

                    <label htmlFor="restaurantId" className="form-label mt-3">
                      Étterem
                    </label>
                    <select
                      className="form-control"
                      id="restaurantId"
                      name="restaurantId"
                      value={editingMeal.restaurantId ?? ""}
                      onChange={handleRestaurantChange}
                      required
                    >
                      <option value="">Válassz éttermet</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </option>
                      ))}
                    </select>

                    <Form>
                      <Form.Check
                        className=" mt-3 d-flex align-items-center gap-2"
                        style={{ fontSize: "1.25rem" }}
                        type="checkbox"
                        isInvalid={false}
                        checked={editingMeal.available === 1}
                        onChange={(e) =>
                          setEditingMeal({
                            ...editingMeal,
                            available: e.target.checked ? 1 : 0,
                          })
                        }
                        id="available-switch"
                        label="Elérhető"
                      />
                    </Form>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      type="submit"
                      className="flex-grow-1"
                    >
                      Mentés
                    </Button>
                    <Button
                      variant="danger"
                      className="d-inline-flex align-items-center gap-2"
                      onClick={() => {
                        setShow(false);
                        handleDelete(editingMeal);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
};

export default AllMeal;
