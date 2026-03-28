import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, className = '', el: Wrapper = 'p', delay = 0, justify = 'center', animate: animateOnMount = false }) => {
  // Split text into words for animation
  const words = text.split(' ').map(word => {
    // some words might be empty spaces
    if (!word) return ' ';
    return word;
  });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay / 1000 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 60,
      filter: 'blur(12px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        {...(animateOnMount
          ? { animate: 'visible' }
          : { whileInView: 'visible', viewport: { once: true, margin: '-80px', amount: 0.1 } }
        )}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: justify }}
      >
        {words.map((word, index) => (
          <motion.span variants={child} key={index} style={{ paddingRight: '0' }}>
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
