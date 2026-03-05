import { useState, type SetStateAction } from "react";
import { meals } from "./stores/meals";
import { exportCSV, exportJSON } from "./utils/export";

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}[]
  ;

export function UserView({ users: users }: { users: User }) {

  const [searchedItem, setSearchedItem] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchedItem(event.target.value);
  };

  return (
    <>
      <h1>Felhasználók listája</h1>

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

        {users.map((user, index) => (
          <div key={index}>    <ul>
            <li key={index}>{user.id} </li>
            <li> {user.username} </li>
            <li> {user.firstName} {user.lastName}</li>
            <li> {user.email} </li>
            <li> {user.address}</li>
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

      <div className='add'>
        <h1>Új felhasználó hozzáadása</h1>
        {users.length > 0 && (
          <div>
            <div>
              <input placeholder={users[0].username} />
              <input placeholder={users[0].firstName} />
              <input placeholder={users[0].lastName} />
              <input placeholder={users[0].email} />
              <input placeholder={users[0].address} />
            </div>
          </div>
        )}
      </div>
      <button onClick={() => exportJSON(users, "users")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(users, "users")}>
        Export CSV
      </button>
      <div className="delete">
        <button>Összes törlése</button>
      </div>
    </>
  )
};

