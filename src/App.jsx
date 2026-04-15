import { useEffect, useMemo, useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FloatingContact from './components/FloatingContact';

import AboutPage from './pages/AboutPage';
import CareerPage from './pages/CareerPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ServicePage from './pages/ServicePage';
import { servicePages } from './pages/servicePages';

const staticPages = {
  '/': HomePage,
  '/index.php': HomePage,
  '/about-us': AboutPage,
  '/clients': ClientsPage,
  '/career': CareerPage,
  '/feedback': FeedbackPage,
  '/contact-us': ContactPage,
  '/contact': ContactPage
};

function normalizePath(path) {
  const safePath = path.toLowerCase();
  if (safePath.length > 1 && safePath.endsWith('/')) {
    return safePath.slice(0, -1);
  }
  return safePath;
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Keep reload behavior consistent so sticky header does not appear offset after refresh.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest('a[href]');
      if (!link) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (link.target && link.target !== '_self') {
        return;
      }

      const destination = new URL(link.href, window.location.origin);
      if (destination.origin !== window.location.origin) {
        return;
      }

      const nextPath = normalizePath(destination.pathname);
      if (nextPath === currentPath) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      event.preventDefault();
      setIsTransitioning(true);

      window.setTimeout(() => {
        window.history.pushState({}, '', nextPath);
        setCurrentPath(nextPath);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setIsTransitioning(false));
        });
      }, 140);
    };

    document.addEventListener('click', handleInternalNavigation);
    return () => document.removeEventListener('click', handleInternalNavigation);
  }, [currentPath]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const revealTargets = document.querySelectorAll(
      'section, .service-card, .hero-card, .stat-card, .home-strength-card, .home-process-card, .service-detail-card, .about-copy, .why-box, .career-copy, .feedback-copy, .contact-copy, .quote-form'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );

    revealTargets.forEach((element) => {
      element.classList.add('motion-reveal');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  const content = useMemo(() => {
    const StaticPageComponent = staticPages[currentPath];
    const servicePageConfig = servicePages[currentPath];

    if (StaticPageComponent) {
      return <StaticPageComponent />;
    }

    if (servicePageConfig) {
      return <ServicePage {...servicePageConfig} />;
    }

    return <NotFoundPage />;
  }, [currentPath]);

  return (
    <div className="site-shell">
      <Header currentPath={currentPath} />
      <main className={`site-main${isTransitioning ? ' transitioning' : ''}`}>
        <div key={currentPath} className="page-transition-layer">
          {content}
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

export default App;
