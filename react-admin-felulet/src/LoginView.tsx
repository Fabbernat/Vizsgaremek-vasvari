import ViewChooser from "./ViewChooser";
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

    return (
        <>
        <fieldset>
        <legend>
            <h2>Bejelentkezés</h2>
        </legend>
        <form action="#" method="post" onSubmit={handleLogin}>

        </form>
        </fieldset>
        <ViewChooser />
        </>
    )
    
}