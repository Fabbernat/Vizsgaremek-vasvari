import { useState, type SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// stílusok
import './App.css'
import './ModernStyle.css'

// view-k
import { MealView } from './MealView';
import { RestaurantView } from './RestaurantView'
import { OrderView } from './OrderView'
import { UserView } from './UserView'

// modellek
import {meals} from './stores/meals';
import {restaurants} from './stores/restaurants';
import {orders} from './stores/orders';
import {users} from './stores/users';

const thisMeals = meals;

function App() {
  const [item, setItem] = useState([])
  const [restaurants, setRestaurants] = useState({}); // object
  const  [oders, setOrders] = useState(null); // null
  const [users, setUsers] = useState(undefined); // undefined
  const [isMealVisible, setIsMealVisible] = useState(false); // boolean

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
      <MealView meal={thisMeals} />
      <RestaurantView restaurant={restaurants} />
      <OrderView order={oders} />
      <UserView user={users} />
    </div>
  )
}

export default App
