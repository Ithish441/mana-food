import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring trails with spring
  const springConfig = { damping: 30, stiffness: 180, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on pointer (non-touch) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      // Dot center-aligned (8px radius = -8)
      dotX.set(x - 4);
      dotY.set(y - 4);
      // Ring center-aligned (20px radius = -20)
      cursorX.set(x - 20);
      cursorY.set(y - 20);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const el = e.target;
      if (
        el.tagName.toLowerCase() === 'a' ||
        el.tagName.toLowerCase() === 'button' ||
        el.closest('a') ||
        el.closest('button') ||
        el.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring — trails behind */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #A44633',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? '#A44633' : '#1E1B18',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* Inner dot — snaps instantly to cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#A44633',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;
