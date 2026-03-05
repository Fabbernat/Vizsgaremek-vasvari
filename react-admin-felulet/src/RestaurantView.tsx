import { useState, type SetStateAction } from "react";
import { exportCSV, exportJSON } from "./utils/export";


export type Restaurant = {
  restaurants: {
    id: number;
    name: string;
    description: string;
  }[]
};

export function RestaurantView({ restaurants: restaurants }: Restaurant) {

  const [searchedItem, setSearchedItem] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchedItem(event.target.value);
  };

  return (
    <>
      <h1>Éttermek listája</h1>

      <div className="search-container">
        <div>

          <label htmlFor="search" className='search'>Keresés:
            <input type='text' id="search" placeholder='Keresés' value={searchedItem} onChange={handleChange} />
            <button>Keresés</button>
          </label>
        </div>
        {searchedItem !== "" ?
          <div>
            <p>Nincs találat a következőre: {searchedItem}</p>
          </div> : null}
      </div>


      <div className="list grid-cards">
        {restaurants.map((restaurant, index) => (
          <div>
            <ul>
              <li key={index}>{restaurant.id} </li>
              <strong>   <li> {restaurant.name} </li></strong>
              <li> {restaurant.description} </li>
            </ul>
            <div className='modify'>
              <button>Módosítás</button>
            </div>
            <div className='delete'>
              <button>Törlés</button>
            </div>
          </div>
        ))}
        <aside className='add'>
          <h1>Új étterem hozzáadása</h1>
          {restaurants.length > 0 && (
            <div>
              <div>
                <input placeholder={restaurants[0].name} />
                <input placeholder={restaurants[0].description} />
              </div>
            </div>
          )}
          <button>Hozzáadás</button>
        </aside>
      </div >
      <button onClick={() => exportJSON(restaurants, "restaurants")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(restaurants, "restaurants")}>
        Export CSV
      </button>
      <div className="delete">
        <button>Összes törlése</button>
      </div>
    </>
  );
}