import './ContactPage.css';
import Btn from './Btn';
import Navbar from './Navbar';

const ContactPage = ({ onNavigate, onBack }) => {
  return (
    <main className="contact-page">
      <Navbar onNavigate={onNavigate} />
      <section className="contact-page-content">
        <p className="contact-page-kicker">Contact us</p>
        <h1>Let's talk.</h1>
        <a href="mailto:support@pathwise.systems" className="contact-page-email">
          support@pathwise.systems
        </a>
        <Btn as="button" variant="secondary" className="contact-page-back" onClick={onBack}>
          Back to home
        </Btn>
      </section>
    </main>
  );
};

export default ContactPage;
