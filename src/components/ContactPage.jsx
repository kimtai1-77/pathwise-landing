import './ContactPage.css';
import './RequestPage.css';
import Btn from './Btn';
import Navbar from './Navbar';
import DemoRequestForm from './DemoRequestForm';

const ContactPage = ({ onNavigate, onBack }) => {
  return (
    <main className="contact-page">
      <Navbar onNavigate={onNavigate} />
      <section className="contact-page-content">
        <p className="contact-page-kicker">Contact us</p>
        <h1>Let's talk.</h1>
        <DemoRequestForm />
        <p className="contact-page-email">
          Alternatively, reach us at{' '}
          <a href="mailto:support@pathwise.systems">support@pathwise.systems</a>.
        </p>
        <Btn as="button" variant="secondary" className="contact-page-back" onClick={onBack}>
          Back to home
        </Btn>
      </section>
    </main>
  );
};

export default ContactPage;
