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
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: delay / 1000 }}
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
