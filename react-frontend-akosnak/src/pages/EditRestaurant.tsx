// import { useEffect, useState } from "react";
// import type { Restaurant } from "../types/Restaurant";
// import apiClient, { baseURL } from "../store/store";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
// import { Restaurants } from "../types/TestDatas";

// const EditRestaurant = () => {
//   const { id } = useParams();

//   const [restaurant, setRestaurant] = useState<Array<Restaurant>>([]);

//   useEffect(() => {
//     apiClient
//       .get(`/restaurants/${id}`)
//       .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
//   }, [id]);

//   const submit = () => {
//     const dto = {
//       nev: restaurant,
//     };

//     apiClient
//       .put(`/restaurant/${id}`, dto)
//       .then(() => toast.success("Sikeres szerkesztés!"))
//       .catch(() => toast.error("Sikertelen szerkesztés!"));
//   };

//   return (
//     <>
//       <h1>Név:</h1>
//       <input
//         type="text"
//         value={restaurant}
//         onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
//       />

//       <br />
//       <button onClick={submit}>Szerkesztés</button>
//     </>
//   );
// };

// export default EditRestaurant;
