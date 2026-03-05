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
import { applicants } from './stores/applicants';
import { CatFact } from './CatFact';
import { DashboardView } from './DashboardView';


type ViewType = 'meals' | 'restaurants' | 'orders' | 'users' | 'applicants' | 'dashboard';

function App() {
  // A single string to track the active view with type safety
  const [activeView, setActiveView] = useState<ViewType>('meals');
  const [thisMeals, setThisMeals] = useState(meals);
  const [thisRestaurants, setThisRestaurants] = useState(restaurants);
  const [thisOrders, setThisOrders] = useState(orders);
  const [thisUsers, setThisUsers] = useState(users);
  const [thisApplicants, setThisApplicants] = useState(applicants);


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
          {activeView === 'restaurants' && <RestaurantView restaurants={thisRestaurants} />}
          {activeView === 'orders' && <OrderView orders={thisOrders} />}
          {activeView === 'users' && <UserView users={thisUsers} />}
          {activeView === 'applicants' && (
            <DashboardView
              meals={thisMeals}
              restaurants={thisRestaurants}
              orders={thisOrders}
              users={thisUsers}
            />
          )}     
          </main>

        <footer>{ <CatFact />}</footer>

      </div>
    </>
  )
}

export default App
