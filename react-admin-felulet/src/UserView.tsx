export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  }[]
;

function render(users: User) {
 return   users.map((item, index) => (
            <ul>
              <li key={index}>{item.id} </li><br />
              <li> {item.username} </li><br />
              <li> {item.firstName} {item.lastName}</li><br />
              <li> {item.email} </li><br />
              <li> {item.address}</li>
            </ul>
))}


export function UserView({ user: users }: { user: User }) {
  return (
    <>
    <h1>Felhasználók listája</h1>
        <div className="list grid-cards">
          {render(users)? <div className="list grid-cards">{render(users)}</div> : <p>Nincsenek felhasználók</p>}
        </div>
      <div className='add'>
        <input placeholder="" />
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