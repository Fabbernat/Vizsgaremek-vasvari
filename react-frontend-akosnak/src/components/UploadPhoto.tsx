import { useState, type ChangeEvent } from "react";
import { Button } from "react-bootstrap";

interface UploadPhotoProps {
  restaurantId: number;
  onUploadSuccess?: (imagePath: string) => void;
}

export default function UploadPhoto({
  restaurantId,
  onUploadSuccess,
}: UploadPhotoProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Amikor a felhasználó kiválaszt egy fájlt, elmentjük a state-be.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setMessage("");
  };

  // A gomb megnyomásakor feltöltjük a képet a backendre.
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Kérlek, válassz ki egy képet először.");
      return;
    }
    if (!restaurantId) {
      setMessage("Nincs megadva restaurant ID.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("restaurant_id", String(restaurantId));

      const response = await fetch("http://localhost:3000/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Hiba történt: ${errorData.message || response.statusText}`);
        return;
      }

      const data = await response.json();
      setMessage("Kép sikeresen feltöltve!");
      if (data.imagePath) {
        onUploadSuccess?.(data.imagePath);
      }
      setSelectedFile(null);
    } catch (error) {
      setMessage("Szerverhiba történt a feltöltés közben.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      {/* Fájl kiválasztó input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Feltöltés gomb */}
      <Button
        variant="success"
        type="button"
        onClick={handleUpload}
        style={{ marginTop: 12, display: "block" }}
      >
        Kép feltöltése
      </Button>

      {message && <p>{message}</p>}
    </div>
  );
}
