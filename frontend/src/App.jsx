import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DevSocial from './components/DevSocial';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Snowfall from './components/Snowfall';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Education from './components/Education';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Snowfall />
      <Navbar />
      <main>
        <Hero />
        <About />
        <DevSocial />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
