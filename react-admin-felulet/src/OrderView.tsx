

export type Order = {
  order: {
    id: number;
    username: string;
    date: string;
  }[]
};

export function OrderView({ order: orders }: Order) {
 
     return (
    <>
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
        <div className="list grid-cards">
          {orders.map((item, index) => (
            <ul>
              <li key={index}>{item.id} </li><br />
              <li> {item.username} </li><br />
              <li> {item.date} </li>
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