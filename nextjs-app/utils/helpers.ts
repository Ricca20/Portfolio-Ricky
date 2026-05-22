// Smooth scroll to section
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80; // Height of navbar (h-20 = 80px)
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

// Format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get tech stack colors (for badge styling)
export const getTechStackColor = (tech: string): string => {
  const colors: Record<string, string> = {
    React: 'bg-blue-500',
    'Node.js': 'bg-green-500',
    MongoDB: 'bg-yellow-500',
    Express: 'bg-gray-700',
    Tailwind: 'bg-cyan-500',
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-600',
    Python: 'bg-blue-700',
    PostgreSQL: 'bg-indigo-600',
    Firebase: 'bg-orange-500',
  };
  return colors[tech] || 'bg-gray-500';
};
