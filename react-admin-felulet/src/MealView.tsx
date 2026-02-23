

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
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
        <div className="list grid">
          {meals.map((item, index) => (
            <ul>

              <li key={index}>{item.id} </li><br />
              <li> {item.name} </li><br />
              <li> {item.description} </li><br />
              <li> {item.price} Ft</li>
            </ul>
          ))}
        </div>
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
