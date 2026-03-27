import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AllRestaurantStyle.css";
import MyNavbar from "./router/Navbar";
import Footer from "./components/Footer";

import AllRestaurant from "./pages/AllRestaurant";
import Cart from "./pages/Cart";
import OneRestaurant from "./pages/OneRestaurant";
import AllMeal from "./pages/AllMeal";
import OneMeal from "./pages/OneMeal";
import EditMeal from "./pages/EditMeal";
import AddMeal from "./pages/AddMeal";
import HomePage from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<AllRestaurant />} />
        <Route path="/restaurants/:id" element={<OneRestaurant />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/meals" element={<AllMeal />} />
        <Route path="/meals/:id" element={<OneMeal />} />
        <Route path="/meals/:id/edit" element={<EditMeal />} />
        <Route path="/add-meal" element={<AddMeal />} />
        <Route path="/orders" element={<Cart />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>

      <Footer />
    </BrowserRouter>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
      transition={Slide}
    />
  </StrictMode>,
);
