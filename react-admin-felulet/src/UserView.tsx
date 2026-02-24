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
 return (
 <>
     <h1>Felhasználók listája</h1>
 <div className="search-container">
      <label htmlFor="search" className='search'>Keresés:
      <input type='text' placeholder='Keresés'/>
      </label>
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

