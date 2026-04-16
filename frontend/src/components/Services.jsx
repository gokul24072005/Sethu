import React from 'react';

function Services() {
  const services = [
    {
      title: 'Web Development',
      href: '/website-development',
      description:
        'Development services for business websites, landing pages, and custom web applications.',
      icon: '🌐'
    },
    {
      title: 'Software Development',
      href: '/software-development',
      description:
        'Software planning, design, deployment, and support for internal and external workflows.',
      icon: '💻'
    },
    {
      title: 'Apps Development',
      href: '/apps-development',
      description:
        'Android and iOS application development for customer engagement and field operations.',
      icon: '📱'
    },
    {
      title: 'Digital Marketing',
      href: '/social-media-marketing',
      description:
        'Campaign strategy across search, social, email, and paid channels to improve reach.',
      icon: '📊'
    },
    {
      title: 'SEO Optimization',
      href: '/social-media-marketing',
      description:
        'Search engine optimization to improve rankings, visibility, and inbound traffic quality.',
      icon: '🔍'
    },
    {
      title: 'Digital Election Campaign',
      href: '/digital-election-campaign',
      description:
        'Political digital outreach workflows to connect candidates with potential voters.',
      icon: '🗳️'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <p className="section-label">Our Services</p>
        <h2>Custom IT Solutions For Your Successful Business</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.title} className="service-card" style={{ '--delay': `${index * 0.07}s` }}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.href} className="service-link">
                View Details
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
