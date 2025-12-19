import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Snowfall = () => {
  const { isDark } = useTheme();
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Create snowflakes with random properties and varied styles
    const flakes = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 8, // 8-13 seconds
      opacity: Math.random() * 0.5 + 0.5, // 0.5-1
      size: Math.random() * 12 + 4, // 4-16px
      delay: Math.random() * 8, // 0-8 seconds delay
      swayDuration: Math.random() * 2 + 3, // 3-5 seconds sway
      rotationDuration: Math.random() * 3 + 2, // 2-5 seconds rotation
      style: Math.floor(Math.random() * 3), // 0: circle, 1: star, 2: sparkle
      blur: Math.random() * 2 + 0.5, // 0.5-2.5px blur
    }));
    setSnowflakes(flakes);
  }, []);

  const getSnowflakeContent = (flake) => {
    const baseColor = isDark ? 'text-white' : 'text-blue-100';
    const glowColor = isDark ? 'drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_2px_rgba(147,197,253,0.8)]';
    
    switch (flake.style) {
      case 0: // Circle/dot
        return (
          <div
            className={`rounded-full ${isDark ? 'bg-white' : 'bg-blue-100'}`}
            style={{
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              filter: `blur(${flake.blur}px)`,
              boxShadow: isDark ? '0 0 6px rgba(255,255,255,0.6)' : '0 0 4px rgba(147,197,253,0.5)',
            }}
          />
        );
      case 1: // Star/asterisk
        return (
          <div
            className={`${baseColor} ${glowColor} font-bold`}
            style={{
              fontSize: `${flake.size}px`,
              filter: `blur(${flake.blur * 0.5}px)`,
            }}
          >
            ❄
          </div>
        );
      case 2: // Sparkle
        return (
          <div
            className={`${baseColor} ${glowColor}`}
            style={{
              fontSize: `${flake.size * 0.8}px`,
              filter: `blur(${flake.blur * 0.3}px)`,
            }}
          >
            ✦
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 animate-snowfall"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: isDark ? flake.opacity : flake.opacity * 0.75,
            '--sway-duration': `${flake.swayDuration}s`,
          }}
        >
          <div
            className="animate-sway"
            style={{
              animationDuration: `${flake.swayDuration}s`,
              animationDelay: `${flake.delay * 0.5}s`,
            }}
          >
            <div
              className="animate-rotate-gentle"
              style={{
                animationDuration: `${flake.rotationDuration}s`,
                animationDelay: `${flake.delay * 0.3}s`,
              }}
            >
              {getSnowflakeContent(flake)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
