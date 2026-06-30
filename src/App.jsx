import { useState } from 'react';
import './index.css';
import './components/Expertise.css';
import './components/Certifications.css';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [started, setStarted] = useState(false);
  const [navShow, setNavShow] = useState(false);

  const handleLoaderDone = () => {
    setStarted(true);
    setNavShow(true);
  };

  return (
    <>
      <Cursor />
      <Loader onDone={handleLoaderDone} />
      <Navbar show={navShow} />
      <Hero started={started} />
      <Expertise />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
