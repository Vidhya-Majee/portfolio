import { useEffect, useRef } from 'react';
import './Skills.css';
import '../index.css';

const SKILLS_LIST = [
  { name: 'Python',      color: '#00ff9d' },
  { name: 'JavaScript', color: '#ffd93d' },
  { name: 'React.js',   color: '#00d4ff' },
  { name: 'Node.js',    color: '#7fffa3' },
  { name: 'Java',       color: '#ff6b35' },
  { name: 'C++',        color: '#a855f7' },
  { name: 'C',          color: '#6b9eff' },
  { name: 'HTML5',      color: '#ff7a59' },
  { name: 'CSS3',       color: '#3eb0ff' },
  { name: 'MongoDB',    color: '#4caf50' },
  { name: 'SQL',        color: '#ff3d8a' },
  { name: 'Git',        color: '#ff5e3a' },
  { name: 'Express',    color: '#84a0b8' },
  { name: 'Firebase',   color: '#ffca28' },
  { name: 'REST API',   color: '#00e5ff' },
  { name: 'Pandas',     color: '#ad7bff' },
  { name: 'NumPy',      color: '#4dabf7' },
  { name: 'Matplotlib', color: '#ff8a65' },
  { name: 'Scikit-learn', color: '#ff80ab' },
  { name: 'Ollama',     color: '#10a37f' },
  { name: 'LangChain',  color: '#9ddc24' },
  { name: 'Angular',    color: '#dd0031' },
  { name: 'Jupyter',    color: '#f37726' },
  { name: 'GitHub',     color: '#c9d1d9' },
  { name: 'Seaborn',    color: '#4ecdc4' },
  { name: 'Postman',    color: '#ff6c37' },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const arenaRef = useRef(null);
  const ballsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, draggedBall: null, lastX: 0, lastY: 0 });
  const animRef = useRef(null);

  // Scroll reveal
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

  // Balls physics
  useEffect(() => {
    const canvas = canvasRef.current;
    const arena = arenaRef.current;
    if (!canvas || !arena) return;
    const bctx = canvas.getContext('2d');

    function resize() {
      const rect = arena.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function initBalls() {
      resize();
      ballsRef.current = [];
      const W = canvas.width, H = canvas.height;
      SKILLS_LIST.forEach(skill => {
        const radius = 30 + Math.random() * 14;
        ballsRef.current.push({
          x: radius + Math.random() * (W - radius * 2),
          y: radius + Math.random() * (H * 0.4),
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 4,
          r: radius,
          name: skill.name,
          color: skill.color,
          rotation: 0,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      });
    }

    function drawBall(b) {
      bctx.save();
      bctx.translate(b.x, b.y);
      bctx.rotate(b.rotation);
      const glow = bctx.createRadialGradient(0, 0, b.r * 0.2, 0, 0, b.r);
      glow.addColorStop(0, b.color + 'ff');
      glow.addColorStop(0.6, b.color + 'aa');
      glow.addColorStop(1, b.color + '20');
      bctx.beginPath();
      bctx.arc(0, 0, b.r, 0, Math.PI * 2);
      bctx.fillStyle = glow;
      bctx.fill();
      bctx.strokeStyle = b.color;
      bctx.lineWidth = 1.5;
      bctx.globalAlpha = 0.85;
      bctx.stroke();
      bctx.globalAlpha = 1;
      bctx.beginPath();
      bctx.arc(-b.r * 0.3, -b.r * 0.3, b.r * 0.35, 0, Math.PI * 2);
      const highlight = bctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, 0, -b.r * 0.3, -b.r * 0.3, b.r * 0.4);
      highlight.addColorStop(0, 'rgba(255,255,255,0.5)');
      highlight.addColorStop(1, 'rgba(255,255,255,0)');
      bctx.fillStyle = highlight;
      bctx.fill();
      bctx.restore();
      bctx.save();
      bctx.translate(b.x, b.y);
      bctx.fillStyle = '#020409';
      bctx.font = `700 ${Math.max(10, b.r * 0.32)}px JetBrains Mono, monospace`;
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      bctx.fillText(b.name, 0, 0);
      bctx.restore();
    }

    function update() {
      const W = canvas.width, H = canvas.height;
      const gravity = 0.28, friction = 0.992, bounce = 0.78;
      ballsRef.current.forEach(b => {
        if (mouseRef.current.draggedBall === b) return;
        b.vy += gravity; b.vx *= friction; b.vy *= friction;
        b.x += b.vx; b.y += b.vy; b.rotation += b.rotSpeed;
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -bounce; b.rotSpeed *= -1; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -bounce; b.rotSpeed *= -1; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy *= -bounce; }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -bounce; b.vx *= 0.97; if (Math.abs(b.vy) < 1.5) b.vy = 0; }
      });
      for (let i = 0; i < ballsRef.current.length; i++) {
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          const a = ballsRef.current[i], b = ballsRef.current[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r;
          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const overlap = (minDist - dist) / 2;
            const ox = Math.cos(angle) * overlap, oy = Math.sin(angle) * overlap;
            if (mouseRef.current.draggedBall !== a) { a.x -= ox; a.y -= oy; }
            if (mouseRef.current.draggedBall !== b) { b.x += ox; b.y += oy; }
            const nx = dx / dist, ny = dy / dist;
            const p = 2 * (a.vx * nx + a.vy * ny - b.vx * nx - b.vy * ny) / 2;
            a.vx -= p * nx * 0.85; a.vy -= p * ny * 0.85;
            b.vx += p * nx * 0.85; b.vy += p * ny * 0.85;
            a.rotSpeed += (Math.random() - 0.5) * 0.08;
            b.rotSpeed += (Math.random() - 0.5) * 0.08;
          }
        }
      }
    }

    function draw() {
      bctx.clearRect(0, 0, canvas.width, canvas.height);
      ballsRef.current.forEach(drawBall);
    }

    function loop() {
      update(); draw();
      animRef.current = requestAnimationFrame(loop);
    }

    // Mouse/touch
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    }

    function handleDown(e) {
      e.preventDefault();
      const pos = getPos(e);
      mouseRef.current = { ...mouseRef.current, isDown: true, x: pos.x, y: pos.y, lastX: pos.x, lastY: pos.y };
      for (let i = ballsRef.current.length - 1; i >= 0; i--) {
        const b = ballsRef.current[i];
        const dx = pos.x - b.x, dy = pos.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r) {
          mouseRef.current.draggedBall = b;
          b.vx = (Math.random() - 0.5) * 8;
          b.vy = -10 - Math.random() * 6;
          break;
        }
      }
    }

    function handleMove(e) {
      if (!mouseRef.current.isDown || !mouseRef.current.draggedBall) return;
      e.preventDefault();
      const pos = getPos(e);
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      mouseRef.current.draggedBall.x = pos.x;
      mouseRef.current.draggedBall.y = pos.y;
    }

    function handleUp() {
      if (mouseRef.current.draggedBall) {
        mouseRef.current.draggedBall.vx = (mouseRef.current.x - mouseRef.current.lastX) * 1.5;
        mouseRef.current.draggedBall.vy = (mouseRef.current.y - mouseRef.current.lastY) * 1.5;
        mouseRef.current.draggedBall.rotSpeed = (Math.random() - 0.5) * 0.15;
      }
      mouseRef.current.isDown = false;
      mouseRef.current.draggedBall = null;
    }

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('touchstart', handleDown, { passive: false });
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);

    // Init when visible
    const arenaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && ballsRef.current.length === 0) {
          initBalls();
          loop();
          arenaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    arenaObserver.observe(arena);

    // Reset btn
    const resetBtn = document.getElementById('resetBalls');
    const resetHandler = () => {
      ballsRef.current.forEach(b => {
        b.vx = (Math.random() - 0.5) * 14;
        b.vy = -15 - Math.random() * 8;
        b.rotSpeed = (Math.random() - 0.5) * 0.12;
      });
    };
    resetBtn?.addEventListener('click', resetHandler);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('touchstart', handleDown);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
      resetBtn?.removeEventListener('click', resetHandler);
      window.removeEventListener('resize', resize);
      arenaObserver.disconnect();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">02 — Skills &amp; Tools</p>
        <h2 className="section-title reveal">My <em>tech</em><br />arsenal.</h2>

        <div className="skills-intro reveal">
          <p>
            Every <strong>ball</strong> represents a skill, language, framework or tool
            I have worked with. <strong>Drag, click, throw</strong> them around — they bounce
            with real physics. Just like my coding journey, always in motion.
          </p>
          <div>
            <p style={{ marginBottom: '.8rem' }}><strong>🎯 Try this:</strong></p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--muted)' }}>
              • Click any ball to give it a kick <br />
              • Drag balls around the arena <br />
              • Hit reset to throw them all again
            </p>
          </div>
        </div>

        <div className="balls-arena reveal" id="ballsArena" ref={arenaRef}>
          <div className="arena-grid"></div>
          <div className="arena-header">
            <div className="arena-title">⚡ Skill Arena</div>
            <div className="arena-hint">Click &amp; drag the balls</div>
          </div>
          <canvas id="ballsCanvas" ref={canvasRef}></canvas>
          <button className="reset-btn" id="resetBalls">↻ Reset</button>
        </div>

        <div className="skills-grid">
          <div>
            <div className="skill-category reveal">
              <h3>// Languages</h3>
              <div className="tags">
                <span className="tag">🐍 Python</span>
                <span className="tag">📜 JavaScript (ES6+)</span>
                <span className="tag">⚡ C++</span>
                <span className="tag">🔷 C</span>
                <span className="tag">☕ Java</span>
                <span className="tag">🔤 SQL</span>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>// Frontend</h3>
              <div className="tags">
                <span className="tag cyan">⚛️ React.js</span>
                <span className="tag cyan">🅰️ Angular</span>
                <span className="tag cyan">🎨 HTML5</span>
                <span className="tag cyan">🎭 CSS3</span>
                <span className="tag cyan">📱 Responsive Design</span>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>// Backend &amp; Database</h3>
              <div className="tags">
                <span className="tag purple">🟢 Node.js</span>
                <span className="tag purple">🚂 Express.js</span>
                <span className="tag purple">🌐 REST API</span>
                <span className="tag purple">🔐 JWT Auth</span>
                <span className="tag purple">🍃 MongoDB</span>
                <span className="tag purple">🐬 MySQL</span>
                <span className="tag purple">🔥 Mongoose</span>
              </div>
            </div>
          </div>

          <div>
            <div className="skill-category reveal">
              <h3>// Data Science &amp; ML</h3>
              <div className="tags">
                <span className="tag orange">🐼 Pandas</span>
                <span className="tag orange">🔢 NumPy</span>
                <span className="tag orange">📈 Matplotlib</span>
                <span className="tag orange">🌊 Seaborn</span>
                <span className="tag orange">🤖 Scikit-learn</span>
                <span className="tag orange">🌲 Random Forest</span>
                <span className="tag orange">📊 SHAP</span>
                <span className="tag orange">💻 Streamlit</span>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>// AI &amp; GenAI</h3>
              <div className="tags">
                <span className="tag pink">🧠 RAG Pipelines</span>
                <span className="tag pink">🦙 Ollama (Llama 3.2)</span>
                <span className="tag pink">🎤 Whisper</span>
                <span className="tag pink">🔍 Semantic Search</span>
                <span className="tag pink">✨ Prompt Engineering</span>
                <span className="tag pink">📐 BGE-M3 Embeddings</span>
              </div>
            </div>

            <div className="skill-category reveal">
              <h3>// Tools &amp; Platforms</h3>
              <div className="tags">
                <span className="tag">🐙 Git / GitHub</span>
                <span className="tag">📮 Postman</span>
                <span className="tag">📓 Jupyter</span>
                <span className="tag">🖥️ VS Code</span>
                <span className="tag">🔬 PyCharm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="skill-category reveal" style={{ marginTop: '2rem' }}>
          <h3>// Soft Skills</h3>
          <div className="soft-list">
            {[
              'Logical &amp; Analytical Thinking',
              'Problem Solving with Structured Approach',
              'Efficient Time Management',
              'Team Collaboration &amp; Communication',
              'Self-Motivated, Fast Learner &amp; Detail-Oriented',
            ].map((s, i) => (
              <div className="soft-item" key={i}>
                <span className="soft-num">0{i + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: s }}></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
