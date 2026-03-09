import { useEffect, useState } from "react";
import type { Restaurant } from "../types/Restaurant";
import apiClient, { baseURL } from "../store/store";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState<Restaurant>({
    nev: "",
  });

  useEffect(() => {
    apiClient
      .get(`/restaurants/${id}`)
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, [id]);

  const submit = () => {
    const dto = {
      nev: restaurant.nev,
    };

    apiClient
      .put(`/restaurant/${id}`, dto)
      .then(() => toast.success("Sikeres szerkesztés!"))
      .catch(() => toast.error("Sikertelen szerkesztés!"));
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
      <button onClick={submit}>Szerkesztés</button>
    </>
  );
};

export default EditRestaurant;
