import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      quote: 'IZone transformed our business with a stunning website. The team was professional, responsive, and delivered on time.',
      author: 'Ramesh Kumar',
      role: 'Business Owner'
    },
    {
      quote: 'Their digital marketing campaign increased our leads by 300%. Highly recommend their expertise and dedication.',
      author: 'Priya Sharma',
      role: 'Marketing Director'
    },
    {
      quote: 'The mobile app they developed for us has been a game changer. Great support and continuous improvements.',
      author: 'Vikram Singh',
      role: 'Tech Startup Founder'
    },
    {
      quote: 'Best investment we made for our business. IZone provided affordable solutions without compromising quality.',
      author: 'Anjali Nair',
      role: 'Small Business Owner'
    }
  ];

  const trustIndicators = [
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '100+', label: 'Long-term Clients' },
    { value: '4.9/5', label: 'Average Review' }
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="home-section-head">
          <p className="section-label">Client Testimonials</p>
          <h2>What Our Clients Say About Us</h2>
        </div>

        <div className="testimonials-overview">
          {trustIndicators.map((item) => (
            <article key={item.label} className="testimonial-kpi">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.author} className="testimonial-card" style={{ '--delay': `${index * 0.08}s` }}>
              <div className="testimonial-avatar">{getInitials(testimonial.author)}</div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.author}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
