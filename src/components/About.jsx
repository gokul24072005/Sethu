import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

function About() {
  const stats = [
    { label: 'Happy Clients', value: '100+' },
    { label: 'Projects Done', value: '250+' },
    { label: 'Awards Won', value: '10+' }
  ];
  const spotlightPoints = ['Founded in 2016', 'Cross-domain product delivery', 'Long-term client partnerships'];

  const highlights = [
    {
      title: 'High Quality',
      description: 'Our ultimate aim is to maintain high quality of service for every customer.'
    },
    {
      title: 'Low Cost',
      description: 'IZone provides all services at very affordable prices for growing businesses.'
    },
    {
      title: 'Immediate Support',
      description: 'Our team supports clients across a wide range of time with fast response.'
    },
    {
      title: 'Easy Communication',
      description: 'Multiple communication channels help clients reach us easily and quickly.'
    }
  ];

  return (
    <>
      <section className="stats-strip">
        <div className="container stats-grid">
          {stats.map((item, index) => (
            <article key={item.label} className="stat-card" style={{ '--delay': `${index * 0.06}s` }}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container about-layout">
          <article className="about-copy">
            <p className="section-label">About Izone Technology</p>
            <h2>The Best IT Solution With Years of Experience</h2>
            <p>
              Izone Technology was established in 2016 at Trichy with a diverse range of
              knowledge. We provide website design and development, software and mobile app
              development, digital marketing services, and student career development programs.
            </p>
            <ul>
              <li>Award-winning service culture</li>
              <li>Professional staff and project ownership</li>
              <li>24/7 support and fair pricing</li>
            </ul>
            <p className="contact-note">
              Call to ask any question: <a href="tel:+919943077284">+91-9943077284</a>
            </p>
          </article>

          <div className="about-media-stack">
            <div className="about-image-section">
              <ImagePlaceholder 
                alt="Professional team in modern office environment" 
                height="350px"
                imageUrl="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
              />
            </div>
            <article className="about-spotlight">
              <p className="about-spotlight-label">IZone Snapshot</p>
              <h3>From Idea to Impact</h3>
              <ul>
                {spotlightPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="why-box">
            <p className="section-label">Why Choose Izone Technology</p>
            <h3>We Are Here To Grow Your Business Exponentially</h3>
            <div className="why-grid">
              {highlights.map((item, index) => (
                <div key={item.title} className="why-item" style={{ '--delay': `${index * 0.06}s` }}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default About;
