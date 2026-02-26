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
import { CatFact } from './CatFact';


type ViewType = 'meals' | 'restaurants' | 'orders' | 'users' | 'dashboard';

function App() {
  // A single string to track the active view with type safety
  const [activeView, setActiveView] = useState<ViewType>('meals');
  const [thisMeals, setThisMeals] = useState(meals);
  const [thisRestaurants, setThisRestaurants] = useState(restaurants);
  const [thisOrders, setThisOrders] = useState(orders);
  const [thisUsers, setThisUsers] = useState(users);
  


  function exportJSON(mealsList: any, arg1: string): void {
    throw new Error('Function not implemented.');
  }

  function exportCSV(mealsList: any, arg1: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
    <nav>
      <ul className='no-bullets'>
        <li><button onClick={(e) => setActiveView('restaurants')}>Éttermek</button></li>
        <li><button onClick={(e) => setActiveView('meals')}>Ételek</button></li>
        <li><button onClick={(e) => setActiveView('orders')}>Rendelések</button></li>
        <li><button onClick={(e) => setActiveView('users')}>Felhasználók</button></li>
        <li><button onClick={() => setActiveView('dashboard')}>Dashboard</button></li>
      </ul>
    </nav>
    <div className="grid-layout">

        <header>👑</header>
        
        <main className='currentView'>
          {/* ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben */}
          {activeView === 'meals' && <MealView meals={thisMeals} />}
          {activeView === 'restaurants' && <RestaurantView restaurant={thisRestaurants} />}
          {activeView === 'orders' && <OrderView order={thisOrders} />}
          {activeView === 'users' && <UserView user={thisUsers} />}
        </main>

        <div className='experimental-features'>
          <button onClick={() => exportJSON(meals, "meals")}>
            Export JSON
          </button>

          <button onClick={() => exportCSV(meals, "meals")}>
            Export CSV
          </button>
        </div>

        <footer>{ <CatFact />}</footer>

      </div>
    </>
  )
}

export default App
