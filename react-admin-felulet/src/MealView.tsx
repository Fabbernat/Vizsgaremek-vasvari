import { useState } from "react";


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
  const [hasMealsListChanged, setHasMealsListChanged] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addMeal = (newMeal: { name: string; description: string; price: number }) => {
    const newMealsList = [...mealsList, { id: mealsList.length + 1, ...newMeal }]; // Az új étel hozzáadása a listához
    setMealsList(prev => [...prev, { id: prev.length + 1, ...newMeal }]);
    setHasMealsListChanged(true); // Jelzés, hogy a lista megváltozott
  }

  const deleteMeal = (id: number) => {
    setMealsList(prev => prev.filter(meal => meal.id !== id));
  };

  const deleteAll = () => {
    setMealsList([]);
  }

  return (
    <>
      <h1>Ételek listája</h1>

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
        {mealsList.map((meal) => (
          <div key={meal.id} style={{ padding: '12px' }} className="currentView">
            <h1>{meal.name} </h1>
            <ul >
              <li>Id: {meal.id} </li>
              <li>Leírás: {meal.description} </li>
              <li>Ár: {meal.price} Ft</li>
            </ul>
            <div className='modify'>
              <button>Módosítás</button>
            </div>
            <div className='delete'>
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

        <div className="delete">
          <button onClick={deleteAll}>Összes törlése</button>
        </div>
      </div>
    </>
  );
}
