'use client';

import { useEffect, useRef, useState } from 'react';
import { contact } from '@/lib/content';

const emptyForm = { name: '', email: '', question: '' };

export function prepareEnquiry(values) {
  const subject = `Website enquiry from ${values.name.trim()}`;
  const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\nQuestion:\n${values.question.trim()}`;
  return `mailto:mail@evam.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Name required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Valid email required.';
  if (values.question.trim().length < 10) errors.question = 'Minimum 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState('');
  const [status, setStatus] = useState('');
  const [desktopDetails, setDesktopDetails] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 601px)');
    const update = () => setDesktopDetails(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    try {
      const draft = window.localStorage.getItem('evam-enquiry-draft');
      if (draft) {
        const saved = JSON.parse(draft);
        setValues({ ...emptyForm, ...saved });
        setStatus('Your saved draft was restored from this browser. Nothing has been sent.');
      }
    } catch {
      setStatus('A saved draft could not be restored. You can still prepare a new enquiry.');
    }
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setPrepared('');
    setStatus('');
  };

  const blurField = (event) => {
    const { name } = event.target;
    const fieldErrors = validate(values);
    if (fieldErrors[name]) setErrors((current) => ({ ...current, [name]: fieldErrors[name] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('Please correct the highlighted fields before preparing your email.');
      formRef.current?.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    const href = prepareEnquiry(values);
    setPrepared(href);
    try {
      window.localStorage.setItem('evam-enquiry-draft', JSON.stringify(values));
      setStatus('Draft saved in this browser. Nothing was sent here.');
    } catch {
      setStatus('Draft ready, but this browser could not save it. Nothing was sent here.');
    }
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-details" data-reveal>
          <h2 id="contact-title">Let’s make something worth talking about.</h2>
          <details className="contact-disclosure" open={desktopDetails}>
            <summary>Address & directions</summary>
            <div className="contact-disclosure-content contact-address">
              <h3>{contact.business}</h3>
              <p>{contact.address}</p>
              <a className="text-link" href={contact.directions} target="_blank" rel="noreferrer">Get directions</a>
            </div>
          </details>
          <details className="contact-disclosure" open={desktopDetails}>
            <summary>Comedy & general enquiries</summary>
            <div className="contact-disclosure-content contact-link-list">
              <h3>Comedy Solutions / General Enquiries</h3>
              {contact.general.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
            </div>
          </details>
          <details className="contact-disclosure" open={desktopDetails}>
            <summary>Training & social</summary>
            <div className="contact-disclosure-content contact-link-list">
              <h3>Training Solutions</h3>
              {contact.training.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
              <p className="whatsapp-pending">WhatsApp action pending confirmation of the correct number.</p>
              <div className="social-links" aria-label="Social profiles">
                {contact.social.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}
              </div>
            </div>
          </details>
          <div className="contact-visual">
            <img src="/assets/team-group.webp" alt="The evam team together" width="480" height="390" loading="lazy" />
          </div>
        </div>
        <div className="enquiry-panel" data-reveal>
          <h3>Prepare an enquiry</h3>
          <p>We prepare an email in your app and save a draft in this browser. Nothing is sent here.</p>
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="enquiry-name">Name</label>
              <input id="enquiry-name" name="name" type="text" autoComplete="name" value={values.name} onChange={updateField} onBlur={blurField} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
              {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="enquiry-email">Email</label>
              <input id="enquiry-email" name="email" type="email" autoComplete="email" value={values.email} onChange={updateField} onBlur={blurField} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="enquiry-question">How can we help?</label>
              <textarea id="enquiry-question" name="question" rows="4" value={values.question} onChange={updateField} onBlur={blurField} required aria-invalid={!!errors.question} aria-describedby={errors.question ? 'question-error' : undefined} />
              {errors.question && <span className="field-error" id="question-error">{errors.question}</span>}
            </div>
            <button className="button button-primary form-submit" type="submit">Prepare enquiry email</button>
          </form>
          <div className="form-status" role="status" aria-live="polite">
            {status && <p>{status}</p>}
            {prepared && <a className="button button-lime" href={prepared}>Open email app</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
