import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function CurrentView() {
  const store = /*useMealsStore()*/ { state: { item: [] } };
  const [isVisible, setIsVisible] = useState(true); // boolean
  

  return (
    <>
      {isVisible && (
        <div  className='currentView'>
          {store.state.item.length}
          <ul>
            {store.state.item.map(() => (
              <li /*key={meal.name}>
                <div>{meal.name}</div>
                <div>{meal.description}</div>
                <div>{meal.price} Ft</div*/>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => setIsVisible(!isVisible)}>
        Bezárás
      </button>
      <div className='add'>
        <input/>
        <button>Hozzáadás</button>
        <div className="list">
          {item}
        </div>
      </div>
    </>
  );
}

function App() {
  const [item, setItem] = useState(0)
  const [restaurants, setRestaurants] = useState({}); // object
  const [meals, setMeals] = useState([]); // array
  const  [oders, setOrders] = useState(null); // null
  const [users, setUsers] = useState(undefined); // undefined

  const handleChange = (event) => {
    setItem(event.target.value);
  };
  return (
    <div className="App">
      <nav className='no-bullets'>
        <ul>
          <li>
            <a href="/restaurants">Éttermek</a>
          </li>
          <li>
            <a href="/meals">Ételek</a>
          </li>
          <li>
            <a href="/orders">Rendelések</a>
          </li>
          <li>
            <a href="/users">Felhasználók</a>
          </li>
        </ul>
      </nav>

      <CurrentView item={item} />

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold text-red-500">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
