'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const About = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://www.facebook.com/share/1DHirebiGM/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/ricc.a__/?igsh=MXZrZTBtdXNzN2J1Yg%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/perera__diary/?igsh=ZnR5ZGFrY3QxdWhv&utm_source=qr', label: 'Instagram Diary' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/94765587168', label: 'WhatsApp' },
  ];

  return (
    <section
      id="about"
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
          About
        </motion.h2>

        {/* Description - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p
            className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-sm md:text-base leading-relaxed font-body text-center max-w-4xl mx-auto`}
          >
            A developer driven by curiosity and precision — building data-driven platforms and
            AI-powered tools that bring ideas to life. Passionate about backend engineering,
            system design, and AI integration, with a constant focus on solving real-world
            problems through clean, scalable solutions.
          </p>
        </motion.div>

        {/* Grab my CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <motion.a
            href="/Ricky Perera.pdf"
            download="Ricky_Perera_CV.pdf"
            aria-label="Download Ricky Perera's CV"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-3 ${
              isDark
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            } rounded-md font-medium text-base transition-all font-body`}
          >
            Grab my CV
          </motion.a>
        </motion.div>

        {/* Beyond Coding Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-1xl mx-auto text-center"
        >
          <h3
            className={`text-lg md:text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            } mb-6 font-body`}
          >
            Beyond Coding
          </h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {['Photography', 'Music', 'Singing'].map((interest, index) => (
                <span
                  key={index}
                  className={`${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } text-sm md:text-base font-body`}
                >
                  {interest}{index < 2 ? ' •' : ''}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                  } transition-colors text-xl`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
