import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

type Pizza = {
  id: number;
  nev: string;
  leiras: string;
};

const AllPizza = () => {
  const [pizzak, setPizzak] = useState<Pizza[]>([]);

  // 🔥 STATIKUS ADAT — így biztos megjelenik
  useEffect(() => {
    setPizzak([
      { id: 1, nev: "Margherita", leiras: "Paradicsomos" },
      { id: 2, nev: "Sonkás", leiras: "Sonka + sajt" },
    ]);
  }, []);

  return (
    <Container>
      <h1>Ételek</h1>

      <Row>
        {pizzak.map((p) => (
          <Col key={p.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{p.nev}</Card.Title>
                <Card.Text>{p.leiras}</Card.Text>
                <Button>Megtekintés</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllPizza;