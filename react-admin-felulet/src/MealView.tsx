import { useState, type SetStateAction } from "react";


export type Meal = {
  meal: {
    id: number;
    name: string;
    description: string;
    price: number;
  }[]
};

export function MealView({ meal: meals }: Meal) {

  const [searchedItem, setSearchedItem] = useState('');
  const [mealsList, setMealsList] = useState(meals);
  const [hasMealsListChanged, setHasMealsListChanged] = useState(false);
  
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
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
          </div>: null}
      </div>

      <div className="list grid-cards">
        
        <div className='add'>
          <h1>Új étel hozzáadása</h1>
          {meals.length > 0 && (
            <div>
              <ul>
                <input placeholder={meals[0].name} />
                <input placeholder={meals[0].description} />
                <input placeholder={meals[0].price.toString()} />
              </ul>
            </div>
          )}
          <button type="button" onClick={() => addMeal({ name: "Új étel", description: "Új leírás", price: 1000 })} value="Hozzáadás">Hozzáadás</button>
        </div>
        {(
          <div>
            <div className="list grid-cards">
              {mealsList.map((meal, index) => (
                <div key={index}>
                  <ul>
                    <li>{meal.id} </li><br />
                    <strong> <li> {meal.name} </li><br /></strong>
                    <li> {meal.description} </li><br />
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
          </div>
        )}
      </div>

      <div className="delete">
        <button>Összes törlése</button>
      </div>
    </>
  );
}
