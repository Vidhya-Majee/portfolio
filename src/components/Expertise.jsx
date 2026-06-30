import { useEffect, useRef } from 'react';
import './Expertise.css';

const EXPERTISE = [
  { icon: '🌐', title: 'Full-Stack MERN Development', desc: 'End-to-end web applications with React.js frontend, Node.js/Express.js backend, MongoDB database and REST API design.' },
  { icon: '⚙️', title: 'Backend Engineering', desc: 'REST APIs, JWT authentication, Mongoose schema design, server logic, Multer file uploads and scalable backend systems.' },
  { icon: '🤖', title: 'Data Science & ML', desc: 'EDA, feature engineering, Scikit-learn models (Random Forest, KNN, Logistic Regression), SHAP explainability and Streamlit dashboards.' },
  { icon: '🧠', title: 'AI & GenAI / RAG', desc: 'RAG pipelines, Ollama local LLM deployment, OpenAI Whisper transcription, BGE-M3 embeddings and semantic search.' },
  { icon: '📊', title: 'Data Visualization', desc: 'Matplotlib, Seaborn, Plotly and Streamlit dashboards that convert complex datasets into clear, decision-ready insights.' },
  { icon: '🗄️', title: 'Database Management', desc: 'MySQL, MongoDB, Mongoose schema design, queries, data modelling and optimization for both SQL and NoSQL databases.' },
];

export default function Expertise() {
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
    <section id="expertise" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">01 — Area of Expertise</p>
        <h2 className="section-title reveal">What I <em>do</em><br />best.</h2>

        <div className="grid-3">
          {EXPERTISE.map((item, i) => (
            <div className="card reveal" key={i}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
