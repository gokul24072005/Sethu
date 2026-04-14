import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { apiFetch } from '../api'; // Your fetch wrapper
import ImagePlaceholder from './ImagePlaceholder';

// Utility to extract error message from FastAPI response
const getErrorMessage = (errorPayload, fallbackMessage) => {
  if (typeof errorPayload?.detail === 'string') return errorPayload.detail;
  if (Array.isArray(errorPayload?.detail) && errorPayload.detail.length > 0) {
    const firstError = errorPayload.detail[0];
    const fieldName = Array.isArray(firstError?.loc)
      ? firstError.loc[firstError.loc.length - 1]
      : '';
    return fieldName ? `${fieldName}: ${firstError.msg}` : firstError.msg;
  }
  if (typeof errorPayload?.message === 'string') return errorPayload.message;
  return fallbackMessage;
};

function Career() {
  const resumeInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Frontend Developer',
    experience: '',
    message: '',
    resume: null
  });
  const [status, setStatus] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openings = [
    { role: 'Frontend Developer', mode: 'Full-time', detail: 'React developer with strong UI skills.' },
    { role: 'Digital Marketing Executive', mode: 'Full-time', detail: 'SEO and social campaigns experience.' },
    { role: 'Software Engineer Intern', mode: 'Internship', detail: 'Hands-on support for web projects.' }
  ];
  const culturePerks = ['Flexible Hours', 'Learning Budget', 'Team Retreats', 'Mentor Support'];
  const hiringJourney = ['Quick profile screening', 'Friendly skill discussion', 'Culture-fit conversation', 'Offer and onboarding'];

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setStatus({ text: '', isError: false });
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const openApplicationModal = (role) => {
    setForm((previousForm) => ({ ...previousForm, position: role }));
    setStatus({ text: '', isError: false });
    setIsModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsModalOpen(false);
    setStatus({ text: '', isError: false });
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setForm({ ...form, resume: e.target.files?.[0] ?? null });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: '', isError: false });
    setIsSubmitting(true);

    try {
      if (!form.resume) throw new Error('Please upload your resume in PDF format.');
      if (!form.resume.name.toLowerCase().endsWith('.pdf')) {
        throw new Error('Only PDF resume is allowed.');
      }

      const payload = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === 'resume') payload.append(key, form[key]);
        else payload.append(key, form[key] || '');
      });

      const response = await apiFetch('/api/careers/', {
        method: 'POST',
        body: payload
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const message = getErrorMessage(
          errorPayload,
          'Application could not be submitted right now. Please try again shortly.'
        );
        throw new Error(message);
      }

      setStatus({
        text: 'Application submitted successfully. A confirmation email has been sent to your email address.',
        isError: false
      });
      setForm((previousForm) => ({
        name: '',
        email: '',
        phone: '',
        position: previousForm.position,
        experience: '',
        message: '',
        resume: null
      }));
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } catch (error) {
      setStatus({ text: error.message, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className="careers-section">
      <div className="container career-layout">
        <article className="career-copy">
          <p className="section-label">Careers</p>
          <h2>Join IZone Technology</h2>
          <p>We are looking for passionate team members to build digital products and deliver outcomes.</p>
          <div className="career-openings">
            {openings.map((opening) => (
              <button
                type="button"
                key={opening.role}
                className="career-opening-card career-opening-card-button"
                onClick={() => openApplicationModal(opening.role)}
              >
                <h3>{opening.role}</h3>
                <p className="career-mode">{opening.mode}</p>
                <p>{opening.detail}</p>
                <span className="career-open-cta">Click to apply</span>
              </button>
            ))}
          </div>
        </article>

        <div className="career-side-rail">
          <div className="career-image-section">
            <ImagePlaceholder 
              alt="Collaborative office workspace and team culture" 
              height="380px"
              imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            />
          </div>
          <aside className="career-creative-panel">
            <h3>Life At IZone</h3>
            <p>Small teams, fast ownership, and real client impact from week one.</p>
            <ul className="career-chip-list">
              {culturePerks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <div className="career-journey">
              {hiringJourney.map((step, index) => (
                <p key={step} className="career-journey-step">
                  <span>{index + 1}</span>
                  {step}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {isModalOpen && createPortal(
        <div
          className="career-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeApplicationModal();
            }
          }}
        >
          <div className="career-modal" role="dialog" aria-modal="true" aria-labelledby="career-apply-title">
            <div className="career-modal-header">
              <div>
                <p className="section-label">Application Form</p>
                <h3 id="career-apply-title">Apply for {form.position}</h3>
              </div>
              <button
                type="button"
                className="career-modal-close"
                onClick={closeApplicationModal}
                aria-label="Close application form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="quote-form career-form career-form-modal">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
              <input name="position" value={form.position} readOnly />
              <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (e.g., 2 years)" />
              <input ref={resumeInputRef} type="file" name="resume" onChange={handleChange} accept=".pdf" required />
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your skills and achievements" rows="5" required />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Apply Now'}</button>
              {status.text && <p className={`form-status${status.isError ? ' form-status-error' : ''}`}>{status.text}</p>}
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default Career;
