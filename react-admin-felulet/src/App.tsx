import { useState, type MouseEvent, type SetStateAction } from 'react'

// stílusok
import './App.css'
import './ModernStyle.css'

// view-k
import { MealView } from './MealView';
import { RestaurantView } from './RestaurantView'
import { OrderView } from './OrderView'
import { UserView } from './UserView'

// modellek
import { meals } from './stores/meals';
import { restaurants } from './stores/restaurants';
import { orders } from './stores/orders';
import { users } from './stores/users';

const thisMeals = meals;
const thisRestaurants = restaurants;
const thisOrders = orders;
const thisUsers = users;

type ViewType = 'meals' | 'restaurants' | 'orders' | 'users';

function App() {
  // A single string to track the active view with type safety
const [activeView, setActiveView] = useState<ViewType>('meals');

  const [item, setItem] = useState([]) // array
  const [restaurants, setRestaurants] = useState({}); // object
  const [oders, setOrders] = useState(null); // null
  const [users, setUsers] = useState(undefined); // undefined
  const [isMealVisible, setIsMealVisible] = useState(false); // boolean
  const [isRestaurantVisible, setIsRestaurantVisible] = useState(false); // boolean
  const [isOrderVisible, setIsOrderVisible] = useState(false); // boolean
  const [isUserVisible, setIsUserVisible] = useState(false); // boolean

  const handleSwitch = (e: MouseEvent<HTMLAnchorElement>, view: ViewType) => {
    e.preventDefault(); 
    setActiveView(view);
  };


  return (
    <div className="App">
      <nav>
        <ul className='no-bullets'>
          <li><a href="#" onClick={(e) => handleSwitch(e, 'restaurants')}>Éttermek</a></li>
          <li><a href="#" onClick={(e) => handleSwitch(e, 'meals')}>Ételek</a></li>
          <li><a href="#" onClick={(e) => handleSwitch(e, 'orders')}>Rendelések</a></li>
          <li><a href="#" onClick={(e) => handleSwitch(e, 'users')}>Felhasználók</a></li>
        </ul>
      </nav>


      // ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben
      {activeView === 'meals' && <MealView meal={thisMeals} />}
      {activeView === 'restaurants' && <RestaurantView restaurant={thisRestaurants} />}
      {activeView === 'orders' && <OrderView order={thisOrders} />}
      {activeView === 'users' && <UserView user={thisUsers} />}
    </div>
  )
}

export default App
