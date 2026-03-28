import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = '', direction = 'up', scale = false, duration = 0.8 }) => {
  const directions = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', scale: scale ? 0.95 : 1, ...directions[direction] }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ 
        duration: duration, 
        ease: [0.16, 1, 0.3, 1], // very dynamic, snappy start with a long smooth tail
        delay: delay / 1000 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
