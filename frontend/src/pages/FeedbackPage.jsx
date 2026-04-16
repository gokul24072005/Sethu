import React from 'react';

import Feedback from '../components/Feedback';

function FeedbackPage() {
  return (
    <>
      <section className="inner-page-hero">
        <div className="container">
          <p className="section-label">Feedback</p>
          <h1>Share Your Feedback</h1>
          <p>Your feedback helps us improve service quality and delivery experience.</p>
        </div>
      </section>
      <Feedback />
    </>
  );
}

export default FeedbackPage;
