

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
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
        <div className="list grid">
          {users.map((item, index) => (
            <ul>
              
              <li key={index}>{item.id} </li><br />
              <li> {item.username} </li><br />
              <li> {item.firstName} {item.lastName}</li><br />
              <li> {item.email} </li><br />
              <li> {item.address}</li>
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