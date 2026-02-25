import { useState, type SetStateAction } from "react";


export type MealItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type MealViewProps = {
  meal: MealItem[];
};

export function MealView({ meal: meals }: MealViewProps) {

  const [searchedItem, setSearchedItem] = useState('');
  const [mealsList, setMealsList] = useState(meals);
  const [hasMealsListChanged, setHasMealsListChanged] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
  };

  const addMeal = (newMeal: { name: string; description: string; price: number }) => {
    const newMealsList = [...mealsList, { id: mealsList.length + 1, ...newMeal }]; // Az új étel hozzáadása a listához
    setMealsList(newMealsList);
    setHasMealsListChanged(true); // Jelzés, hogy a lista megváltozott
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


      {(
        <div className="list grid-cards">
          {mealsList.map((meal) => (
            <div key={meal.id}>
              <ul style={{ padding: '12px' }}>
                <li>{meal.id} </li>
                <strong> <li> {meal.name} </li></strong>
                <li> {meal.description} </li>
                <li> {meal.price} Ft</li>
              </ul>
              <div className='modify'>
                <button>Módosítás</button>
              </div>
              <div className='delete'>
                <button>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      )}

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
          <button>Összes törlése</button>
        </div>
      </div>
    </>
  );
}
