import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AllRestaurantStyle.css";
import MyNavbar from "./components/Navbar";
import Footer from "./components/Footer";

import AllRestaurant from "./pages/AllRestaurant";
import OneRestaurant from "./pages/OneRestaurant";
import AllMeal from "./pages/AllMeal";
import OneMeal from "./pages/OneMeal";
import EditMeal from "./pages/EditMeal";
import AddMeal from "./pages/AddMeal";
import HomePage from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import NotFoundPage from "./pages/NotFound";
import UserList from "./pages/UserList";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <MyNavbar showLogin={showLogin} setShowLogin={setShowLogin} />

      <div className="routes-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<AllRestaurant />} />
          <Route path="/restaurants/:id" element={<OneRestaurant />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/meals" element={<AllMeal />} />
          <Route path="/meals/:id" element={<OneMeal />} />
          <Route path="/meals/:id/edit" element={<EditMeal />} />
          <Route path="/add-meal" element={<AddMeal />} />
          <Route path="/users" element={<UserList />} />
          {/* <Route path="/orders" element={<Order />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer setShowLogin={setShowLogin} />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={true}
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
