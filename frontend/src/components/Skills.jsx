import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaReact, FaNodeJs, FaJs,  FaDocker,  FaGitAlt, FaDatabase, FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiExpress, SiGraphql, SiNextdotjs,  SiSpring, SiMysql, SiVercel, SiVite, SiPostman, SiFigma, SiGithub, SiNpm } from 'react-icons/si';

const Skills = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const skillsData = [
    // Languages
    { name: 'JavaScript', category: 'Languages', proficiency: 95, icon: <FaJs className="text-yellow-400" /> },
    { name: 'TypeScript', category: 'Languages', proficiency: 88, icon: <SiTypescript className="text-blue-500" /> },
    { name: 'Java', category: 'Languages', proficiency: 80, icon: <FaJava className="text-red-500" /> },
    { name: 'HTML5', category: 'Languages', proficiency: 98, icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', category: 'Languages', proficiency: 95, icon: <FaCss3Alt className="text-blue-400" /> },
    
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 92, icon: <FaReact className="text-cyan-400" /> },
    { name: 'Next.js', category: 'Frontend', proficiency: 85, icon: <SiNextdotjs className={isDark ? 'text-white' : 'text-black'} /> },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: 'Vite', category: 'Frontend', proficiency: 88, icon: <SiVite className="text-purple-500" /> },
    
    // Backend
    { name: 'Node.js', category: 'Backend', proficiency: 90, icon: <FaNodeJs className="text-green-500" /> },
    { name: 'Express.js', category: 'Backend', proficiency: 88, icon: <SiExpress className="text-gray-600" /> },
    { name: 'Spring Boot', category: 'Backend', proficiency: 75, icon: <SiSpring className="text-green-600" /> },
    { name: 'RESTful APIs', category: 'Backend', proficiency: 90, icon: <FaDatabase className="text-purple-500" /> },
    { name: 'GraphQL', category: 'Backend', proficiency: 80, icon: <SiGraphql className="text-pink-500" /> },
    
    // Databases
    { name: 'MongoDB', category: 'Database', proficiency: 90, icon: <SiMongodb className="text-green-600" /> },
    { name: 'PostgreSQL', category: 'Database', proficiency: 85, icon: <SiPostgresql className="text-blue-600" /> },
    { name: 'MySQL', category: 'Database', proficiency: 82, icon: <SiMysql className="text-blue-500" /> },
    { name: 'Firebase', category: 'Database', proficiency: 88, icon: <SiFirebase className="text-orange-500" /> },
    
    
    // Cloud & DevOps
    { name: 'Docker', category: 'Cloud', proficiency: 85, icon: <FaDocker className="text-blue-500" /> },
    { name: 'Vercel', category: 'Cloud', proficiency: 90, icon: <SiVercel className={isDark ? 'text-white' : 'text-black'} /> },
    
    // Tools
    { name: 'Git', category: 'Tools', proficiency: 92, icon: <FaGitAlt className="text-orange-600" /> },
    { name: 'GitHub', category: 'Tools', proficiency: 90, icon: <SiGithub className={isDark ? 'text-white' : 'text-black'} /> },
    { name: 'npm', category: 'Tools', proficiency: 88, icon: <SiNpm className="text-red-500" /> },
    { name: 'Postman', category: 'Tools', proficiency: 88, icon: <SiPostman className="text-orange-500" /> },
    { name: 'Figma', category: 'Tools', proficiency: 75, icon: <SiFigma className="text-purple-500" /> },
  ];

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];
  
  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const avgProficiency = Math.round(
    filteredSkills.reduce((acc, skill) => acc + skill.proficiency, 0) / filteredSkills.length
  );

  const getProficiencyLabel = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Learning';
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 90) return isDark ? 'text-green-400' : 'text-green-600';
    if (proficiency >= 80) return isDark ? 'text-blue-400' : 'text-blue-600';
    if (proficiency >= 70) return isDark ? 'text-yellow-400' : 'text-yellow-600';
    return isDark ? 'text-orange-400' : 'text-orange-600';
  };

  return (
    <section id="skills" className={`py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'} mb-10 text-center font-handwritten`}
        >
         Technologies
        </motion.h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by ${category}`}
              aria-pressed={activeCategory === category}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all font-body ${
                activeCategory === category
                  ? isDark
                    ? 'bg-cyan-500 text-white'
                    : 'bg-cyan-600 text-white'
                  : isDark
                  ? 'text-gray-300 hover:text-cyan-400'
                  : 'text-gray-600 hover:text-cyan-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="flex justify-center">
          <motion.div 
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            layout
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="text-3xl md:text-4xl transform transition-transform">
                  {skill.icon}
                </div>
                <h3 className={`text-xs md:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} font-body`}>
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
