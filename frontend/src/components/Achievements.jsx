import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Achievements = () => {
  const { isDark } = useTheme();
  const achievements = [
    {
      icon: '🏆',
      title: 'Best Web Design Award',
      issuer: 'Tech Innovation Forum 2023',
      date: '2023'
    },
    {
      icon: '📜',
      title: 'Full Stack Development Certificate',
      issuer: 'Udemy',
      date: '2023'
    },
    {
      icon: '⭐',
      title: 'Google Cloud Certified Associate Cloud Engineer',
      issuer: 'Google Cloud',
      date: '2022'
    },
    {
      icon: '🎓',
      title: 'React Advanced Patterns Certification',
      issuer: 'Egghead',
      date: '2023'
    },
    {
      icon: '💡',
      title: 'Innovation Award',
      issuer: 'Developer Community',
      date: '2023'
    },
    {
      icon: '🚀',
      title: 'Tech Startup Bootcamp',
      issuer: 'Y Combinator',
      date: '2022'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section
      id="achievements"
      className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 text-center`}
        >
          🏆 achievements & certs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className={`text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-12 text-center`}
        >
          Milestones and recognitions along the way ✨
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-gray-50 shadow-lg'} p-6 rounded-lg border-l-4 ${isDark ? 'border-blue-500 hover:border-cyan-400' : 'border-blue-600 hover:border-cyan-600'} transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {achievement.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
                    {achievement.issuer}
                  </p>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs`}>
                    {achievement.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
