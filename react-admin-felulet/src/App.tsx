import './App.css'
import { useState, useEffect } from 'react'
import { MainContent } from './MainContent'
import supabase from './utils/supabase'

type ViewType = "blank" | "database";

function App() {
  const [activeView, setActiveView] = useState<ViewType>('blank');

  function showDatabase() {
    setActiveView('database');
  }

  return (
    <>
      <h1>Üdvözöljük a Royal Delivery admin felületén!</h1>
      <h2>Válassza ki, hogy mit szeretne tenni</h2>

      <ul className='no-bullets'>
        {activeView === "blank" ? (
          <li>
            <button onClick={showDatabase}>
              Az adatbázis adatainak megtekintése, kezelése
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => setActiveView("blank")}>X</button>
          </li>
        )}
      </ul>

      {activeView === "database" && <MainContent />}
    </>
  );
}

export default App;