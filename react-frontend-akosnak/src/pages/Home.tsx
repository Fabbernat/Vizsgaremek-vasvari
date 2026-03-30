import { Alert, Button, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5 px-3">
      <h1 className="mt-5 fs-1 fs-md-2 text-center">
        Welcome to the Royal Delivery's Admin Page
      </h1>
      <Alert variant="info" data-bs-theme="dark">
        <Alert.Heading>
          <i className="bi bi-info-circle me-3"></i>
          What can you do here?
        </Alert.Heading>
        This page made only for the <strong>ADMINS</strong>!
        <br />
        Here, you can <strong>ADD</strong>, <strong>EDIT</strong>,{" "}
        <strong>DELETE</strong> the Restaurants and the meals.
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
        <Alert.Heading>To get started:</Alert.Heading>
        Click on the button below, or simply choose what would you like to see
        on the navbar.
      </Alert>

      <Button
        variant="warning"
        size="lg"
        className="justify-content-center p-3 mb-5 d-block mx-auto"
        href="/restaurants"
      >
        View Restaurants
      </Button>
    </Container>
  );
};

export default HomePage;
