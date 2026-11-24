import './AboutPage.css';
import Btn from './Btn';
import Navbar from './Navbar';

const AboutPage = ({ onNavigate, onBack, onContact }) => (
  <main className="inner-page">
    <Navbar onNavigate={onNavigate} />
    <section className="inner-page-shell">
      <p className="inner-page-kicker">About Pathwise</p>
      <h1>Compliance work should feel clear.</h1>
      <p className="inner-page-lead">Pathwise helps managed service providers turn Essential Eight evidence into a live, understandable picture of risk for every client.</p>
      <div className="about-page-grid">
        <p>We built Pathwise around the practical reality of compliance: evidence arrives in pieces, controls need review, and clients want an answer they can understand.</p>
        <p>Our aim is simple: give your team one steady place to see what is complete, what needs attention, and what to do next.</p>
      </div>
      <div className="inner-page-actions">
        <Btn as="button" variant="primary" onClick={onContact}>Talk to us</Btn>
        <Btn as="button" variant="secondary" onClick={onBack}>Back to home</Btn>
      </div>
    </section>
  </main>
);

export default AboutPage;