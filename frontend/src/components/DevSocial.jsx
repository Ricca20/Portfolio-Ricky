import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaStackOverflow, FaExternalLinkAlt } from 'react-icons/fa';

const DevSocial = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/Ricca20',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/ricky-perera',
    },
    {
      name: 'Stack Overflow',
      icon: <FaStackOverflow />,
      url: 'https://stackoverflow.com/users/yourusername',
    },
  ];

  return (
    <section id="dev-social" className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} mb-10 text-center font-handwritten`}
        >
          Dev Social
        </motion.h2>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
              } transition-colors text-2xl`}
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* GitHub Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className={`text-lg md:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 font-body`}>
              GitHub Contributions
            </h3>
            <p className={`text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'} font-body`}>
              Active open source contributor with consistent commits
            </p>
          </div>

          {/* GitHub Contribution Calendar */}
          <div className="w-full overflow-x-auto">
            <img
              src="https://ghchart.rshah.org/39d353/Ricca20"
              alt="GitHub Contribution Graph"
              className="w-full mx-auto rounded-lg"
              style={{ minWidth: '700px', maxWidth: '100%' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevSocial;
