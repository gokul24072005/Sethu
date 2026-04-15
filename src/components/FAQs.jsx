import React, { useState } from 'react';

function FAQs() {
  const quickFacts = [
    { value: '24/7', label: 'Support Window' },
    { value: '250+', label: 'Projects Delivered' },
    { value: '< 1 Day', label: 'Initial Response' }
  ];

  const faqs = [
    {
      question: 'How long does a typical website project take?',
      answer: 'Most website projects take 2-4 weeks depending on complexity. We provide a detailed timeline during the discovery phase based on your specific requirements.'
    },
    {
      question: 'Do you provide ongoing support after project delivery?',
      answer: 'Yes! We offer 24/7 support and maintenance for all our clients. Website updates, security patches, and performance optimization are included in our support packages.'
    },
    {
      question: 'What platforms do you develop for?',
      answer: 'We build websites using React, Node.js, and Python. For mobile apps, we develop for both Android and iOS. Software solutions are customized based on your requirements.'
    },
    {
      question: 'How much does a website or app cost?',
      answer: 'Pricing depends on your specific needs and project scope. Basic websites start from affordable rates, and we offer flexible packages. Contact us for a customized quote.'
    },
    {
      question: 'Can you help with digital marketing?',
      answer: 'Absolutely! We offer comprehensive digital marketing services including SEO, social media campaigns, email marketing, and paid advertising to boost your online presence.'
    },
    {
      question: 'What is your process for project management?',
      answer: 'We follow a clear 4-step process: Discover requirements, Plan the approach, Build with regular updates, and Scale with support. You get milestone tracking and transparent communication throughout.'
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="faqs-section">
      <div className="container faqs-layout">
        <aside className="faqs-copy">
          <p className="section-label">Frequently Asked Questions</p>
          <h2>Common Questions About Our Services</h2>
          <p className="faqs-intro">
            Get clarity on timelines, pricing, support, and delivery before we begin your project.
          </p>
          <div className="faqs-facts">
            {quickFacts.map((fact) => (
              <article key={fact.label} className="faqs-fact-card">
                <h3>{fact.value}</h3>
                <p>{fact.label}</p>
              </article>
            ))}
          </div>
          <a href="/contact-us" className="btn btn-secondary faqs-cta">Ask a Custom Question</a>
        </aside>

        <div className="faqs-container">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-toggle">{expandedIndex === index ? '-' : '+'}</span>
              </button>
              {expandedIndex === index && (
                <div className="faq-answer" id={`faq-answer-${index}`}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
