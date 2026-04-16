import React from 'react';

import About from '../components/About';

function AboutPage() {
  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">About Us</p>
          <h1>About IZone Technology</h1>
          <p>
            We help businesses and institutions with practical IT solutions, product development,
            and digital marketing support.
          </p>
        </div>
      </section>
      <About />
    </>
  );
}

export default AboutPage;
