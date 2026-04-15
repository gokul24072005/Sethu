import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-layout">
        <div className="container hero-content">
          <p className="section-label">Welcome To Izone</p>
          <h1>An Information Technology Sector In Tamilnadu</h1>
          <p>
            We build websites, software, mobile apps, and digital marketing systems that help
            businesses launch faster and scale confidently.
          </p>
          <div className="hero-actions">
            <a href="/website-development" className="btn btn-primary">
              Explore Services
            </a>
            <a href="/contact-us" className="btn btn-secondary">
              Request A Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
