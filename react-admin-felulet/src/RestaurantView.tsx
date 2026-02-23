

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
        <div className="list grid-cards">
          {restaurants.map((item, index) => (
            <ul>

              <li key={index}>{item.id} </li><br />
              <li> {item.name} </li><br />
              <li> {item.description} </li><br />
            </ul>
          ))}
        </div>
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
      </div>
      <div className='modify'>
        <input type='text' placeholder='Keresés'/>
        <button>Módosítás</button>
      </div>
      <div className='delete'>
        <input type='text' placeholder='Keresés'/>
        <button>Törlés</button>
      </div>
       <div className="delete">
        <fieldset>
          <legend>Válassz egy elemet a törléshez:</legend>
           for item in items:
             {<select name="" id=""></select>}
        </fieldset>
        <input type="submit" value="Törlés" />
       </div>
    </>
  );
}