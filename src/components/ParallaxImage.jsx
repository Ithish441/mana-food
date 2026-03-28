import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt, className = '', imgClassName = '', speed = 0.5, delay = 0 }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate parallax based on speed
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", `${15 * speed}%`]);

  return (
    <motion.div 
      ref={ref}
      className={`parallax-container ${className}`}
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px', amount: 0.05 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, width: '100%', height: '130%', objectFit: 'cover', position: 'absolute', top: '-15%', left: 0 }} 
        className={imgClassName}
      />
    </motion.div>
  );
};

export default ParallaxImage;
