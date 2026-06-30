import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    num: '01 · Live',
    badge: 'ML / AI',
    badgeClass: 'purple',
    title: 'CREDIT-FRAUD-AI',
    period: 'May 2026 – Jun 2026',
    desc: 'Enterprise-grade credit card fraud detection system using ML & Explainable AI (SHAP). Achieved 83% Recall Score on imbalanced dataset with a live interactive Streamlit dashboard.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'SHAP', 'Streamlit', 'Matplotlib'],
    github: 'https://github.com/Vidhya-Majee/credit-card-fraud-detection-system',
  },
  {
    num: '02 · Live',
    badge: 'Full-Stack',
    badgeClass: '',
    title: 'SOCIAL-SPHERE',
    period: 'Feb 2025 – May 2025',
    desc: 'Full-stack social media platform with 5 core modules — auth, feed, posts, profiles, social graph. JWT-based stateless auth, Multer media uploads, glassmorphism UI.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/Vidhya-Majee/SocialSphere',
  },
  {
    num: '03 · Live',
    badge: 'RAG / LLM',
    badgeClass: 'orange',
    title: 'RAG-TEACH-AI',
    period: 'Feb 2026 – Apr 2026',
    desc: 'Fully offline RAG pipeline — transcribes lecture videos with Whisper, generates BGE-M3 embeddings, and retrieves timestamp-precise answers via cosine similarity using local Llama 3.2.',
    stack: ['Python', 'Whisper', 'Ollama', 'Llama 3.2', 'BGE-M3', 'Cosine Similarity'],
    github: 'https://github.com/Vidhya-Majee/rag-ai-teaching-assistant',
  },
  {
    num: '04 · Live',
    badge: 'Full-Stack',
    badgeClass: '',
    title: 'RAKTDAAN',
    period: 'Mar 2026 – Apr 2026',
    desc: 'Real-time blood donation platform bridging donors and patients. Connects the right donor to the right patient instantly — even at 2 AM emergencies. India\'s free real-time blood network.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/Vidhya-Majee/RaktDaan',
  },
  {
    num: '05 · Live',
    badge: 'ML / DS',
    badgeClass: 'purple',
    title: 'GURGAON-PRICE-ML',
    period: 'Nov 2025 – Dec 2025',
    desc: 'Engineered 8+ features from 10,000+ row dataset. Benchmarked 4 ML models with 10-fold CV; Random Forest delivered lowest RMSE. Location, BHK count and area are top 3 predictors.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA'],
    github: 'https://github.com/Vidhya-Majee/Gurgaon-housing-price-predictor',
  },
  {
    num: '06 · Live',
    badge: 'AI Voice',
    badgeClass: 'blue',
    title: 'JARVIS',
    period: 'Nov 2025 – Jan 2026',
    desc: 'Advanced digital assistant dashboard inspired by Stark Industries. Dual-mode: cybernetic Web HUD with voice processing, and offline Voice Console in the terminal. Opens websites, plays YouTube, fetches news.',
    stack: ['Python', 'Flask', 'Web Speech API', 'Gemini API'],
    github: 'https://github.com/Vidhya-Majee/JARVIS--Voice-Assistant',
  },
  {
    num: '07 · Live',
    badge: 'E-Commerce',
    badgeClass: 'orange',
    title: 'BAGWAGON',
    period: 'Jul 2025 – Sep 2025',
    desc: 'Full-stack e-commerce app with EJS server-side rendering, JWT cookie-based auth, and a complete cart-to-checkout flow. Admin panel for product management, responsive Tailwind UI.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Tailwind CSS', 'JWT'],
    github: 'https://github.com/Vidhya-Majee/BagWagon',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">03 — Projects</p>
        <h2 className="section-title reveal">Things I've <em>built</em><br />&amp; shipped.</h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="project-card reveal" key={i}>
              <div className="project-top">
                <span className="project-num">{p.num}</span>
                <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
              </div>
              <h3>{p.title}</h3>
              <p style={{ fontSize: '.72rem', color: 'var(--muted2)', marginBottom: '.5rem', fontFamily: 'var(--mono)' }}>
                📅 {p.period}
              </p>
              <p>{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                🐙 View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
