import React from 'react';

import Contact from '../components/Contact';

function ContactPage() {
  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">Contact Us</p>
          <h1>Let Us Discuss Your Requirement</h1>
          <p>Submit your enquiry and our team will respond with the best plan and estimate.</p>
        </div>
      </section>
      <Contact />
    </>
  );
}

export default ContactPage;
