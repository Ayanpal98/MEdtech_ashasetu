import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export const ThreeDLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <motion.div 
      className="relative flex items-center justify-center transform-gpu"
      style={{ width: size, height: size, perspective: 1000 }}
      whileHover="hover"
    >
      {/* Front Face (Logo) */}
      <motion.div
        className="absolute inset-0 bg-accent rounded-lg flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(61,220,132,0.4)] z-20 border-t border-l border-white/30"
        initial={{ rotateY: 0, rotateX: 0 }}
        animate={{ 
          rotateY: [0, 5, -5, 0],
          rotateX: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        variants={{
          hover: { 
            scale: 1.1,
            rotateY: 25,
            rotateX: 10,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }
        }}
      >
        <Activity size={size * 0.6} className="text-bg" strokeWidth={3} />
      </motion.div>

      {/* Depth Layers */}
      <motion.div
        className="absolute inset-0 bg-accent-light rounded-lg opacity-40 blur-[0.5px]"
        style={{ transform: "translateZ(-4px)" }}
        variants={{
          hover: { 
            rotateY: 25,
            rotateX: 10,
            x: -4,
            y: 2,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-accent-dark rounded-lg opacity-20 blur-[1px]"
        style={{ transform: "translateZ(-8px)" }}
        variants={{
          hover: { 
            rotateY: 25,
            rotateX: 10,
            x: -8,
            y: 4,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }
        }}
      />

      {/* Glow Effect */}
      <motion.div 
        className="absolute inset-x-[-80%] inset-y-[-80%] bg-accent/20 blur-[30px] rounded-full pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};
