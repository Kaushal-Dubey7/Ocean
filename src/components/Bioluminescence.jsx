import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Bioluminescence = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Setup spring-physics based mouse followers
  const springConfig = { damping: 25, stiffness: 120 };
  const cursorX = useSpring(window.innerWidth / 2, springConfig);
  const cursorY = useSpring(window.innerHeight / 2, springConfig);

  useEffect(() => {
    // Generate particle positions relative to cursor
    const initialParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      offsetX: (Math.random() - 0.5) * 80,
      offsetY: (Math.random() - 0.5) * 80,
      delay: Math.random() * 0.2
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e) => {
      // Only show in twilight/midnight/abyssal zones (roughly below 1.5 viewport heights)
      if (window.scrollY > window.innerHeight * 1.5) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[45]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-4 h-4 rounded-full bg-cyan-300/60 blur-[4px] mix-blend-screen"
          style={{
            x: cursorX,
            y: cursorY,
            marginLeft: p.offsetX,
            marginTop: p.offsetY,
            boxShadow: '0 0 15px 5px rgba(0, 255, 245, 0.4)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2 + p.delay * 10,
            repeat: Infinity,
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

export default Bioluminescence;
