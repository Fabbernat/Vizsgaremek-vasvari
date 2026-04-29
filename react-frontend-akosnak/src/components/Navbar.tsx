import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../hook/UserAuth";
import LoginOffcanvas from "./LoginOffcanvas";
import RegisterOffcanvas from "./RegisterOffcanvas";

interface MyNavbarProps {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const MyNavbar = ({ showLogin, setShowLogin }: MyNavbarProps) => {
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
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
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
              <Nav.Link
                as={Link}
                to="/restaurants"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setShowLogin(true);
                  }
                }}
              >
                Éttermek
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/meals"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setShowLogin(true);
                  }
                }}
              >
                Ételek
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/orders"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setShowLogin(true);
                  }
                }}
              >
                Rendelések
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/users"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setShowLogin(true);
                  }
                }}
              >
                Felhasználók
              </Nav.Link>
            </Nav>

            {!isLoggedIn && (
              <Nav className="NavBar">
                <Nav.Link as="button" onClick={() => setShowLogin(true)}>
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: 30 }}
                  ></i>
                </Nav.Link>
                <Button
                  as="button"
                  className="m-1 align-item-center RegisterBtn"
                  style={{ fontFamily: "revert-layer" }}
                  variant="warning"
                  onClick={() => setShowRegister(true)}
                >
                  Regisztrálj
                </Button>
              </Nav>
            )}

            {isLoggedIn && (
              <>
                <Navbar.Text className="me-3">
                  Üdvözlünk: <strong>{username}</strong>{" "}
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
