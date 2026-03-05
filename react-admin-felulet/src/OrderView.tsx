import { useState, type SetStateAction } from "react";


export type Order = {
  orders: {
    id: number;
    username: string;
    date: string;
  }[]
};

export function OrderView({ orders: orders }: Order) {

  const [searchedItem, setSearchedItem] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchedItem(event.target.value);
  };

  return (
    <>
      <h1>Rendelések listája</h1>

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
        {orders.map((order, index) => (
          <div>  <ul>
            <li key={index}>{order.id} </li>
            <li><p>Rendelő neve:</p> {order.username} </li>
            <li><p>Rendelés dátuma: </p> {order.date} </li>
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
          <h1>Új rendelés hozzáadása</h1>
          {orders.length > 0 && (
            <div>
              <div>
                <input placeholder={orders[0].username} />
                <input placeholder={orders[0].date} />
              </div>
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