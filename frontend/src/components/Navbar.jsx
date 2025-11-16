import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useState } from 'react';
import { scrollToSection } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: FiGithub, link: 'https://github.com/Ricca20', label: 'GitHub' },
    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/ricky-perera-355678340/', label: 'LinkedIn' },
    { icon: FiMail, link: 'mailto:pereraricky20@gmail.com', label: 'Email' }
  ];

  return (
    <nav className={`${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md sticky top-0 z-50 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <motion.button
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <span className={`text-2xl md:text-3xl font-bold font-handwritten ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            } transition-colors`}>
              Ricca
            </span>
            <motion.div
              className={`absolute -bottom-1 left-0 h-0.5 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                  isDark 
                    ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* Divider */}
            <div className={`w-px h-6 mx-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            
            {/* Social Links - Desktop */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg transition-all ${
                    isDark 
                      ? 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-100'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-all`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden py-4 space-y-1`}
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-lg font-body font-medium transition-all ${
                  isDark 
                    ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* Social Links - Mobile */}
            <div className={`flex justify-center gap-3 pt-4 mt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all ${
                    isDark 
                      ? 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-cyan-600 hover:bg-gray-100'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
