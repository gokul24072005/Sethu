import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/izone_logo2.png';

function Header({ currentPath = '/' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const developmentMenuRef = useRef(null);
  const marketingMenuRef = useRef(null);

  const developmentLinks = [
    { href: '/website-development', label: 'Website Development' },
    { href: '/software-development', label: 'Software Development' },
    { href: '/apps-development', label: 'Apps Development' }
  ];

  const marketingLinks = [
    { href: '/bulk-sms', label: 'Bulk SMS' },
    { href: '/voice-sms', label: 'Voice SMS' },
    { href: '/whatsapp-marketing', label: 'Whatsapp Marketing' },
    { href: '/social-media-marketing', label: 'Social Media Marketing' },
    { href: '/digital-election-campaign', label: 'Digital Election Campaign' }
  ];

  const directLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/clients', label: 'Clients' },
    { href: '/career', label: 'Career' },
    { href: '/feedback', label: 'Feedback' },
    { href: '/contact-us', label: 'Contact Us' }
  ];

  const isActive = (href) => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  const developmentActive = developmentLinks.some((item) => isActive(item.href));
  const marketingActive = marketingLinks.some((item) => isActive(item.href));

  const closeMenus = () => {
    developmentMenuRef.current?.removeAttribute('open');
    marketingMenuRef.current?.removeAttribute('open');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideDevelopment = developmentMenuRef.current?.contains(event.target);
      const clickedInsideMarketing = marketingMenuRef.current?.contains(event.target);

      if (!clickedInsideDevelopment && !clickedInsideMarketing) {
        closeMenus();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenus();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="site-header">

      <div className="nav-wrap">
        <div className="container nav-content">
          <a href="/" className="brand">
            <img src={logo} alt="IZone Technology" className="logo-image" />
          </a>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <nav className={`primary-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {directLinks.slice(0, 2).map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className={isActive(item.href) ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <details
              ref={developmentMenuRef}
              className={`nav-group${developmentActive ? ' active' : ''}`}
              onMouseEnter={() => {
                if (developmentMenuRef.current) {
                  developmentMenuRef.current.open = true;
                }
                marketingMenuRef.current?.removeAttribute('open');
              }}
              onMouseLeave={() => {
                developmentMenuRef.current?.removeAttribute('open');
              }}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  marketingMenuRef.current?.removeAttribute('open');
                }
              }}
            >
              <summary>Development</summary>
              <div className="nav-dropdown">
                {developmentLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={isActive(item.href) ? 'active' : ''}
                    onClick={() => { closeMenus(); setMobileMenuOpen(false); }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </details>

            <details
              ref={marketingMenuRef}
              className={`nav-group${marketingActive ? ' active' : ''}`}
              onMouseEnter={() => {
                if (marketingMenuRef.current) {
                  marketingMenuRef.current.open = true;
                }
                developmentMenuRef.current?.removeAttribute('open');
              }}
              onMouseLeave={() => {
                marketingMenuRef.current?.removeAttribute('open');
              }}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  developmentMenuRef.current?.removeAttribute('open');
                }
              }}
            >
              <summary>Digital Marketing</summary>
              <div className="nav-dropdown">
                {marketingLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={isActive(item.href) ? 'active' : ''}
                    onClick={() => { closeMenus(); setMobileMenuOpen(false); }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </details>

            {directLinks.slice(2).map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className={isActive(item.href) ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
