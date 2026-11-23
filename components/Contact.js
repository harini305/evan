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
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.question.trim().length < 10) errors.question = 'Please add a little more detail (at least 10 characters).';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState('');
  const [status, setStatus] = useState('');
  const formRef = useRef(null);

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
    const fieldErrors = validate({ ...emptyForm, ...values });
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
      setStatus('Your enquiry is ready and saved in this browser. Open your email app to review and send it. Nothing has been sent by this website.');
    } catch {
      setStatus('Your enquiry is ready. Open your email app to review and send it. This browser could not save the draft, and nothing has been sent by this website.');
    }
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-details" data-reveal>
          <h2 id="contact-title">Let’s make something worth talking about.</h2>
          <div className="contact-address">
            <h3>{contact.business}</h3>
            <p>{contact.address}</p>
            <a className="text-link" href={contact.directions} target="_blank" rel="noreferrer">Get directions</a>
          </div>
          <div className="contact-groups">
            <div>
              <h3>Comedy Solutions / General Enquiries</h3>
              {contact.general.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
            </div>
            <div>
              <h3>Training Solutions</h3>
              {contact.training.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
            </div>
          </div>
          <p className="whatsapp-pending">WhatsApp action pending confirmation of the correct number.</p>
          <div className="social-links" aria-label="Social profiles">
            {contact.social.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}
          </div>
        </div>
        <div className="enquiry-panel" data-reveal>
          <h3>Prepare an enquiry</h3>
          <p>Complete the fields to prepare an email in your own email app. A draft stays in this browser; this website does not send or receive your information.</p>
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
