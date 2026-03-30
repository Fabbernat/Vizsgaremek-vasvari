import type { Meals } from "../types/Meals.ts";
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
} from "react-bootstrap";
import SearchBar from "../components/SearchBar.tsx";
import AddMealModal from "../components/AddMealModal.tsx";
import { Link } from "react-router-dom";

const AllMeal = () => {
  const [meals, setMeals] = useState<Array<Meals>>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const fetchMeals = () => {
    apiClient
      .get("/meals")
      .then((response) => setMeals(response.data))
      .catch((error) => console.error(error));
  };

  const filteredMeals = meals.filter((meal) => {
    const lowerQuery = searchTerm.toLowerCase();
    const name = meal.name ? meal.name.toLowerCase() : "";
    const description = meal.description ? meal.description.toLowerCase() : "";

    return name.includes(lowerQuery) || description.includes(lowerQuery);
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  return (
    <>
      <h1>Meals</h1>

      <Container>
        <SearchBar
          query={searchTerm}
          onQueryChange={setSearchTerm}
          placeholder="Search..."
        />
        <Row>
          {filteredMeals.map((m) => (
            <Col key={m.id} xs={12} sm={6} md={4} className="mb-4">
              <Link
                to={`/meals/${m.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  style={{ width: "100%", minHeight: "200px" }}
                  data-bs-theme="dark"
                  className="h-50 RestCard"
                >
                  <Card.Body>
                    <Card.Title>
                      <strong>{m.name}</strong>
                    </Card.Title>
                    <Card.Text>{m.description}</Card.Text>
                    <Card.Text>Price: {m.price}Ft</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <Col xs={12} sm={6} md={4}>
          <OverlayTrigger
            overlay={<Tooltip className="mb-2 OvrlayTrgr">Add meal</Tooltip>}
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
              Add New Meal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddMealModal
              onSuccess={() => {
                setShowAddModal(false);
                fetchMeals();
              }}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default AllMeal;
