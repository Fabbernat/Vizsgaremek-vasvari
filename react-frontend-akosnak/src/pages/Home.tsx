import { Alert, Button, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5 px-3">
      <h1 className="mt-5 fs-1 fs-md-2 text-center">
        Üdvözlünk a Royal Delivery adminisztrációs oldalán!
      </h1>
      <Alert variant="info" data-bs-theme="dark">
        <Alert.Heading>
          <i className="bi bi-info-circle me-3"></i>
          Fontos információk
        </Alert.Heading>
        Ez az oldal csak az <strong>ADMIN</strong> számára készült!
        <br />
        Itt tudod <strong>HOZZÁADNI</strong>, <strong>SZERKESZTENI</strong>,{" "}
        <strong>TÖRÖLNI</strong> az éttermeket és az ételeket.
      </Alert>
      <div className="text-center mt-4">
        <img
          src="/src/assets/new-royal-delivery-logo.png"
          alt="Royal Delivery Logo"
          className="img-fluid"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </div>

      <Alert data-bs-theme="dark">
        <Alert.Heading>Kezdéshez:</Alert.Heading>
        Kattints az alábbi gombra, vagy egyszerűen válaszd ki, mit szeretnél
        látni a navigációs sávban.
      </Alert>

      <Button
        variant="warning"
        size="lg"
        className="justify-content-center p-3 mb-5 d-block mx-auto"
        href="/restaurants"
      >
        Éttermek megtekintése
      </Button>
    </Container>
  );
};

export default HomePage;
