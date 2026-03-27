import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/src/assets/hamburger-svgrepo-com.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Royal Delivery
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/restaurants">
            Restaurants
          </Nav.Link>
          <Nav.Link as={Link} to="/meals">
            Meals
          </Nav.Link>
          <Nav.Link as={Link} to="/orders">
            Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
