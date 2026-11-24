import './RequestPage.css';
import Btn from './Btn';
import Navbar from './Navbar';

const RequestPage = ({ onNavigate, onBack }) => (
  <main className="request-page">
    <Navbar onNavigate={onNavigate} />
    <section className="request-page-shell">
      <p className="request-page-kicker">Request a demo</p>
      <h1>Let's make compliance easier to see.</h1>
      <p className="request-page-lead">Tell us a little about what you need and we will show you how Pathwise fits your workflow.</p>
      <form className="request-page-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="demo-message">Your message</label>
        <textarea id="demo-message" defaultValue={'Hi Pathwise team,\n\nI would like to request a demo of Pathwise and learn how it could support our Essential Eight compliance workflow.\n\nThank you,'} />
        <Btn as="button" type="submit" variant="primary">Send <span aria-hidden="true">↗</span></Btn>
      </form>
      <p className="request-page-support">Questions? Contact us at <a href="mailto:support@pathwise.systems">support@pathwise.systems</a>.</p>
      <Btn as="button" variant="text-link" className="request-page-back" onClick={onBack}>← Back to home</Btn>
    </section>
  </main>
);

export default RequestPage;