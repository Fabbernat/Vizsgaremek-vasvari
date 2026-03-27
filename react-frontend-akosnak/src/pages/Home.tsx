import { Button, Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mt-5">
      <h1 className="mt-5 fs-1 text-center">
        Welcome to the Royal Delivery's Admin Page
      </h1>
      <p className="mt-3 fs-4 text-secondary text-center px-5 py-3 border border-secondary rounded mx-auto d-block w-75 bg-dark text-light border-0">
        Use the navigation bar to manage restaurants, meals, orders, and users.
      </p>
      <div className="text-center mt-4">
        <img
          src="/src/assets/new-royal-delivery-logo.png"
          alt="Royal Delivery Logo"
          style={{ width: "400px", height: "400px" }}
        />
      </div>

      <p className="mt-4 fs-5 text-secondary text-center px-5 py-3 border border-secondary rounded mx-auto d-block w-75 bg-dark text-light border-0">
        Manage your restaurant's menu, track orders, and oversee user accounts
        with ease. Click on the links above to get started!
      </p>

      <Button
        variant="warning"
        size="lg"
        className="justify-content-center p-3 mb-5 d-block"
        href="/restaurants"
      >
        View Restaurants
      </Button>
    </Container>
  );
};

export default HomePage;
