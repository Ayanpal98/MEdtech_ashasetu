import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/themeContext';
import { motion } from 'motion/react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-accent hover:text-accent-light transition-all shadow-lg ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 90,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} />
        </motion.div>
      </div>
    </motion.button>
  );
};
