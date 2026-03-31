import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../hook/UserAuth";
import LoginOffcanvas from "./LoginOffcanvas";
import RegisterOffcanvas from "./RegisterOffcanvas";

const MyNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, username } = userAuth();

  const onLogout = () => {
    sessionStorage.clear();
    setShowLogin(false);
    navigate("/");
  };

  return (
    <>
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
          <Navbar.Toggle aria-controls={`...`} />

          <Navbar.Collapse className="justify-content-end">
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

            {!isLoggedIn && (
              <Nav>
                <Nav.Link as="button" onClick={() => setShowRegister(true)}>
                  Register
                </Nav.Link>
                <Nav.Link as="button" onClick={() => setShowLogin(true)}>
                  Login
                </Nav.Link>
              </Nav>
            )}

            {isLoggedIn && (
              <>
                <Navbar.Text className="me-3">
                  Welcome: <strong>{username}</strong>
                </Navbar.Text>
                <Button variant="dark LogoutBtn" size="sm" onClick={onLogout}>
                  <i className="bi bi-door-open"></i>
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RegisterOffcanvas
        show={showRegister}
        onHide={() => setShowRegister(false)}
      />

      <LoginOffcanvas show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
};

export default MyNavbar;
