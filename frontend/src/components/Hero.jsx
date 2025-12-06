import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiEye } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-start pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Profile Picture - Left Side */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-5/12 flex justify-center lg:justify-start"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[26rem]">
              <img
                src="/profile2.jpg"
                alt="Ricky Perera - Full Stack Developer"
                width="320"
                height="416"
                loading="eager"
                fetchpriority="high"
                className={`w-full h-full object-cover rounded-lg ${
                  isDark ? 'shadow-lg shadow-black/30' : 'shadow-lg shadow-gray-400/30'
                }`}
              />
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-7/12 text-center lg:text-left"
          >
            {/* Main Heading */}
            <div className="mb-4">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-3 font-handwritten leading-tight`}>
                Hey, I'm <span className={`${
                  isDark ? 'text-cyan-400' : 'text-cyan-600'
                }`}>Ricky Perera</span>
              </h1>
              
              {/* AKA with Handwritten Font */}
              <p className={`text-2xl md:text-3xl lg:text-4xl ${isDark ? 'text-gray-400' : 'text-gray-600'} font-handwritten`}>
                AKA <span className="text-cyan-500">Ricca</span>
              </p>
            </div>

            {/* Role */}
            <div className="mb-6">
              <p className={`text-base md:text-lg ${
                isDark ? 'text-cyan-400' : 'text-cyan-600'
              } font-body`}>
                FullStack Developer
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className={`text-sm md:text-base ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } leading-relaxed max-w-2xl font-body`}>
                Building, breaking, and perfecting full-stack applications and intelligent platforms — fueled by creativity, coffee, and problem-solving, with AI and automation to make technology smarter.
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                aria-label="View my projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${
                  isDark 
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white' 
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                } rounded-md font-medium text-base transition-all font-body text-center`}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                aria-label="Contact me"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 ${
                  isDark 
                    ? 'bg-transparent hover:bg-gray-800 text-cyan-400 border border-cyan-400' 
                    : 'bg-transparent hover:bg-gray-100 text-cyan-600 border border-cyan-600'
                } rounded-md font-medium text-base transition-all font-body text-center`}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
