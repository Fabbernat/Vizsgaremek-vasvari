import { useState } from "react";
import type { Restaurant } from "../types/Restaurant";
import apiClient from "../store/store";
import { toast } from "react-toastify";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    name: "",
  });

  const submit = () => {
    apiClient
      .post("/restaurants", restaurant)
      .then(() => toast.success("Sikeres hozzáadás!"))
      .catch(() => toast.error("Sikertelen hozzáadás!"));
  };

  return (
    <>
      <h1>Név:</h1>
      <input
        type="text"
        value={restaurant?.name}
        onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
      />

      <br />
      <button onClick={submit}>Hozzáadás</button>
    </>
  );
};

export default NewRestaurant;
