import { useState } from 'react';

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
      {isVisible && (
        <div className='currentView'>
          Current Itemek darabszáma: {items.length} elem
          <ul>
            {store.state.item.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => setIsVisible(!isVisible)}>
        Bezárás
      </button>
      <div className='add'>
        <input />
        <button>Hozzáadás</button>
        <div className="list">
          {items.map((item, index) => (
            <ul>

              <li key={index}>{item.name} </li><br />
              <li> {item.description} </li><br />
              <li> {item.price} Ft</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
