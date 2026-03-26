import { useState } from 'react'
import { DatabaseContent } from './DatabaseContent.tsx';
import ServiceStatusBoard from './Statuses.tsx';

type ViewType = "blank" | "database" | "statuses";

export default function ViewChooser(){
    const [activeView, setActiveView] = useState<ViewType>('blank');

    function getViewTitle(view: ViewType) {
        switch (view) {
        case "database":
            return "Adatbázis-kezelés";
        case "statuses":
            return "Rendszerstátuszok";
        default:
            return "Főmenü";
        }
    }
    
        return (
        <div className="app-shell">
      <header className="hero">
        <h1>Üdvözöljük a Royal Delivery admin felületén!</h1>
        <h2>Válassza ki, hogy mit szeretne tenni</h2>
      </header>

      <section className="view-panel">
        <div className="view-toolbar">
          <div className="view-toolbar-left">
            <span className="view-badge">Aktuális nézet</span>
            <h3>{getViewTitle(activeView)}</h3>
          </div>

          {activeView !== "blank" && (
            <button
              className="ghost-button"
              onClick={() => setActiveView("blank")}
            >
              ← Vissza a főmenübe
            </button>
          )}
        </div>

        <div className="view-body">
          {activeView === "blank" && (
            <ul className="menu-list no-bullets">
              <li>
                <button
                  className="menu-button"
                  onClick={() => setActiveView('database')}
                >
                  <span className="menu-button-title">
                    Adatbázis-kezelés
                  </span>
                  <span className="menu-button-subtitle">
                    Az adatbázis adatainak megtekintése és kezelése
                  </span>
                </button>
              </li>

              <li>
                <button
                  className="menu-button"
                  onClick={() => setActiveView('statuses')}
                >
                  <span className="menu-button-title">
                    Szolgáltatások állapota
                  </span>
                  <span className="menu-button-subtitle">
                    Adatbázisok, backendek és frontendek státuszának megtekintése
                  </span>
                </button>
              </li>
            </ul>
          )}

          {activeView === "database" && <DatabaseContent />}
          {activeView === "statuses" && <ServiceStatusBoard />}
        </div>
      </section>
    </div>
    )
}