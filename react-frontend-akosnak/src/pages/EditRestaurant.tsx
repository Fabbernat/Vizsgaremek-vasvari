import { useEffect, useState } from "react";
import type { Restaurant } from "../types/Restaurant";
import apiClient from "../store/store";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState<Restaurant>({
    name: "",
  });

//   useEffect(() => {
//     apiClient
//       .get(`/restaurants/${id}`)
//       .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
//   }, [id]);

  const submit = () => {
    const dto = {
      nev: restaurant?.name,
    };

//     apiClient
//       .put(`/restaurant/${id}`, dto)
//       .then(() => toast.success("Sikeres szerkesztés!"))
//       .catch(() => toast.error("Sikertelen szerkesztés!"));
//   };

  return (
    <>
      <h1>Név:</h1>
      <input
        type="text"
        value={restaurant?.name}
        onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
      />

//       <br />
//       <button onClick={submit}>Szerkesztés</button>
//     </>
//   );
// };

// export default EditRestaurant;
