import './App.css'
import { useState } from 'react'
import { DatabaseContent } from './DatabaseContent.tsx';
import ServiceStatusBoard from './Statuses.tsx';

type ViewType = "blank" | "database" | "statuses";

function App() {
  const [activeView, setActiveView] = useState<ViewType>('blank');

  function showDatabase() {
    setActiveView('database');
  }

  function showStatuses() {
    setActiveView('statuses');
  }

  return (
    <>
      <h1>Üdvözöljük a Royal Delivery admin felületén!</h1>
      <h2>Válassza ki, hogy mit szeretne tenni</h2>

        {activeView === "blank" ? (
      <ul className='no-bullets'>
          <li>
            <button onClick={showDatabase}>
              Az adatbázis adatainak megtekintése, kezelése
            </button>
          </li>
          <li>
            <button onClick={showStatuses}>
              Az adatbázisok, backendek és frontendek státuszának megtekintése, kezelése
            </button>
          </li>
      </ul>
        ) : (
          <ul>
            <li>
              <button className="deleteButton" onClick={() => setActiveView("blank")}>X</button>
            </li>
          </ul>
        )}
        <div className="p-6">
              {activeView === "database" && <DatabaseContent />}
              {activeView === "statuses" && <ServiceStatusBoard />}
        </div>
    </>
  );
}

export default App;