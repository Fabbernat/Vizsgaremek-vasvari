import { useState } from "react";
import apiClient from "../api/apiClient";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

interface AddRestaurantModalProps {
  onSuccess: () => void;
}

const AddRestaurantModal = ({ onSuccess }: AddRestaurantModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (!name || !description) {
      toast.warn("Kérlek tölts ki minden mezőt");
      return;
    }

    apiClient
      .post("/add-restaurant", { name, description })
      .then(() => {
        toast.success("Étterm hozzáadva sikeresen!");
        onSuccess();
      })
      .catch((error) => {
        console.error("Hiba az étterem hozzáadásakor:", error);
        toast.error("Nem sikerült hozzáadni az éttermet. Próbáld újra.");
      });
  };

  return (
    <>
      <Card.Title className="mt-3 mb-1">Név</Card.Title>
      <input
        type="text"
        placeholder="Étterem neve"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Card.Title className="mt-3 mb-1">Leírás</Card.Title>
      <textarea
        placeholder="Étterem leírása"
        className="form-control pb-5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Button variant="success" className="mb-3" onClick={handleSubmit}>
        Étterem hozzáadása
      </Button>
    </>
  );
};

export default AddRestaurantModal;
