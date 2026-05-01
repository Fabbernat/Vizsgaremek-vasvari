import { Link } from "react-router-dom";
import userAuth from "../hook/UserAuth";

interface FooterProps {
  setShowLogin: (show: boolean) => void;
}

const Footer = ({ setShowLogin }: FooterProps) => {
  const { isLoggedIn } = userAuth();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Royal Delivery • © {new Date().getFullYear()}</p>
        <div className="footer-links">
          <Link to="/">Főoldal</Link>
          <span className="sep">|</span>
          <Link
            to="/restaurants"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
          >
            Éttermek
          </Link>
          <span className="sep">|</span>
          <Link
            to="/meals"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
          >
            Ételek
          </Link>
          <span className="sep">|</span>
          <Link
            to="/orders"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
          >
            Rendelések
          </Link>
          <span className="sep">|</span>
          <Link
            to="/users"
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
          >
            Felhasználók
          </Link>
        </div>
        <p className="footer-tagline">Elérted a Royal Delivery legalját!. </p>
      </div>
    </footer>
  );
};

export default Footer;
