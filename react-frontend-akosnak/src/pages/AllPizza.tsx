import { useEffect, useState } from "react";
import apiClient, { baseURL } from "../store/store";
import type { Pizza } from "../types/Pizza";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import goodFood from "./good-food.jpg";
  
const AllPizza = () => {
  const navigate = useNavigate();

  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  ); // csak ID-kat tárolok

  useEffect(() => {
  setPizzak([
    { id: 1, nev: "Teszt", leiras: "Teszt leírás", imageUrl: "" }
  ] as any);
}, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  const generateCard = (pizza: Pizza) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={pizza.imageUrl ? pizza.imageUrl : goodFood}
          />
          <Card.Body>
            <Card.Title>{pizza.nev}</Card.Title>
            <Card.Text>{pizza.leiras}</Card.Text>
            <Button
              onClick={() => navigate(`/pizza/${pizza.id}`)}
              variant="primary"
            >
              Megtekintés
            </Button>
            <Button
              onClick={() => {
                setKosar([...kosar, Number(pizza.id)]);
                toast.success("Sikeresen a kosárba tetted a terméket!");
              }}
              variant="success"
            >
              Kosárba
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Row xs={"auto"} md={"auto"} className="g-4">
        {pizzak.map((i) => (
          <Col key={i.id}>
            {generateCard(i)}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllPizza;
