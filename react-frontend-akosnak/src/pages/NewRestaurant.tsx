import { useState } from "react";
import type { Restaurant } from "../types/Restaurant";
import apiClient, { baseURL } from "../store/store";
import { toast } from "react-toastify";

const NewRestaurant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    nev: "",
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
        value={restaurant.nev}
        onChange={(e) => setRestaurant({ ...restaurant, nev: e.target.value })}
      />

      <br />
      <button onClick={submit}>Hozzáadás</button>
    </>
  );
};

export default NewRestaurant;
