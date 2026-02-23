import { useState, type SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './ModernStyle.css'
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
      <nav>
        <ul  className='no-bullets'>
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


      // ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben
      <CurrentView item={items} />
    </div>
  )
}

export default App
