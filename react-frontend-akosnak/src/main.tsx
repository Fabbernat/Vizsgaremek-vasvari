import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./router/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import AllRestaurant from "./pages/AllRestaurant";
import Cart from "./pages/Cart";
import OneRestaurant from "./pages/OneRestaurant";
import AllMeal from "./pages/AllMeal";
import OneMeal from "./pages/OneMeal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<AllRestaurant />} />
        <Route path="/restaurants" element={<AllRestaurant />} />
        <Route path="/restaurants/:id" element={<OneRestaurant />} />
        <Route path="/meals" element={<AllMeal />} />
        <Route path="/meals/:id" element={<OneMeal />} />
        <Route path="/orders" element={<Cart />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
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
      theme="colored"
      transition={Slide}
    />
  </StrictMode>,
);
