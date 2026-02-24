

export type Meal = {
  meal: {
    id: number;
    name: string;
    description: string;
    price: number;
  }[]
};

export function MealView({ meal: meals }: Meal) {

  return (
    <>
      <h1>Ételek listája</h1>
      <div className="search-container">
        <label htmlFor="search" className='search'>Keresés:
          <input type='text' placeholder='Keresés' />
        </label>
      </div>
      <div className="list grid-cards">
        {meals.map((meal, index) => (
          <div>
            <ul>
              <li key={index}>{meal.id} </li><br />
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
          <button>Hozzáadás</button>
        </div>
      </div>

      <div className="delete">
        <button>Összes törlése</button>
      </div>
    </>
  );
}
