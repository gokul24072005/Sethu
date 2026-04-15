import React from 'react';

function ClientsPage() {
  const clientTypes = [
    'Small and medium businesses',
    'Educational institutions',
    'Retail and service companies',
    'Campaign and outreach organizations'
  ];

  const supportAreas = [
    'Website and software implementation',
    'Digital campaign management',
    'Mobile app development',
    'Marketing automation and reporting'
  ];

  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">Clients</p>
          <h1>Trusted by Growing Businesses</h1>
          <p>
            Our delivery model focuses on transparency, communication, and measurable outcomes for
            every client engagement.
          </p>
        </div>
      </section>

      <section className="clients-section">
        <div className="container clients-layout">
          <article className="service-detail-card">
            <h2>Who We Serve</h2>
            <ul>
              {clientTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="service-detail-card">
            <h2>How We Support</h2>
            <ul>
              {supportAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="/contact-us" className="btn btn-primary">
              Start Your Project
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

export default ClientsPage;
