import { useState, type MouseEvent } from 'react'

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
  


  return (
    <>
    <nav>
      <ul className='no-bullets'>
        <li><button onClick={(e) => setActiveView('restaurants')}>Éttermek</button></li>
        <li><button onClick={() => setActiveView('meals')}>Ételek</button></li>
        <li><button onClick={(e) => setActiveView('orders')}>Rendelések</button></li>
        <li><button onClick={(e) => setActiveView('users')}>Felhasználók</button></li>
      </ul>
    </nav>
    <div className="grid-layout">

        <header>Header</header>
        
        <main className='currentView'>
          {/* ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben */}
          {activeView === 'meals' && <MealView meals={thisMeals} />}
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
