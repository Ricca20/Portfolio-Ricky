import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiFigma, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SiJira } from 'react-icons/si';
import { getTechStackColor } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const projectsPerPage = 4;

  const handleLinkClick = (e, url) => {
    if (url === '#') {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  // Real Projects Data
  const allProjects = [
    {
      _id: '1',
      title: 'Centralized Healthcare System',
      description: 'Built a centralized hospital management system using Spring Boot and OOP principles. Implemented patient registration, appointment scheduling, and online payment features with data visualizations using Chart.js.',
      techStack: ['Spring Boot', 'Java', 'OOP', 'Chart.js', 'HTML','CSS'],
      links: {
        github: 'https://github.com/nethal17/Healthcare-System',
        live: '#'
      }
    },
    {
      _id: '2',
      title: 'Rajapaksha Foods – Campus Food Delivery Platform',
      description: 'Campus-focused food delivery system for SLIIT students and staff, enabling fast and affordable meal ordering. Includes order tracking, QR payments, analytics dashboards, and blockchain-based salary records for staff.',
      role: 'Full-stack Developer',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Stripe API'],
      highlights: [
        'Real-time order tracking & notifications',
        'Admin dashboard with predictive analytics',
        'QR-based payment and COD system'
      ],
      links: {
        github: 'https://github.com/Ricca20/Rajapaksha-Foods.git',
        live: 'https://rajapaksha-foods.vercel.app'
      }
    },
    {
      _id: '3',
      title: 'Agri-Waste Recycling & Marketplace System',
      description: 'Dynamic MERN web application connecting farmers with recyclers and buyers to promote sustainable agri-waste reuse. Features include marketplace listings, inventory management, financial tracking, and delivery coordination.',
      role: 'Admin Dashboard & Review Management',
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Chart.js', 'Tailwind CSS'],
      highlights: [
        'Verified buyer reviews',
        'Low-inventory alerts for farmers',
        'Real-time analytics dashboard'
      ],
      links: {
        github: 'https://github.com/nethal17/Agri-Waste-Marketplace.git',
        live: '#'
      }
    },
    {
      _id: '4',
      title: 'AccessLanka – Accessibility-Focused Tourism Platform',
      description: 'A platform for travelers with disabilities in Sri Lanka, featuring AI-powered accessibility recommendations, route planning, and hotel/public space reviews filtered by accessibility standards.',
      role: 'Backend & API Integration Developer',
      techStack: ['React Native', 'TypeScript', 'Expo', 'PostgreSQL', 'Supabase', 'AI APIs'],
      highlights: [
        'AI-based accessible route suggestions',
        'Hotel and destination accessibility ratings',
        'Voice-assisted user interaction',
        'Offline support for low-connectivity areas'
      ],
      links: {
        github: 'https://github.com/Ricca20/Accesslanka-Mobile-App.git',
        figma: 'https://www.figma.com/design/V1gYjBLCQuKqRIlXWlHAsy/AccessLanka-Mobile-App?node-id=2002-2&t=ElNIyAkON5ilYQXb-1',
        live: '#'
      }
    },
    {
      _id: '5',
      title: 'Spendy Tracker – Personal Finance Mobile App',
      description: 'Mobile finance tracker for users to record daily transactions, set monthly budgets, and visualize expenses by category.',
      role: 'Android App Developer',
      techStack: ['Kotlin', 'SharedPreferences', 'RecyclerView', 'JSON Storage'],
      highlights: [
        'Persistent data storage with SharedPreferences',
        'Pie charts for category-wise analysis',
        'Editable transactions with smooth UI'
      ],
      links: {
        github: 'https://github.com/Ricca20/Finance_Tracker-Mobile-App.git',
        apk: '#'
      }
    }
  ];

  // Sort projects by _id and paginate
  const sortedProjects = [...allProjects].sort((a, b) => parseInt(a._id) - parseInt(b._id));
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const currentProjects = sortedProjects.slice(startIndex, startIndex + projectsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section
      id="projects"
      className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 scroll-mt-20`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} mb-10 text-center font-handwritten`}
        >
          Projects
        </motion.h2>

        {currentProjects.length > 0 && (
          <>
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
              {currentProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                } border rounded-lg p-5 transition-all hover:border-cyan-500`}
              >
                {/* Header with Title and Links */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className={`text-base md:text-lg font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} font-body`}>
                    {project.title}
                  </h3>
                  
                  {/* Links */}
                  <div className="flex gap-2 flex-shrink-0">
                    {project.links.github && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        } transition-colors`}
                        title="GitHub"
                      >
                        <FiGithub size={18} />
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.links.live}
                        onClick={(e) => handleLinkClick(e, project.links.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        } transition-colors`}
                        title="Live Demo"
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    )}
                    {project.links.figma && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.links.figma}
                        onClick={(e) => handleLinkClick(e, project.links.figma)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        } transition-colors`}
                        title="Figma"
                      >
                        <FiFigma size={18} />
                      </motion.a>
                    )}
                    {project.links.jira && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.links.jira}
                        onClick={(e) => handleLinkClick(e, project.links.jira)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        } transition-colors`}
                        title="Jira"
                      >
                        <SiJira size={18} />
                      </motion.a>
                    )}
                    {project.links.apk && (
                      <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.links.apk}
                        onClick={(e) => handleLinkClick(e, project.links.apk)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        } transition-colors`}
                        title="Download APK"
                      >
                        <FiDownload size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-4 font-body`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      } px-2.5 py-1 rounded text-xs font-body`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dot Indicators Only */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentPage
                    ? isDark ? 'bg-cyan-400 w-8' : 'bg-cyan-600 w-8'
                    : isDark ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </>
        )}

        {/* Floating Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 60}px`,
              transform: 'translateX(-50%)',
              zIndex: 1000
            }}
            className={`${
              isDark ? 'bg-gray-800 text-cyan-400 border-cyan-400' : 'bg-white text-cyan-600 border-cyan-600'
            } border-2 px-4 py-2 rounded-lg shadow-lg text-sm font-body whitespace-nowrap`}
          >
            Will be available soon
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-r-8 border-t-8 ${
                isDark ? 'border-l-transparent border-r-transparent border-t-cyan-400' : 'border-l-transparent border-r-transparent border-t-cyan-600'
              }`}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
