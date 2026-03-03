import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./router/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import AllRestaurant from "./pages/AllRestaurant";
import Cart from "./pages/Cart";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<AllRestaurant />} />
        <Route path="/restaurants" element={<AllRestaurant />} />
        <Route path="/orders" element={<Cart />} />
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
