import { useState, type MouseEvent, type SetStateAction } from 'react'

// stílusok
import './App.css'


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


type ViewType = 'meals' | 'restaurants' | 'orders' | 'users';

function App() {
  // A single string to track the active view with type safety
  const [activeView, setActiveView] = useState<ViewType>('meals');
  const [thisMeals, setThisMeals] = useState(meals);
  const [thisRestaurants, setThisRestaurants] = useState(restaurants);
  const [thisOrders, setThisOrders] = useState(orders);
  const [thisUsers, setThisUsers] = useState(users);
  
  const handleSwitch = (e: MouseEvent<HTMLAnchorElement>, view: ViewType) => {
    e.preventDefault(); 
    setActiveView(view);
  };


  return (
    <>
    <nav>
      <ul className='no-bullets'>
        <li><a href="#" onClick={(e) => handleSwitch(e, 'restaurants')}>Éttermek</a></li>
        <li><a href="#" onClick={(e) => handleSwitch(e, 'meals')}>Ételek</a></li>
        <li><a href="#" onClick={(e) => handleSwitch(e, 'orders')}>Rendelések</a></li>
        <li><a href="#" onClick={(e) => handleSwitch(e, 'users')}>Felhasználók</a></li>
      </ul>
    </nav>
    <div className="grid-layout">

        <header>Header</header>
        
        <aside>Sidebar</aside>

        <main className='currentView'>
          {/* ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben */}
          {activeView === 'meals' && <MealView meal={thisMeals} />}
          {activeView === 'restaurants' && <RestaurantView restaurant={thisRestaurants} />}
          {activeView === 'orders' && <OrderView order={thisOrders} />}
          {activeView === 'users' && <UserView user={thisUsers} />}
        </main>

        <footer>Footer</footer>

      </div>
    </>
  )
}

export default App
