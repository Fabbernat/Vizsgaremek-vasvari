import { useState } from "react";
import { exportCSV, exportJSON } from "./utils/export";
import React, { useState, type SetStateAction } from "react";

export type RestaurantItem = {
  id: number;
  name: string;
  description: string;
};

type RestaurantViewProps = {
  restaurants: RestaurantItem[];
};

export function RestaurantView({ restaurants }: RestaurantViewProps) {
export type RestaurantItem = {
  restaurant: {
    id: number;
    name: string;
    description: string;
  }[]
};

type RestaurantViewProps = {
  restaurants: RestaurantItem[];
  setRestaurants: React.Dispatch<React.SetStateAction<RestaurantItem[]>>
}

export function RestaurantView({ restaurant: restaurants }: RestaurantItem) {

  const [searchedItem, setSearchedItem] = useState("");
  const [restaurantsList, setRestaurantsList] = useState<RestaurantItem[]>(restaurants);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addRestaurant = (newRestaurant: { name: string; description: string }) => {
    setRestaurantsList(prev => [
      ...prev,
      { id: Math.max(0, ...prev.map(r => r.id)) + 1, ...newRestaurant }
    ]);
  };

  const deleteRestaurant = (id: number) => {
    setRestaurantsList(prev => prev.filter(restaurant => restaurant.id !== id));
  };

  const deleteAll = () => {
    setRestaurantsList([]);
  };

  function handleSearch() {
    setRestaurantsList(
      restaurants.filter(r =>
        r.name.toLowerCase().includes(searchedItem.toLowerCase())
      )
    );
  }

  return (
    <>
      <h1>Éttermek listája</h1>

      <div className="search-container">
        <div>
          <label htmlFor="search" className="search">
            Keresés:
            <br />
            <input
              type="text"
              id="search"
              placeholder="Étterem neve..."
              value={searchedItem}
              onChange={handleChange}
            />
            <button onClick={handleSearch}>🔍 Keresés</button>
            <button onClick={() => setRestaurantsList(restaurants)}>
              Lista frissítése
            </button>
          </label>
        </div>

        {searchedItem !== "" && restaurantsList.length === 0 && (
          <div>
            <p>Nincs találat a következőre: {searchedItem}</p>
          </div>
        )}
      </div>

      <div className="list grid-cards">
        {restaurantsList.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{ padding: "12px" }}
            className="currentView"
          >
            <h1>{restaurant.name}</h1>

            <ul>
              <li>Id: {restaurant.id}</li>
              <li>{restaurant.description}</li>
            </ul>

            <div className="modify">
              <button>Módosítás</button>
            </div>

            <div className="delete">
              <button onClick={() => deleteRestaurant(restaurant.id)}>
                Törlés
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="add">
        <h1>Új étterem hozzáadása</h1>

        {restaurants.length > 0 && (
          <div>
            <input placeholder={restaurants[0].name} />
            <input placeholder={restaurants[0].description} />
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            addRestaurant({
              name: "Új étterem",
              description: "Új leírás"
            })
          }
        >
          Hozzáadás
        </button>
      </aside>

      <button onClick={() => exportJSON(restaurantsList, "restaurants")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(restaurantsList, "restaurants")}>
        Export CSV
      </button>

      <div className="delete">
        <button onClick={deleteAll}>Összes törlése</button>
      </div>
    </>
  );
}