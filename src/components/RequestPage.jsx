import './RequestPage.css';
import Btn from './Btn';
import Navbar from './Navbar';
import DemoRequestForm from './DemoRequestForm';

const RequestPage = ({ onNavigate, onBack }) => {
  return (
    <main className="request-page">
      <Navbar onNavigate={onNavigate} />
      <section className="request-page-shell">
        <p className="request-page-kicker">Request a demo</p>
        <h2>Get a single place where all the evidence already lives, updated and tagged to the control.</h2>
        <DemoRequestForm initialMessage={'Hi,\n\nI would like to request a demo.\n\nThank you.'} />
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