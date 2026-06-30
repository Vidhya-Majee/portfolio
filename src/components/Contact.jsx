import { useEffect, useRef } from 'react';
import './Contact.css';

const WHY_HIRE = [
  'Clean MERN stack code with maintainable architecture',
  'Fast learning — implemented RAG & Ollama in under 3 months',
  'Full-stack + ML mindset: frontend to model deployment',
  'Real projects with GitHub history and working demos',
  'Professional communication, team collaboration & problem-solving',
  '1st Prize winner in Web Development competition',
];

export default function Contact() {
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
    <section id="contact" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">07 — Contact</p>
        <h2 className="section-title reveal">Ready to<br /><em>collaborate?</em></h2>

        <div className="contact-grid">
          <div className="reveal">
            <p className="contact-text">
              I am actively looking for IT opportunities, internships, freelance projects
              and open-source collaborations. Let's build something meaningful together.
              Whether it's a MERN stack app, an ML model, or a RAG pipeline — I'm ready.
            </p>

            <div className="contact-list">
              <a href="mailto:vidhyamajee@gmail.com" className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">vidhyamajee@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918052134234" className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+91-8052134234</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/vidhya-majee-7807b9321" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">💼</div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">linkedin.com/in/vidhya-majee-7807b9321</div>
                </div>
              </a>

              <a href="https://github.com/Vidhya-Majee" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon">🐙</div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">github.com/Vidhya-Majee</div>
                </div>
              </a>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Kanpur, Uttar Pradesh, India</div>
                </div>
              </div>
            </div>

            <div className="availability">
              <span className="availability-dot"></span>
              BCA 2027 · Currently open to internships &amp; opportunities
            </div>
          </div>

          <div className="why-hire reveal">
            <h3 style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '1rem', paddingBottom: '.7rem', borderBottom: '1px solid var(--border)' }}>
              // Why hire me
            </h3>
            {WHY_HIRE.map((item, i) => (
              <div className="why-item" key={i}>
                <span className="why-num">0{i + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
