const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Royal Delivery • © {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="/">Főoldal</a>
          <span className="sep">|</span>
          <a href="/restaurants">Éttermek</a>
          <span className="sep">|</span>
          <a href="/meals">Ételek</a>
          <span className="sep">|</span>
          <a href="/orders">Rendelések</a>
          <span className="sep">|</span>
          <a href="/users">Felhasználók</a>
        </div>
        <p className="footer-tagline">Elérted a Royal Delivery legalját!. </p>
      </div>
    </footer>
  );
};

export default Footer;
