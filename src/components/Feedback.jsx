// import React, { useState } from 'react';
// import { apiFetch } from '../api';

// function Feedback() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     rating: '5',
//     message: ''
//   });
//   const [status, setStatus] = useState({ text: '', isError: false });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus({ text: '', isError: false });
//     setIsSubmitting(true);

//     try {
//       const response = await apiFetch('/api/feedbacks/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, rating: Number(form.rating) })
//       });

//       if (!response.ok) {
//         const errorPayload = await response.json().catch(() => ({}));
//         const message =
//           typeof errorPayload?.detail === 'string'
//             ? errorPayload.detail
//             : 'Feedback could not be submitted right now. Please try again shortly.';
//         throw new Error(message);
//       }

//       setStatus({ text: 'Thanks for your feedback. We appreciate your time.', isError: false });
//       setForm({ name: '', email: '', rating: '5', message: '' });
//     } catch (error) {
//       setStatus({
//         text: error.message,
//         isError: true
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section id="feedback" className="feedback-section">
//       <div className="container feedback-layout">
//         <article className="feedback-copy">
//           <p className="section-label">User Feedback</p>
//           <h2>Tell Us About Your Experience</h2>
//           <ul>
//             <li>Rate your experience from 1 to 5</li>
//             <li>Share what worked well</li>
//             <li>Tell us what we can improve</li>
//           </ul>
//         </article>

//         <form onSubmit={handleSubmit} className="quote-form feedback-form">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             required
//           />
//           <select name="rating" value={form.rating} onChange={handleChange}>
//             <option value="5">5 - Excellent</option>
//             <option value="4">4 - Very Good</option>
//             <option value="3">3 - Good</option>
//             <option value="2">2 - Fair</option>
//             <option value="1">1 - Poor</option>
//           </select>
//           <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             placeholder="Write your feedback"
//             rows="5"
//             required
//           />
//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//           </button>
//           {status.text && (
//             <p className={`form-status${status.isError ? ' form-status-error' : ''}`}>{status.text}</p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// }

// export default Feedback;

import React, { useState } from 'react';
import { apiFetch } from '../api';

function Feedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: '5',
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
      const response = await apiFetch('/api/feedbacks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) })
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const message =
          typeof errorPayload?.detail === 'string'
            ? errorPayload.detail
            : 'Feedback could not be submitted right now. Please try again shortly.';
        throw new Error(message);
      }

      setStatus({ text: 'Thanks for your feedback. We appreciate your time.', isError: false });
      setForm({ name: '', email: '', rating: '5', message: '' });
    } catch (error) {
      setStatus({
        text: error.message,
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="feedback-section">
      <div className="container feedback-layout">
        <article className="feedback-copy">
          <p className="section-label">User Feedback</p>
          <h2>Tell Us About Your Experience</h2>
          <ul>
            <li>Rate your experience from 1 to 5</li>
            <li>Share what worked well</li>
            <li>Tell us what we can improve</li>
          </ul>
        </article>

        <form onSubmit={handleSubmit} className="quote-form feedback-form">
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
          <select name="rating" value={form.rating} onChange={handleChange}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your feedback"
            rows="5"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {status.text && (
            <>
              <p
                className={`form-status${status.isError ? ' form-status-error' : ''}`}
              >
                {status.text}
              </p>

              {/* Mailto link added */}
              <p className="support-mail">
                Need help?{' '}
                <a href="mailto:sethu2004220@gmail.com">Contact Support</a>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Feedback;