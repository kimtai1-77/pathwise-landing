import { useEffect, useState } from 'react';
import { validateDemoRequest } from '../demoValidation';
import './RequestPage.css';
import Btn from './Btn';
import Navbar from './Navbar';

const RequestPage = ({ onNavigate, onBack }) => {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status?.type !== 'success') return;
    const timer = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { values, errors: validationErrors } = validateDemoRequest(
      Object.fromEntries(new FormData(form)),
    );
    setErrors(validationErrors);
    setStatus(null);
    if (Object.keys(validationErrors).length) return;

    setSending(true);
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        setStatus({
          type: 'error',
          message: result.error || (result.errors
            ? 'Please check the highlighted fields.'
            : 'Could not send your request. Please try again.'),
        });
      } else {
        form.reset();
        setStatus({ type: 'success', message: 'Your request has been sent.' });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send your request. Please try again or email us directly.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="request-page">
      <Navbar onNavigate={onNavigate} />
      <section className="request-page-shell">
        <p className="request-page-kicker">Request a demo</p>
        <h2>Get a single place where all the evidence already lives, updated and tagged to the control.</h2>
        <form className="request-page-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="demo-name">Name</label>
          <input
            id="demo-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={200}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'demo-name-error' : undefined}
          />
          {errors.name && (
            <span className="request-page-error" id="demo-name-error">{errors.name}</span>
          )}
          <label htmlFor="demo-email">Email address</label>
          <input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'demo-email-error' : undefined}
          />
          {errors.email && (
            <span className="request-page-error" id="demo-email-error">{errors.email}</span>
          )}
          <label htmlFor="demo-message">Your message</label>
          <textarea
            id="demo-message"
            name="message"
            required
            maxLength={10000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'demo-message-error' : undefined}
            defaultValue={'Hi,\n\nI would like to request a demo.\n\nThank you.'}
          />
          {errors.message && (
            <span className="request-page-error" id="demo-message-error">{errors.message}</span>
          )}
          <Btn as="button" type="submit" variant="primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </Btn>
          {status && (
            <p className={`request-page-status request-page-status--${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </form>
        <p className="request-page-support">
          Questions? Contact us at <a href="mailto:support@pathwise.systems">support@pathwise.systems</a>.
        </p>
        <Btn as="button" variant="text-link" className="request-page-back" onClick={onBack}>
          ← Back to home
        </Btn>
      </section>
    </main>
  );
};

export default RequestPage;