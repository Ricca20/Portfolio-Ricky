'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Education = () => {
  const { isDark } = useTheme();

  const education = [
    {
      degree: 'BSc (Hons) in Information Technology',
      specialization: 'Specializing in Software Engineering',
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      period: '2023 - 2027',
      gpa: 'Current GPA: 3.09/4.00',
    },
    {
      degree: 'G.C.E. Advanced Level',
      specialization: 'Physical Science Stream',
      institution: 'St. Joseph Vaz College, Wennappuwa',
      period: '2013 - 2022',
      results: '3S passes - 2022 (2023)',
    },
  ];

  return (
    <section
      id="education"
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } transition-colors duration-300 scroll-mt-20`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          } mb-10 text-center font-handwritten`}
        >
          Education
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-10">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-cyan-500"
            >
              <div
                className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${
                  isDark ? 'bg-cyan-400' : 'bg-cyan-600'
                }`}
              />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3
                  className={`text-lg md:text-xl font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  } font-body`}
                >
                  {edu.degree}
                </h3>
                <span
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  } font-body mt-1 md:mt-0`}
                >
                  {edu.period}
                </span>
              </div>

              {edu.specialization && (
                <p
                  className={`text-sm md:text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-2 font-body`}
                >
                  {edu.specialization}
                </p>
              )}

              <p
                className={`text-sm md:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } mb-2 font-body`}
              >
                {edu.institution}
              </p>

              {edu.gpa && (
                <p className={`text-sm ${isDark ? 'text-cyan-400' : 'text-cyan-600'} font-body`}>
                  {edu.gpa}
                </p>
              )}
              {edu.results && (
                <p className={`text-sm ${isDark ? 'text-cyan-400' : 'text-cyan-600'} font-body`}>
                  {edu.results}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
