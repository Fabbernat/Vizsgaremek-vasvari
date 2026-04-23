import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import type { Restaurant } from "../types/Restaurant";

interface AddMealModalProps {
  onSuccess: () => void;
}

const AddMealModal = ({ onSuccess }: AddMealModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [restaurantId, setRestaurantId] = useState<number | "">("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    apiClient
      .get("/restaurants")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch restaurants:", error);
      });
  }, []);

  const handleSubmit = () => {
    if (!restaurantId) {
      toast.error("Please select a restaurant");
      return;
    }

    apiClient
      .post(`/add-meal`, {
        name,
        description,
        price,
        restaurantId: Number(restaurantId),
      })
      .then(() => {
        toast.success("Meal added successfully!");
        onSuccess();
      })
      .catch((error) => {
        console.error("A problem has occured while adding the meal:", error);
        toast.error("Failed to add meal. Please try again.");
      });
  };

  return (
    <>
      <Card.Title className="mt-3 mb-1">Név</Card.Title>
      <input
        type="text"
        placeholder="Étel neve"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Card.Title className="mt-3 mb-1">Leírás</Card.Title>
      <textarea
        placeholder="Étel leírása"
        className="form-control pb-5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Card.Title className="mt-3 mb-1">Ár</Card.Title>
      <input
        type="number"
        placeholder="Étel ára"
        className="form-control"
        value={price}
        onChange={(e) => setPrice(e.target.valueAsNumber)}
        required
      />
      <Card.Title className="mt-3 mb-1">Étterem</Card.Title>
      <select
        className="form-control mb-3"
        value={restaurantId}
        onChange={(e) =>
          setRestaurantId(e.target.value ? Number(e.target.value) : "")
        }
        required
      >
        <option value="">Válassz éttermet</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <Button variant="success" className="mb-3" onClick={handleSubmit}>
        Étel hozzáadása
      </Button>
    </>
  );
};

export default AddMealModal;
