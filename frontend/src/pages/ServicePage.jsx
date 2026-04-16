import React from 'react';

function ServicePage({ title, category, summary, highlights }) {
  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">{category}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="container service-detail-layout">
          <article className="service-detail-card">
            <h2>What You Get</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="service-detail-card">
            <h2>Next Step</h2>
            <p>
              Tell us your requirement and we will share the best approach, timeline, and estimate
              for your project.
            </p>
            <a href="/contact-us" className="btn btn-primary">
              Request A Quote
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

export default ServicePage;
