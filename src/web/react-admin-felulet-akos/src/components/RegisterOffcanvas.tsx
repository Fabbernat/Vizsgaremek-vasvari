import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { User } from "../types/User";
import "../styles/AllRestaurantStyle.css";

type RegisterOffcanvasProps = {
  show: boolean;
  onHide: () => void;
};

const RegisterOffcanvas = ({ show, onHide }: RegisterOffcanvasProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const onRegister = () => {
    const payload: User = {
      email,
      password,
      username,
      firstName,
      lastName,
    };

    if (!email || !password || !username || !firstName || !lastName) {
      return toast.warning("Missing data!");
    }

    apiClient
      .post("/register", payload)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        const usernameResponse = response.data.username;

        if (!token || !user_id) {
          toast.error("An error occurred when trying to register");
          return;
        }

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", usernameResponse);
        sessionStorage.setItem("user_id", user_id);

        toast.success("Successfully registered!");
        onHide();
        navigate("/");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" data-bs-theme="dark">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Regisztráció</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-start">
        <form
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
        >
          <div className="mb-3">
            <label htmlFor="register_username" className="d-block mb-2">
              Felhasználónév
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="register_username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register_firstName" className="d-block mb-2">
              Keresztnév
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="register_firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register_lastName" className="d-block mb-2">
              Vezetéknév
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="register_lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register_email" className="d-block mb-2">
              Email
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="register_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register_password" className="d-block mb-2">
              Jelszó
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="register_password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <Button type="submit" className="login-submit-btn w-100">
            Regisztráció
          </Button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RegisterOffcanvas;
