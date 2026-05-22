'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import DevSocial from '@/components/DevSocial';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';

function PageContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } transition-colors duration-300`}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <DevSocial />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
