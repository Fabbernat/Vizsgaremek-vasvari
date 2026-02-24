

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
      <h1>Rendelések listája</h1>
      <div className="search-container">
        <label htmlFor="search" className='search'>Keresés:
          <input type='text' placeholder='Keresés' />
        </label>
      </div>
      <div className="list grid-cards">
        {orders.map((order, index) => (
          <div>  <ul>
            <li key={index}>{order.id} </li><br />
            <li><p>Rendelő neve:</p> {order.username} </li><br />
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
          <input />
          <button>Hozzáadás</button>
        </div>
      </div>
        
        <div className="delete">
        <button>Összes törlése</button>
      </div>
      </>
      );
}