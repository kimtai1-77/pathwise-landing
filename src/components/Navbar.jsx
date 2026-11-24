import './Navbar.css';
import desktopLogo from '../assets/Logos/logo_main.png';
import mobileLogo from '../assets/Logos/logo_favicon.png';

const Navbar = ({ onNavigate }) => (
  <nav className="site-nav" aria-label="Main navigation">
    <button type="button" className="site-nav-brand" onClick={() => onNavigate('home')} aria-label="Pathwise Systems home">
      <picture>
        <source media="(max-width: 620px)" srcSet={mobileLogo} />
        <img src={desktopLogo} alt="Pathwise Systems" />
      </picture>
    </button>
    <div className="site-nav-links">
      <button type="button" onClick={() => onNavigate('about')}>About</button>
      <a href="#how-it-works">How it works</a>
      <button type="button" onClick={() => onNavigate('contact')}>Contact us</button>
    </div>
  </nav>
);

export default Navbar;