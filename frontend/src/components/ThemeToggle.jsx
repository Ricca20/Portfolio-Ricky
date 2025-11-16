import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-all ${
        isDark 
          ? 'bg-white/5 hover:bg-white/10 text-yellow-400' 
          : 'bg-gray-900/5 hover:bg-gray-900/10 text-gray-900'
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
