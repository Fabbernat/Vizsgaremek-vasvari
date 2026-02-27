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
import { usePersistedState } from './hooks/usePersistedState';
import {exportJSON, exportCSV} from './utils/export.ts';
import { DashboardView } from './DashboardView.tsx';
import { CarreersView } from './CarreersView.tsx';


type ViewType = 'meals' | 'restaurants' | 'orders' | 'users' | 'dashboard' | 'carreers';

function App() {
  // A single string to track the active view with type safety
  const [activeView, setActiveView] = usePersistedState<ViewType>("activeView", "meals"); // meals a default view
  const [thisMeals, setThisMeals] = usePersistedState("meals", meals);  const [thisRestaurants] = usePersistedState("restaurants", restaurants);
  const [thisOrders, setThisOrders] = usePersistedState("orders", orders);
  const [thisUsers, setThisUsers] = usePersistedState("users", users);
  const [thisCarreers, setThisCarreers] = usePersistedState("carreers", []);
  
const revenue = orders.reduce((sum) => sum, 0);

  return (
    <>
    <nav>
      <ul className='no-bullets'>
        <li><button onClick={() => setActiveView('restaurants')}>Éttermek</button></li>
        <li><button onClick={() => setActiveView('meals')}>Ételek</button></li>
        <li><button onClick={() => setActiveView('orders')}>Rendelések</button></li>
        <li><button onClick={() => setActiveView('users')}>Felhasználók</button></li>
        <li><button onClick={() => setActiveView('dashboard')}>Dashboard</button></li>
        <li><button onClick={() => setActiveView('carreers')}>Karrier</button></li>
      </ul>
    </nav>
    <div className="grid-layout">

        <header>👑</header>
        
        <main className='currentView'>
          {/* ezt kéne jól kitalálni, hogy hogyan lehetne megjeleníteni a különböző típusú adatokat egy közös komponensben */}
          {activeView === 'meals' &&   <MealView meals={thisMeals} setMeals={setThisMeals} />}
          {activeView === 'restaurants' && <RestaurantView restaurant={thisRestaurants} />}
          {activeView === 'orders' && <OrderView order={thisOrders} />}
          {activeView === 'users' && <UserView user={thisUsers} />}
          {activeView === 'dashboard' && <DashboardView meals={thisMeals} restaurants={thisRestaurants} orders={thisOrders} users={thisUsers} />}
          {activeView === 'carreers' && <CarreersView carreers={thisCarreers} />}
        </main>

        <div className='experimental-features '>
          <button onClick={() => exportJSON(meals, "meals")}>
            JSON  Exportálás
          </button>

          <button onClick={() => exportCSV(meals, "meals")}>
             CSV Exportálás
          </button>

          <div>
            
          </div>
        </div>

        <footer>{ <CatFact />}</footer>

      </div>
    </>
  )
}

export default App
