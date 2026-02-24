

export type Restaurant = {
  restaurant: {
    id: number;
    name: string;
    description: string;
  }[]
};

export function RestaurantView({ restaurant: restaurants }: Restaurant) {

  return (
    <>
      <h1>Éttermek listája</h1>
      <div className="search-container">
        <label htmlFor="search" className='search'>Keresés:
          <input type='text' placeholder='Keresés' />
        </label>
      </div>
      <div className="list grid-cards">
        {restaurants.map((restaurant, index) => (
          <div>
            <ul>
              <li key={index}>{restaurant.id} </li><br />
              <strong>   <li> {restaurant.name} </li><br /></strong>
              <li> {restaurant.description} </li><br />
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
        <h1>Új étterem hozzáadása</h1>
        {restaurants.length > 0 && (
          <div>
            <ul>
              <input placeholder={restaurants[0].name} />
              <input placeholder={restaurants[0].description} />
            </ul>
          </div>
        )}
        <button>Hozzáadás</button>
      </div>
    </div >


      <div className="delete">
        <button>Összes törlése</button>
      </div>
    </>
  );
}