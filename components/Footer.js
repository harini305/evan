export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="#home" aria-label="evam home">
          <img src="/assets/logo-opt.webp" alt="evam" width="100" height="50" />
        </a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#work">Work</a>
          <a href="#clients">Clients</a>
        </nav>
        <p>© {new Date().getFullYear()} evam Entertainment Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
