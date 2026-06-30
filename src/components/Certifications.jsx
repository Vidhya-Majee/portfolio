import { useEffect, useRef } from 'react';
import './Certifications.css';

const CERTS = [
  { icon: '🧠', name: 'AI Fundamentals: Language and Vision in AI', org: 'IBM SkillsBuild', year: '2026' },
  { icon: '📊', name: 'DataPlus Programme', org: 'TCS MasterCraft™ Academy', year: '2026' },
  { icon: '🤖', name: 'Data Science Certification', org: 'Infosys Springboard', year: '2026' },
  { icon: '✨', name: 'AI Fluency: Framework & Foundation', org: 'Anthropic Education', year: '2026' },
  { icon: '🐬', name: 'MySQL Certification', org: 'HackerRank', year: '2025' },
  { icon: '🐍', name: 'Data Science Certification', org: 'CodeWithHarry', year: '2025' },
  { icon: '🐍', name: 'Python Programming', org: 'CodeWithHarry', year: '2025' },
  { icon: '📐', name: 'Fundamentals of Object-Oriented Programming', org: 'NPTEL — IIT Roorkee', year: '2024' },
  { icon: '⚛️', name: 'Angular, JavaScript & React.js Training', org: 'Allenhouse Business School', year: '2024' },
];

const EDUCATION = [
  {
    icon: '🎓',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Allenhouse Business School, Kanpur',
    affiliation: 'Affiliated: CSJM University',
    period: '2024 – 2027',
  },
  {
    icon: '📚',
    degree: 'Intermediate – Class XII',
    institution: 'Jalpa Devi Inter College, Kanpur',
    affiliation: '',
    period: '2024',
  },
];

export default function Certifications() {
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
    <section id="certs" ref={sectionRef}>
      <div className="section-inner">

        {/* Education */}
        <p className="section-label reveal">05 — Education</p>
        <h2 className="section-title reveal">Academic <em>foundation.</em></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {EDUCATION.map((edu, i) => (
            <div className="card reveal" key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.5rem' }}>{edu.icon}</span>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '.4rem' }}>{edu.degree}</h3>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--green)', marginBottom: '.2rem' }}>{edu.institution}</div>
                {edu.affiliation && <div style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--muted)', marginBottom: '.2rem' }}>{edu.affiliation}</div>}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--muted2)', marginTop: '.3rem' }}>📅 {edu.period}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <p className="section-label reveal">06 — Credentials</p>
        <h2 className="section-title reveal">Training &amp; <em>Certifications.</em></h2>

        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <div className="cert-card reveal" key={i}>
              <div className="cert-icon">{cert.icon}</div>
              <div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-org">{cert.org}</div>
              </div>
              <div className="cert-year">{cert.year}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
