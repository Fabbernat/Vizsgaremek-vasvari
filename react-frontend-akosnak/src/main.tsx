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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>

    <MyNavbar />

    <Routes>
      <Route path="/" element={<div>Hello</div>} />

      <Route path="/restaurants" element={<div>Restaurants</div>} />
      <Route path="/restaurants/:id" element={<div>One Restaurant</div>} />

      <Route path="/meals" element={<div>Meals</div>} />
      <Route path="/meals/:id" element={<div>One Meal</div>} />

      <Route path="/orders" element={<div>Orders</div>} />
      <Route path="/orders/:id" element={<div>One Order</div>} />

      <Route path="/users" element={<div>Users</div>} />
      <Route path="/users/:id" element={<div>One User</div>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </BrowserRouter>

  <ToastContainer theme="colored" />
</StrictMode>
);
