import { useState, type SetStateAction } from "react";
import { exportCSV, exportJSON } from "./utils/export";


export type RestaurantItem = {
  restaurants: {
    id: number;
    name: string;
    description: string;
  }[]
};

type RestaurantViewProps = {
  restauransts: RestaurantItem[];
};

export function RestaurantView({ restaurants: restaurants }: RestaurantItem) {

  const [searchedItem, setSearchedItem] = useState('');
  const [restaurantsList, setRestaurantsList] = useState(restaurants);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addRestaurant = (newRestaurant: { id: string; name: string; description: string }) => {
    setRestaurantsList(prev  => [...prev, { id: prev.length + 1, ...newRestaurant }]);
  }

  const deleteRestaurant = (id: number) => {
    setRestaurantsList(prev => prev.filter(restaurant => restaurant.id !== id));
  };

  const deleteAll = () => {
    setRestaurantsList([]);
  }

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>): void {
    const tempRestaurantsForSearch = restaurants;
    setRestaurantsList(tempRestaurantsForSearch => tempRestaurantsForSearch.filter(restaurant => restaurant.name.toLowerCase().includes(searchedItem.toLowerCase())));
  }

  return (
    <>
      <h1>Éttermek listája</h1>

      <div className="search-container">
        <div>

          <label htmlFor="search" className='search'>Keresés:<br />
            <input type='text' id="search" placeholder='Étel neve vagy leírása...' value={searchedItem} onChange={handleChange} />
            <button onClick={handleSearch}>🔍 Keresés</button>
            <button onClick={() => setRestaurantsList(restaurants)}>Lista frissítése</button>
          </label>
        </div>
        {searchedItem !== "" ?
          <div>
            <p>Nincs találat a következőre: {searchedItem}</p>
          </div> : null}
      </div>


      <div className="list grid-cards">
        {restaurantsList.map((restaurant) => (
          <div key={restaurant.id} style={{padding: '12px'}} className="currentView">
            <h1>{restaurant.name}</h1>
            <ul>
              <li>Id: {restaurant.id} </li>
              <li> {restaurant.description} </li>
            </ul>
            <div className='modify'>
              <button>Módosítás</button>
            </div>
            <div className='delete'>
              <button onClick={() => deleteRestaurant(restaurant.id)}>Törlés</button>
            </div>
          </div>
        ))}
      </div>

      <div>
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
          <button type="button" onClick={() => addRestaurant({ name: "Új étterem", description: "Új leírás"})} value="Hozzáadás">Hozzáadás</button>
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