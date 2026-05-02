import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiExternalLink, FiMapPin, FiCalendar } from 'react-icons/fi';

const Experience = () => {
  const { isDark } = useTheme();

  const experiences = [
    {
      company: 'Pasovit Technologies Private Limited',
      url: 'https://pasovit.com/',
      role: 'Software Engineering Intern (Full Stack Developer)',
      type: 'Fully Remote',
      period: 'Feb 2026 - Present',
      description: 'Spearheading the development of scalable SaaS platforms, high-performance CRM systems, and multi-functional portfolio projects. Delivering end-to-end full-stack solutions using modern frameworks and performance optimization techniques.',
      tech: ['MERN Stack', 'Next.js', 'React Native', 'SaaS', 'CRM'],
      location: 'Remote'
    },
    {
      company: 'Leospree (pvt) Ltd',
      url: 'https://leospree.com/',
      role: 'Software Engineering Intern (Full Stack Developer)',
      type: 'Hybrid',
      period: 'Dec 2025 - Mar 2026',
      description: 'Contributed to the development of enterprise-level applications including POS systems and Hotel Management software. Engineered custom software solutions for retail businesses and built professional client portfolios using the Laravel framework.',
      tech: ['Laravel', 'PHP', 'MySQL', 'POS Systems', 'Hotel Management'],
      location: 'Hybrid'
    }
  ];

  return (
    <section id="experience" className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} mb-12 text-center font-handwritten`}
        >
          Work Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 last:mb-0 pl-8 border-l-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${isDark ? 'bg-cyan-400 ring-4 ring-gray-900' : 'bg-cyan-600 ring-4 ring-white'}`} />

              <div className={`${isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} p-6 rounded-xl transition-all duration-300 border ${isDark ? 'border-gray-700 hover:border-cyan-500/50' : 'border-gray-200 hover:border-cyan-600/30'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} font-body`}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-lg font-semibold ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} flex items-center gap-1 transition-colors`}
                      >
                        {exp.company}
                        <FiExternalLink size={14} />
                      </a>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>• {exp.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-1">
                    <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-body`}>
                      <FiCalendar className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                      {exp.period}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-body`}>
                      <FiMapPin className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm md:text-base leading-relaxed mb-6 font-body`}>
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${isDark
                          ? 'bg-gray-700 text-cyan-400 border border-gray-600'
                          : 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
