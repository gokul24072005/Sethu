import React from 'react';

import About from '../components/About';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import FAQs from '../components/FAQs';

function HomePage() {
  const strengths = [
    {
      title: 'Strategy First',
      description:
        'We map your business goal, target audience, and success metrics before implementation.'
    },
    {
      title: 'Fast Delivery',
      description:
        'Short execution cycles and milestone tracking help you launch quickly with confidence.'
    },
    {
      title: 'Dedicated Support',
      description:
        'Our team provides continuous support after delivery for updates, campaigns, and growth.'
    }
  ];

  const processSteps = [
    { label: '01', title: 'Discover', detail: 'Understand requirements, users, and current challenges.' },
    { label: '02', title: 'Plan', detail: 'Define scope, timeline, and technology approach.' },
    { label: '03', title: 'Build', detail: 'Develop, test, and optimize with regular progress updates.' },
    { label: '04', title: 'Scale', detail: 'Launch and improve based on analytics and feedback.' }
  ];

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />

      <section className="home-strength-section">
        <div className="container">
          <div className="home-section-head">
            <p className="section-label">Why Clients Choose Us</p>
            <h2>Execution with Clarity and Accountability</h2>
          </div>
          <div className="home-strength-grid">
            {strengths.map((item, index) => (
              <article key={item.title} className="home-strength-card" style={{ '--delay': `${index * 0.08}s` }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-process-section">
        <div className="container">
          <div className="home-section-head">
            <p className="section-label">How We Work</p>
            <h2>Simple Process, Better Results</h2>
          </div>
          <div className="home-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.label} className="home-process-card" style={{ '--delay': `${index * 0.08}s` }}>
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQs />

      <section className="container page-cta-strip">
        <article>
          <h3>Need a quick consultation?</h3>
          <p>Our team can help you finalize the best solution for your business goals.</p>
        </article>
        <a href="/contact-us" className="btn btn-primary">
          Request A Quote
        </a>
      </section>
    </>
  );
}

export default HomePage;
