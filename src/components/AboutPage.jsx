import './AboutPage.css';
import profilePic from '../assets/2.jpg';
import Btn from './Btn';
import Navbar from './Navbar';

const AboutPage = ({ onNavigate, onBack}) => (
  <main className="inner-page">
    <Navbar onNavigate={onNavigate} />
    <section className="inner-page-shell">
      <p className="inner-page-kicker">About Pathwise Systems</p>
      <h2>MSPs shouldn't be chasing evidence from 5 sources. Neither should they pay 10k for a solution.</h2>
      <div className="about-page-intro">
        <figure className="about-page-profile">
          <div className="about-page-profile-photo">
            <img src={profilePic} alt="Profile portrait" />
          </div>
          <figcaption>
            <span className="about-page-profile-name">Marc Jacob</span>
            <span className="about-page-profile-role">Founder, Pathwise Systems</span>
          </figcaption>
        </figure>
        <div className="about-page-intro-copy">
          <p>
            Halfway through a GRC course at Macquarie, I saw how MSPs wasted time chasing evidence from 4 or 5 places, just to get through the audit - M365 for MFA, endpoint for EDR, backup for coverage status...<br/><br/>
            With the alternative being paying 10k for complex solutions that only gather technical evidence, leaving you to rely on Excel for business processes.<br/><br/>
            So I built Pathwise Systems - a tool that collects evidence, keeps it always updated and handles business processes for a fraction of the cost.<br/><br/>
            Would you like to try it?
          </p>
          <Btn as="button" type="button" variant="primary" onClick={() => onNavigate('request')}>Request demo</Btn>
        </div>
      </div>
      <div className="about-page-grid">
       {/* <p>Would you like to try it?Unless of course you were willing to pay 10k for everything else.</p> 
        <p>We built Pathwise around the practical reality of compliance: evidence arrives in pieces, controls need review, and clients want an answer they can understand.</p>*/}
      </div>
      <div className="inner-page-actions">
        {/* <Btn as="button" variant="primary" onClick={onContact}>Talk to us</Btn> */}
        <Btn as="button" variant="secondary" onClick={onBack}>Back to home</Btn>
      </div>
    </section>
  </main>
);

export default AboutPage;