import { useState } from 'react';
import './Landing.css';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import RequestPage from './RequestPage';
import Navbar from './Navbar';
import Btn from './Btn';
import dashboardPreview from '../assets/dashboard controls.png';

const Landing = () => {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'about') {
    return <AboutPage onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} onContact={() => setCurrentPage('contact')} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'request') {
    return <RequestPage onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} />;
  }

  return (
    <main className="reference-home">
      <Navbar onNavigate={setCurrentPage} />

      <section className="reference-section reference-hero">
        <p className="reference-label">ESSENTIAL EIGHT FOR AUSTRALIAN MSPS</p>
        <h1>Can you confidently say to your customers, "We always catch what would void your policy, and fix it before the broker calls"?</h1>
        <p>Request demo to see how it works</p>
        <Btn as="button" type="button" variant="primary" onClick={() => setCurrentPage('request')}>Request demo</Btn>
      </section>

      <section className="reference-section reference-problem">
        <p className="reference-section-number">01 / THE PROBLEM</p>
        <h2>Its not your fault if you can&apos;t</h2>
      </section>

      <section className="reference-section reference-list-section">
        <p className="reference-section-number">02 / WHY IT HAPPENS</p>
        <h2>Its just that:</h2>
        <ol>
          <li>The broker needs answers by Wednesday, and you know a wrong answer can void the policy retroactively</li>
          <li>Evidence resides in 4 or 5 places and you have to scramble to put it together quickly</li>
          <li>A checklist item is not evidence. its an opinion - and its wrong in a week</li>
        </ol>
      </section>

      <section className="reference-section reference-list-section reference-change">
        <p className="reference-section-number">03 / THE SHIFT</p>
        <h2>How it all changes:</h2>
        <ol>
          <li>Evidence is now always updated, audit-ready and shareable in one click - not a week's build.</li>
          <li>You reduce compliance costs by removing time taken to reconcile spreadsheets</li>
          <li>You can now turns the project into a subscription. Not a new service - the same service, only this time your client finds it reassuring.</li>
        </ol>
        <Btn as="button" type="button" variant="primary" onClick={() => setCurrentPage('request')}>Request demo</Btn>
      </section>

      <section id="how-it-works" className="reference-proof" aria-label="A preview of Pathwise">
        <div className="reference-proof-copy">
          <p className="reference-section-number">04 / THE VIEW</p>
          <h2>One clear answer,<br />when it matters.</h2>
          <p>Pathwise keeps evidence, control status, and risk in one live view your team can trust.</p>
        </div>
        <figure className="reference-proof-image">
          <img src={dashboardPreview} alt="Pathwise compliance dashboard showing control status and evidence" />
          <figcaption>Live compliance view / Essential Eight</figcaption>
        </figure>
      </section>

      <section className="reference-section reference-quote">
        <p className="reference-section-number">05 / THE COST OF WAITING</p>
        <h2>Don&apos;t be this person again</h2>
        <blockquote>&quot;Last renewal we had a carrier come back three days before the deadline asking for backup retention proof and we were the ones digging through two platforms at 9pm to piece it together.&quot;</blockquote>
      </section>

      <section className="reference-section reference-final-cta">
        <p className="reference-section-number">06 / WHAT&apos;S NEXT</p>
        <h2>Be the MSP clients love to pay</h2>
        <Btn as="button" type="button" variant="primary" onClick={() => setCurrentPage('request')}>Request demo</Btn>
      </section>
    </main>
  );
};

export default Landing;
