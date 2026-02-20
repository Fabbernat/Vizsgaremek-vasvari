import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AllPizza from "./pages/AllPizza";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import OnePizza from "./pages/OnePizza";
import NewPizza from "./pages/NewPizza";
import EditPizza from "./pages/EditPizza";
import NotFoundPage from "./pages/errors/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./pages/Cart";
import MyNavbar from "./router/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>

    <MyNavbar />

    <Routes>
      <Route path="/" element={<div>Kezdőlap</div>} />

      <Route
        path="/restaurants"
        element={
          <div>
            Éttermek listája <br />
            <Link to="/restaurants/1">1-es étterem</Link><br />
            <Link to="/restaurants/2">2-es étterem</Link>
          </div>
        }
      />

      <Route path="/restaurants/:id" element={<div>Egy étterem adatai</div>} />

      <Route
        path="/meals"
        element={
          <div>
            Ételek listája <br />
            <Link to="/meals/1">1-es étel</Link><br />
            <Link to="/meals/2">2-es étel</Link>
          </div>
        }
      />

      <Route path="/meals/:id" element={<div>Egy étel adatai</div>} />

      <Route
        path="/orders"
        element={
          <div>
            Rendelések listája <br />
            <Link to="/orders/1">1-es rendelés</Link>
          </div>
        }
      />

      <Route path="/orders/:id" element={<div>Egy rendelés adatai</div>} />

      <Route
        path="/users"
        element={
          <div>
            Felhasználók listája <br />
            <Link to="/users/1">1-es felhasználó</Link>
          </div>
        }
      />

      <Route path="/users/:id" element={<div>Egy felhasználó adatai</div>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </BrowserRouter>

  <ToastContainer theme="colored" />
</StrictMode>
);
