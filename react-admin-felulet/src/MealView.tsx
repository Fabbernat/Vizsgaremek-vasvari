

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
      <input type='text' placeholder='Keresés'/>
      </label>
    </div>
    <div className="list grid-cards">
          {meals.map((item, index) => (
            <div>
            <ul>
              <li key={index}>{item.id} </li><br />
              <li> {item.name} </li><br />
              <li> {item.description} </li><br />
              <li> {item.price} Ft</li>
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
        {meals.map((item, index) => (
          <div>
            <ul>
              <input placeholder={item.name} />
              <input placeholder={item.description} />
              <input placeholder={item.price.toString()} />
            </ul>
            </div>))}
        <button>Hozzáadás</button>
        </div>
      </div>
      
       <div className="delete">
          <button>Összes törlése</button>
       </div>
    </>
  );
}
