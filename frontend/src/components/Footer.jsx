import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${isDark ? 'bg-gray-900' : 'bg-white'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <div className="text-center mb-8">
          <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} font-body italic`}>
            "Building with clarity. Learning endlessly. Creating with purpose."
          </p>
        </div>

        {/* Copyright */}
        <div className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} font-body`}>
          <p>&copy; {currentYear} Ricky Perera</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
