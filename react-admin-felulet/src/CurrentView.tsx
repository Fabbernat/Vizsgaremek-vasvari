import { useState } from 'react';
import './ModernStyle.css'

type CurrentViewProps = {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
  }[]
};

export function CurrentView({ item: items }: CurrentViewProps) {
  let currentItemType = items;


  const store = /*useMealsStore()*/ { state: { item: [] } };
  const [isVisible, setIsVisible] = useState(true); // boolean


  return (
    <>
      {isVisible}
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
        <div className="list grid">
          {items.map((item, index) => (
            <ul>

              <li key={index}>{item.name} </li><br />
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
