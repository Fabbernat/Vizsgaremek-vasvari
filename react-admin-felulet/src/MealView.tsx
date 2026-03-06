import { useState } from "react";
import { exportCSV, exportJSON } from "./utils/export";


export type MealItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type MealViewProps = {
  meals: MealItem[];
};

export function MealView({ meals }: MealViewProps) {

  const [searchedItem, setSearchedItem] = useState('');
  const [mealsList, setMealsList] = useState(meals);
  const [editMeal, setEditMeal] = useState({
    name: "",
    description: "",
    price: 0
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addMeal = (newMeal: { name: string; description: string; price: number }) => {
    setMealsList(prev => [...prev, { id: prev.length + 1, ...newMeal }]); // Az új étel hozzáadása a listához
  }

  const modifyMeal = (id: number, newMeal: { name: string; description: string; price: number }) => {
    setMealsList(prev => prev.map(meal => meal.id === id ? { ...meal, ...newMeal } : meal));
  }

  const deleteMeal = (id: number) => {
    setMealsList(prev => prev.filter(meal => meal.id !== id));
  };

  const deleteAll = () => {
    setMealsList([]);
  }

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>): void {
    const tempMealsForSearch = meals;
    setMealsList(tempMealsForSearch => tempMealsForSearch.filter(meal => meal.name.toLowerCase().includes(searchedItem.toLowerCase())));
  }

  return (
    <>
      <h1>Ételek listája</h1>

      <div className="search-container">
        <div>

          <label htmlFor="search" className='search'>Keresés:<br />
            <input type='text' id="search" placeholder='Étel neve vagy leírása...' value={searchedItem} onChange={handleChange} />
            <button onClick={handleSearch}>🔍 Keresés</button>
            <button onClick={() => setMealsList(meals)}>Lista frissítése</button>
          </label>
        </div>
        {searchedItem !== "" ?
          <div>
            <p>Nincs találat a következőre: {searchedItem}</p>
          </div> : null}
      </div>



      <div className="list grid-cards">
        {mealsList.map((meal) => (
          <div key={meal.id} style={{ padding: '12px' }} className="currentView">
            <h1>{meal.name}</h1>

            <ul>
              <li>Id: {meal.id}</li>
              <li>Leírás: {meal.description}</li>
              <li>Ár: {meal.price} Ft</li>
            </ul>

            <div className="modify">
              <input type="text" placeholder={meal.name} value={editMeal.name}
                onChange={(e) => setEditMeal({ ...editMeal, name: e.target.value })} />
              <input type="text" placeholder={meal.description} />
              <input type="text" placeholder={meal.price.toString()} />

              <button onClick={() => modifyMeal(meal.id, editMeal)}>
                Módosítás
              </button>
            </div>

            <div className="delete">
              <button onClick={() => deleteMeal(meal.id)}>Törlés</button>
            </div>
          </div>
        ))}
      </div>


      <div>
        <aside className='add'>
          <h1>Új étel hozzáadása</h1>
          {meals.length > 0 && (
            <div>
              <div>
                <input placeholder={meals[0].name} />
                <input placeholder={meals[0].description} />
                <input placeholder={meals[0].price.toString()} />
              </div>
            </div>
          )}
          <button type="button" onClick={() => addMeal({ name: "Új étel", description: "Új leírás", price: 1000 })} value="Hozzáadás">Hozzáadás</button>
        </aside>
        <button onClick={() => exportJSON(mealsList, "meals")}>
          Export JSON
        </button>

        <button onClick={() => exportCSV(mealsList, "meals")}>
          Export CSV
        </button>
        <div className="delete">
          <button onClick={deleteAll}>Összes törlése</button>
        </div>
      </div>
    </>
  );
}
