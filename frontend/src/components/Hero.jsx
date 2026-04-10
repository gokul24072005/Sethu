import React from 'react';

function Hero() {
  const heroCards = [
    {
      title: 'Design & Development',
      subtitle: 'Using advanced technologies for long-term growth'
    },
    {
      title: 'Digital Marketing',
      subtitle: 'High-impact campaigns at a comfortable price'
    },
    {
      title: 'Digital Election Campaign',
      subtitle: 'Focused outreach support across India'
    }
  ];
  const showcaseLinks = ['Platform', 'Solutions', 'Developers', 'Pricing'];
  const heroDeliveryNotes = ['High Clarity', 'Soft Lighting', 'Smooth Motion'];

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        <div className="hero-content">
          <p className="section-label">Welcome To Izone</p>
          <h1>An Information Technology Sector In Tamilnadu</h1>
          <p>
            We build websites, software, mobile apps, and digital marketing systems that help
            businesses launch faster and scale confidently.
          </p>
          <div className="hero-floating-badges" aria-hidden="true">
            <span>Fast Delivery</span>
            <span>Creative Team</span>
          </div>
          <div className="hero-actions">
            <a href="/website-development" className="btn btn-primary">
              Explore Services
            </a>
            <a href="/contact-us" className="btn btn-secondary">
              Request A Quote
            </a>
          </div>
        </div>

        <div className="hero-card-grid">
          {heroCards.map((card, index) => (
            <article key={card.title} className="hero-card" style={{ '--delay': `${index * 0.1}s` }}>
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
            </article>
          ))}
        </div>

        <div className="hero-image-section hero-image-showcase">
          <div className="hero-showcase-shell" aria-hidden="true">
            <div className="hero-showcase-glow hero-showcase-glow-a" />
            <div className="hero-showcase-glow hero-showcase-glow-b" />
            <div className="hero-browser-window">
              <div className="hero-browser-toolbar">
                <div className="hero-browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-browser-address">https://izone.in</div>
              </div>

              <div className="hero-browser-viewport">
                <div className="hero-browser-scroll-track">
                  <div className="hero-browser-scroll-content">
                    <header className="hero-showcase-nav">
                      <p className="hero-showcase-brand">Izone technology</p>
                      <nav>
                        {showcaseLinks.map((link) => (
                          <span key={link}>{link}</span>
                        ))}
                      </nav>
                      <span className="hero-showcase-nav-cta">Book Demo</span>
                    </header>

                    <section className="hero-showcase-hero">
                      <div className="hero-showcase-copy">
                        <p className="hero-showcase-kicker">Modern Product Infrastructure</p>
                        <h3>Launch faster with one intelligent workspace for teams.</h3>
                        <p>
                          Plan, ship, and monitor customer-facing experiences from a calm dashboard designed for
                          design, product, and engineering.
                        </p>
                        <div className="hero-showcase-actions">
                          <span className="hero-showcase-btn hero-showcase-btn-primary">Start Free</span>
                          <span className="hero-showcase-btn hero-showcase-btn-secondary">See Platform</span>
                        </div>
                      </div>

                      <article className="hero-showcase-testimonial">
                        <p className="hero-showcase-rating">4.9/5 Average Customer Satisfaction</p>
                        <p className="hero-showcase-quote">
                          &ldquo;We cut release friction dramatically and finally got full visibility from concept to
                          deployment.&rdquo;
                        </p>
                        <div className="hero-showcase-author">
                          <span className="hero-showcase-avatar">MJ</span>
                          <div>
                            <strong>Maria Johnson</strong>
                            <p>Head of Product, Northbridge</p>
                          </div>
                        </div>
                      </article>
                    </section>

                    <section className="hero-showcase-support">
                      <article>
                        <h4>Insight Timeline</h4>
                        <p>Monitor conversion, engagement, and release confidence at a glance.</p>
                      </article>
                      <article>
                        <h4>Secure Collaboration</h4>
                        <p>Role-based workflows and transparent approvals for every launch cycle.</p>
                      </article>
                    </section>
                  </div>
                </div>
                <span className="hero-showcase-cursor" />
              </div>
            </div>
          </div>
          <div className="hero-image-notes">
            {heroDeliveryNotes.map((note) => (
              <p key={note} className="hero-image-note">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
