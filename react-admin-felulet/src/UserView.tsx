import { useState, type SetStateAction } from "react";
import { meals } from "./stores/meals";

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  }[]
;

export function UserView({ user: users }: { user: User }) {

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
          </div>: null}
      </div>

 
            <div className="list grid-cards">

 {users.map((user, index) => (
        <div key={index}>    <ul>
              <li key={index}>{user.id} </li><br />
              <li> {user.username} </li><br />
              <li> {user.firstName} {user.lastName}</li><br />
              <li> {user.email} </li><br />
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
          <ul>
            <input placeholder={users[0].username} />
            <input placeholder={users[0].firstName} />
            <input placeholder={users[0].lastName} />
            <input placeholder={users[0].email} />
            <input placeholder={users[0].address} />
          </ul>
        </div>
      )}
      </div>

       <div className="delete">
        <button>Összes törlése</button>
      </div>
  </>
  )};

