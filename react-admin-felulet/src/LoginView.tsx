import { useEffect, useState } from 'react'
import { DatabaseContent } from './DatabaseContent'
import ServiceStatusBoard from './Statuses'

type ViewType = "blank" | "database" | "statuses";

type AuthUser = {
  username: string;
  role: string;
};

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";

export default function LoginView () {
    const [activeView, setActiveView] = useState<ViewType>('blank');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("royalDeliveryAdminUser");

    if (savedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("royalDeliveryAdminUser");
      }
    }
  }, []);

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

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    if (
      usernameInput.trim() === DEMO_USERNAME &&
      passwordInput === DEMO_PASSWORD
    ) {
      const loggedInUser: AuthUser = {
        username: DEMO_USERNAME,
        role: "admin",
      };

      localStorage.setItem(
        "royalDeliveryAdminUser",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);
      setIsAuthenticated(true);
      setUsernameInput("");
      setPasswordInput("");
      setActiveView("blank");
      return;
    }

    setLoginError("Hibás felhasználónév vagy jelszó.");
  }

  function handleLogout() {
    localStorage.removeItem("royalDeliveryAdminUser");
    setUser(null);
    setIsAuthenticated(false);
    setActiveView("blank");
    setLoginError("");
  }

   if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <header className="hero">
          <h1>Royal Delivery Admin Felület</h1>
          <h2>Demo bejelentkezés</h2>
        </header>

        <section className="view-panel auth-panel">
          <div className="view-toolbar">
            <div className="view-toolbar-left">
              <span className="view-badge">Hozzáférés szükséges</span>
              <h3>Bejelentkezés</h3>
            </div>
          </div>

          <div className="view-body">
            <form className="login-form" onSubmit={handleLogin}>
              <label className="form-field">
                <span>Felhasználónév</span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Írd be a felhasználónevet"
                />
              </label>

              <label className="form-field">
                <span>Jelszó</span>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Írd be a jelszót"
                />
              </label>

              {loginError && <p className="error-text">{loginError}</p>}

              <button className="menu-button login-button" type="submit">
                Bejelentkezés
              </button>

              <div className="demo-box">
                <p><strong>Demo belépési adatok:</strong></p>
                <p>Felhasználónév: <code>admin</code></p>
                <p>Jelszó: <code>admin123</code></p>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
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
            {user && (
              <p className="logged-in-user">
                Bejelentkezve: <strong>{user.username}</strong> ({user.role})
              </p>
            )}
          </div>

          <div className="toolbar-actions">
            {activeView !== "blank" && (
              <button
                className="ghost-button"
                onClick={() => setActiveView("blank")}
              >
                ← Vissza a főmenübe
              </button>
            )}

            <button
              className="ghost-button logout-button"
              onClick={handleLogout}
            >
              Kijelentkezés
            </button>
          </div>
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
  );
}