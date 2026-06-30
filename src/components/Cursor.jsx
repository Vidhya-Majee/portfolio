import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  let animId = null;

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animateRing);
    };
    animateRing();

    document.addEventListener('mousemove', onMouseMove);

    const interactables = document.querySelectorAll('a, button, .card, .project-card, .tag, .metric');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'rgba(0,255,157,.7)';
        dot.style.transform = 'translate(-50%,-50%) scale(.5)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '38px';
        ring.style.height = '38px';
        ring.style.borderColor = 'rgba(0,255,157,.4)';
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
