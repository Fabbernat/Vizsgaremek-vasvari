import { Button, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5 px-3">
      <h1 className="mt-5 fs-1 fs-md-2 text-center">
        Welcome to the Royal Delivery's Admin Page
      </h1>
      <p className="mt-3 fs-4 fs-md-5 text-secondary text-center px-3 py-3 border border-secondary rounded mx-auto d-block w-100 w-md-75 bg-dark text-light border-0">
        Use the navigation bar to manage restaurants, meals, orders, and users.
      </p>
      <div className="text-center mt-4">
        <img
          src="/src/assets/new-royal-delivery-logo.png"
          alt="Royal Delivery Logo"
          className="img-fluid"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </div>

      <p className="mt-4 fs-5 fs-md-6 text-secondary text-center px-3 py-3 border border-secondary rounded mx-auto d-block w-100 w-md-75 bg-dark text-light border-0">
        Manage your restaurant's menu, track orders, and oversee user accounts
        with ease. Click on the links above to get started!
      </p>

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
