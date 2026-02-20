import { useState, type SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CurrentView } from './CurrentView';
import {meals} from './stores/meals';
import {restaurants} from './stores/restaurants';
import {orders} from './stores/orders';
import {users} from './stores/users';

const items = meals;

function App() {
  const [item, setItem] = useState([])
  const [restaurants, setRestaurants] = useState({}); // object
  const  [oders, setOrders] = useState(null); // null
  const [users, setUsers] = useState(undefined); // undefined

  const handleChange = (event: { target: { value: SetStateAction<number>; }; }) => {

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

      <CurrentView item={items} />

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
