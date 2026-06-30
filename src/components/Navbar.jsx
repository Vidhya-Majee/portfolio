import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar({ show }) {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) current = section.getAttribute('id');
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#expertise', label: 'Expertise' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#certs', label: 'Certs' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLink = () => setMenuOpen(false);

  return (
    <nav id="navbar" className={show ? 'show' : ''}>
      <div className="nav-logo">vidhya<span>@portfolio</span>:~$</div>

      <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className={active === l.href.slice(1) ? 'active' : ''}
            onClick={handleLink}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="hire-btn" onClick={handleLink}>Hire Me</a>
      </div>
    </nav>
  );
}
