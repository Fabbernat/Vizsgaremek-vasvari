import { useState, type ChangeEvent } from "react";
import apiClient from "../api/apiClient";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

interface AddRestaurantModalProps {
  onSuccess: () => void;
}

const AddRestaurantModal = ({ onSuccess }: AddRestaurantModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoMessage, setPhotoMessage] = useState<string>("");

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoFile(file);
    setPhotoMessage("");
  };

  const uploadPhoto = async (restaurantId: number) => {
    if (!photoFile) {
      return;
    }

    const formData = new FormData();
    formData.append("photo", photoFile);
    formData.append("restaurant_id", String(restaurantId));

    const response = await fetch("http://localhost:3000/upload-photo", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Kép feltöltése nem sikerült.");
    }

    const data = await response.json();
    setPhotoMessage("Kép sikeresen feltöltve!");
    return data;
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      toast.warn("Kérlek tölts ki minden mezőt");
      return;
    }

    try {
      const response = await apiClient.post("/add-restaurant", {
        name,
        description,
      });

      const restaurantId =
        response.data?.restaurantId ||
        response.data?.restaurant?.lastInsertRowid;
      if (photoFile && restaurantId) {
        await uploadPhoto(restaurantId);
      }

      toast.success("Étterem hozzáadva sikeresen!");
      onSuccess();
    } catch (error) {
      console.error("Hiba az étterem hozzáadásakor:", error);
      toast.error("Nem sikerült hozzáadni az éttermet. Próbáld újra.");
    }
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

      <Card.Title className="mt-3 mb-1">Kép</Card.Title>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={handlePhotoChange}
      />
      {photoMessage && <p className="mt-2">{photoMessage}</p>}

      <Button variant="success" className="mb-1 mt-5" onClick={handleSubmit}>
        Étterem hozzáadása
      </Button>
    </>
  );
};

export default AddRestaurantModal;
