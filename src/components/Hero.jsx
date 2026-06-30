import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const WORDS = [
  'Full-Stack MERN Developer',
  'BCA Student · 2027',
  'React + Node.js Developer',
  'Data Science Enthusiast',
  'ML & AI Tools Builder',
  'Python Developer',
  'RAG & LLM Engineer',
  'Clean Code Problem Solver',
];

export default function Hero({ started }) {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);

  const [nameShow, setNameShow] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [smallShow, setSmallShow] = useState(false);
  const [typedShow, setTypedShow] = useState(false);
  const [descShow, setDescShow] = useState(false);
  const [actionsShow, setActionsShow] = useState(false);
  const [metricsShow, setMetricsShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);

  useEffect(() => {
    if (!started) return;
    setTimeout(() => setStatusShow(true), 150);
    setTimeout(() => setSmallShow(true), 270);
    setTimeout(() => setNameShow(true), 400);
    setTimeout(() => setTypedShow(true), 620);
    setTimeout(() => setDescShow(true), 740);
    setTimeout(() => setActionsShow(true), 860);
    setTimeout(() => setMetricsShow(true), 980);
    setTimeout(() => setCardShow(true), 650);
  }, [started]);

  // Typing animation
  useEffect(() => {
    if (!started) return;
    let wordIndex = 0, charIndex = 0, deleting = false;
    let tid;
    function type() {
      const current = WORDS[wordIndex];
      if (!deleting) {
        if (typedRef.current) typedRef.current.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          tid = setTimeout(type, 1300);
          return;
        }
      } else {
        if (typedRef.current) typedRef.current.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
        }
      }
      tid = setTimeout(type, deleting ? 45 : 85);
    }
    tid = setTimeout(type, 600);
    return () => clearTimeout(tid);
  }, [started]);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.getElementById('hero')?.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticles() {
      particles = [];
      const count = Math.min(90, Math.floor(window.innerWidth / 16));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + .6,
          vx: (Math.random() - .5) * .35,
          vy: (Math.random() - .5) * .35,
          color: ['#00ff9d', '#00d4ff', '#a855f7'][Math.floor(Math.random() * 3)],
        });
      }
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = .55;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * .12;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  return (
    <header id="hero">
      <canvas id="particle-canvas" ref={canvasRef}></canvas>

      <div className="hero-container">
        <div className="hero-left">
          <div className={`hero-status${statusShow ? ' show' : ''}`}>
            Available for IT roles &amp; freelance projects
          </div>

          <div className={`hero-small${smallShow ? ' show' : ''}`}>
            Full-Stack MERN Developer · Data Science Enthusiast
          </div>

          <h1 className="hero-name">
            <span className={nameShow ? 'show' : ''}>VIDHYA</span>
          </h1>
          <h1 className="hero-name green">
            <span className={nameShow ? 'show' : ''}>MAJEE</span>
          </h1>

          <div className={`typed-line${typedShow ? ' show' : ''}`}>
            &gt; <span id="typed" ref={typedRef}></span>
            <span className="cursor-blink"></span>
          </div>

          <p className={`hero-description${descShow ? ' show' : ''}`}>
            I build <strong>modern full-stack web applications</strong>,&nbsp;
            <strong>AI-powered tools</strong>, and <strong>data-driven solutions</strong>.
            Passionate about clean UI, scalable backend systems, machine learning,
            and turning ideas into real products.
          </p>

          <div className={`hero-actions${actionsShow ? ' show' : ''}`}>
            <a href="#projects" className="btn-primary">⚡ View Projects</a>
            <a href="#contact" className="btn-secondary">Get In Touch →</a>
          </div>

          <div className={`hero-metrics${metricsShow ? ' show' : ''}`}>
            <div className="metric">
              <strong>7+</strong>
              <span>Projects</span>
            </div>
            <div className="metric">
              <strong>9+</strong>
              <span>Certifications</span>
            </div>
            <div className="metric">
              <strong>2027</strong>
              <span>BCA Graduate</span>
            </div>
          </div>
        </div>

        {/* Girl Coder Visual Card */}
        <div className={`visual-card${cardShow ? ' show' : ''}`}>
          <div className="visual-header">
            <div className="dots">
              <span></span><span></span><span></span>
            </div>
            <div className="file-name">vidhya.dev</div>
          </div>

          <div className="girl-stage">
            <div className="orbit"></div>
            <div className="orbit two"></div>
            <div className="orbit three"></div>

            <div className="code-panel left">
              <div className="panel-title">frontend.jsx</div>
              <div className="code-line g"></div>
              <div className="code-line c w55"></div>
              <div className="code-line p w70"></div>
              <div className="code-line w40"></div>
            </div>

            <div className="code-panel right">
              <div className="panel-title">model.py</div>
              <div className="code-line c w90"></div>
              <div className="code-line g w70"></div>
              <div className="code-line o w55"></div>
              <div className="code-line p w40"></div>
            </div>

            <div className="girl-coder">
              <div className="hair"></div>
              <div className="neck"></div>
              <div className="face"></div>
              <div className="bang"></div>
              <div className="eye left"></div>
              <div className="eye right"></div>
              <div className="smile"></div>
              <div className="body"></div>
              <div className="arm left"></div>
              <div className="arm right"></div>
              <div className="hand left"></div>
              <div className="hand right"></div>
              <div className="laptop"></div>
            </div>
          </div>

          <div className="mini-terminal">
            <div className="term-row"><span className="prompt">$</span>npm run build</div>
            <div className="term-row"><span className="prompt">✓</span>Portfolio optimized</div>
            <div className="term-row"><span className="prompt">→</span><span className="success">Ready for opportunities</span></div>
          </div>

          <div className="tech-strip">
            <span>React</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>MongoDB</span>
            <span>AI / ML</span>
            <span>RAG</span>
          </div>
        </div>
      </div>
    </header>
  );
}
