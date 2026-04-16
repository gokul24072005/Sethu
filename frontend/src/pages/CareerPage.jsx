import React from 'react';

import Career from '../components/Career';

function CareerPage() {
  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">Career</p>
          <h1>Build Your Career with IZone</h1>
          <p>Share your profile and we will connect with suitable opportunities.</p>
        </div>
      </section>
      <Career />
    </>
  );
}

export default CareerPage;
