import React from 'react';

function NotFoundPage() {
  return (
    <section className="inner-page-hero">
      <div className="container">
        <p className="section-label">Page Not Found</p>
        <h1>Requested page is unavailable</h1>
        <p>The page may have moved. Please use the menu to continue browsing.</p>
        <a href="/" className="btn btn-primary">
          Go to Home
        </a>
      </div>
    </section>
  );
}

export default NotFoundPage;
