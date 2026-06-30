import { useEffect, useRef } from 'react';

/* Virtual Experience + Certifications combined */

const EXPERIENCE = [
  {
    title: 'Data Science Job Simulation',
    org: 'British Airways · Forage',
    period: 'April 2026 – May 2026',
    icon: '✈️',
    points: [
      'Scraped and analysed 1,000+ customer reviews using Python (BeautifulSoup + Pandas) — identified top 5 sentiment drivers including seat comfort, punctuality, and staff behaviour.',
      'Built a Random Forest classifier to predict customer purchase intent — achieved strong cross-validated accuracy, outperforming Logistic Regression baseline.',
      'Delivered an executive-ready slide presentation summarising data insights and model results — simulating a real data science business presentation to senior stakeholders.',
    ],
  },
  {
    title: 'Data Analytics Job Simulation',
    org: 'Deloitte · Forage',
    period: 'May 2026 – June 2026',
    icon: '📊',
    points: [
      'Analysed structured business datasets using Python to surface data quality issues, anomalies, and KPI trends — simulating a consulting forensic analysis engagement.',
      'Applied data classification and quality assessment across 4 dataset categories — identified mislabelled and duplicate records reducing data noise by ~25%.',
      'Built interactive dashboards to communicate findings to a simulated client audience — translating raw data into clear, decision-ready visual narratives.',
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: '🥇', text: '1st Prize — Web Development Competition (Web Rachaita): built a fully functional, innovative web application recognised for technical execution and UI design.' },
  { icon: '🏆', text: 'Smart India Hackathon (SIH) — college-level round: contributed to a team-based software solution under competitive, time-bound conditions.' },
  { icon: '🎙️', text: 'AI and Workforce Transformation Seminar — CSJM University, Kanpur · July 2025' },
  { icon: '🛡️', text: 'Cyber Security and Ethical Hacking Workshop · August 2024' },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ background: 'rgba(255,255,255,.018)' }}>
      <div className="section-inner">
        <p className="section-label reveal">04 — Virtual Experience</p>
        <h2 className="section-title reveal">Industry <em>simulations</em><br />&amp; experience.</h2>

        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
          {EXPERIENCE.map((exp, i) => (
            <div className="card reveal" key={i} style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '2rem' }}>{exp.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '.3rem' }}>{exp.title}</h3>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--green)', marginBottom: '.15rem' }}>{exp.org}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--muted2)' }}>📅 {exp.period}</div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                {exp.points.map((pt, j) => (
                  <li key={j} style={{ display: 'flex', gap: '.8rem', color: 'var(--muted)', fontSize: '.84rem', lineHeight: '1.7' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="section-label reveal">Achievements &amp; Hackathons</p>
        <h2 className="section-title reveal" style={{ marginBottom: '2rem' }}>Recognition &amp; <em>milestones.</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <div className="card reveal" key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.8rem' }}>{ach.icon}</span>
              <p style={{ color: 'var(--muted)', fontSize: '.84rem', lineHeight: '1.7' }}>{ach.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
