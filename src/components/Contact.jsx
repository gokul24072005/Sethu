import React, { useState } from 'react';
import { apiFetch } from '../api';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [status, setStatus] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: '', isError: false });
    setIsSubmitting(true);

    try {
      const response = await apiFetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const message =
          typeof errorPayload?.detail === 'string'
            ? errorPayload.detail
            : 'We could not submit right now. Please call +91-9943077284 or email innovativezone.tech@gmail.com.';
        throw new Error(message);
      }

      setStatus({ text: 'Your request has been submitted. We will reply within 24 hours.', isError: false });
      setForm({ name: '', email: '', service: 'Web Development', message: '' });
    } catch (error) {
      setStatus({ text: error.message, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-layout">
        <article className="contact-copy">
          <p className="section-label">Request A Quote</p>
          <h2>Need A Free Quote? Please Feel Free To Contact Us</h2>
          <ul>
            <li>Reply within 24 hours</li>
            <li>24-hour telephone support</li>
            <li>Call to ask any question: +91-9943077284</li>
          </ul>
        </article>

        <form onSubmit={handleSubmit} className="quote-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <select name="service" value={form.service} onChange={handleChange}>
            <option>Web Development</option>
            <option>Software Development</option>
            <option>Apps Development</option>
            <option>Digital Marketing</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us your project needs"
            rows="5"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Get A Quote'}
          </button>
          {status.text && (
            <p className={`form-status${status.isError ? ' form-status-error' : ''}`}>{status.text}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
