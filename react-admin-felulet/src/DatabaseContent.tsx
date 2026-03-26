

// view-k
import { MealView } from './MealView.tsx';
import { RestaurantView } from './RestaurantView.tsx'
import { OrderView } from './OrderView.tsx'
import { UserView } from './UserView.tsx'

// modellek
import { meals } from './stores/meals.ts';
import { restaurants } from './stores/restaurants.ts';
import { orders } from './stores/orders.ts';
import { users } from './stores/users.ts';
import { applicants } from './stores/applicants.ts';
import { CatFact } from './CatFact.tsx';
import { DashboardView } from './DashboardView.tsx';
import { usePersistedState } from './hooks/usePersistedState.ts';
import { exportJSON, exportCSV } from './utils/export.ts';
import { CarreersView } from './CarreersView.tsx';
import { useState } from 'react';



export function DatabaseContent(){
  // A single string to track the active view with type safety
  const [activeView, setActiveView] = useState<ViewType>('meals');
  const [thisMeals, setThisMeals] = usePersistedState("meals", meals);
  const [thisRestaurants, setThisRestaurants] = usePersistedState("restaurants", restaurants);
  const [thisOrders, setThisOrders] = usePersistedState("orders", orders);
  const [thisUsers, setThisUsers] = usePersistedState("users", users);
  const [thisApplicants, setThisApplicants] = usePersistedState("applicants", applicants);
  const [thisCarreers, setThisCarreers] = usePersistedState("carreers", []);


  type ViewType = 'meals' | 'restaurants' | 'orders' | 'users' | 'dashboard' | 'carreers';




    return (
    <>
    <nav className='szoros-elrendezes'>
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
          {activeView === 'meals' && <MealView meals={thisMeals} setMeals={setThisMeals} />}
          {activeView === 'restaurants' && <RestaurantView restaurants={thisRestaurants} setRestaurants={setThisRestaurants} />}
          {activeView === 'orders' && <OrderView orders={thisOrders} />}
          {activeView === 'users' && <UserView users={thisUsers} />}
          {activeView === 'dashboard' && (
              <DashboardView meals={thisMeals} restaurants={thisRestaurants} orders={thisOrders} users={thisUsers} applicants={thisApplicants} />
            )}
          {activeView === 'carreers' && <CarreersView applicants={thisApplicants} />}
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

        <footer>{<CatFact />}</footer>

      </div >
    </>
    )
}