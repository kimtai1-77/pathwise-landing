import { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import desktopLogo from '../assets/Logos/logo_main.png';
import mobileLogo from '../assets/Logos/logo_favicon.png';

const Navbar = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => drawerRef.current?.querySelector('button')?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key !== 'Tab') return;

      const focusable = drawerRef.current?.querySelectorAll('button, a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const navigate = (page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  const showHowItWorks = (event) => {
    setMenuOpen(false);
    if (!document.getElementById('how-it-works')) {
      event.preventDefault();
      onNavigate('home');
      requestAnimationFrame(() => document.getElementById('how-it-works')?.scrollIntoView());
    }
  };

  const links = (
    <>
      <button type="button" onClick={() => navigate('about')}>About</button>
      <a href="#how-it-works" onClick={showHowItWorks}>How it works</a>
      <button type="button" onClick={() => navigate('contact')}>Contact us</button>
    </>
  );

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <button type="button" className="site-nav-brand" onClick={() => navigate('home')} aria-label="Pathwise Systems home">
        <picture>
          <source media="(max-width: 620px)" srcSet={mobileLogo} />
          <img src={desktopLogo} alt="Pathwise Systems" />
        </picture>
      </button>
      <div className="site-nav-links">{links}</div>
      <button ref={menuButtonRef} type="button" className="site-nav-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
        <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
      </button>
      <div className={`site-nav-overlay${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <div ref={drawerRef} id="mobile-menu" className={`site-nav-drawer${menuOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation" inert={!menuOpen}>
        <button type="button" className="site-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        </button>
        <div className="site-nav-drawer-links">{links}</div>
      </div>
    </nav>
  );
};

export default Navbar;