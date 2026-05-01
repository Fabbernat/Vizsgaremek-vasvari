import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { User } from "../types/User";
import "../styles/AllRestaurantStyle.css";

type LoginOffcanvasProps = {
  show: boolean;
  onHide: () => void;
};

const LoginOffcanvas = ({ show, onHide }: LoginOffcanvasProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const onLogin = () => {
    const payload: User = {
      email,
      password,
      username,
      firstName: "",
      lastName: "",
    };

    if (!email || !password || !username) {
      return toast.warning("Missing data!");
    }

    apiClient
      .post("/login", payload)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        const usernameResponse = response.data.username;

        if (!token || !user_id) {
          toast.error("An error occurred when trying to login");
          return;
        }

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", usernameResponse);
        sessionStorage.setItem("user_id", user_id);

        toast.success("Successfully logged in!");
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
        <Offcanvas.Title>Bejelentkezés</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-start">
        <form
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div className="mb-3">
            <label htmlFor="login_username" className="d-block mb-2">
              Felhasználónév
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="login_username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login_email" className="d-block mb-2">
              E-mail
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="login_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login_password" className="d-block mb-2">
              Jelszó
            </label>
            <input
              className="w-100 ps-2 LoginInp"
              id="login_password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <Button type="submit" className="login-submit-btn w-100">
            Bejelentkezés
          </Button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LoginOffcanvas;
