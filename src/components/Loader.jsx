import { useEffect, useRef, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const loaderRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let load = 0;
    const interval = setInterval(() => {
      load += Math.floor(Math.random() * 9) + 4;
      if (load >= 100) {
        load = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.opacity = '0';
          setTimeout(() => {
            setVisible(false);
            onDone && onDone();
          }, 750);
        }, 350);
      }
      if (fillRef.current) fillRef.current.style.width = load + '%';
      if (textRef.current) textRef.current.textContent = 'Loading ' + load + '%';
    }, 75);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" ref={loaderRef}>
      <div className="loader-logo">VM</div>
      <div className="loader-bar">
        <div className="loader-fill" ref={fillRef}></div>
      </div>
      <div className="loader-text" ref={textRef}>Loading 0%</div>
    </div>
  );
}
