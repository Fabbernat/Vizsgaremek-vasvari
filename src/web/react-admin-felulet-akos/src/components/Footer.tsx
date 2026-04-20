const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Royal Delivery • © {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <span className="sep">|</span>
          <a href="/restaurants">Restaurants</a>
          <span className="sep">|</span>
          <a href="/meals">Meals</a>
          <span className="sep">|</span>
          <a href="/orders">Orders</a>
        </div>
        <p className="footer-tagline">
          You've reached the very bottom of Royal Delivery.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
