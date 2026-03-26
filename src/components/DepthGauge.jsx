import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DepthGauge = () => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Very basic depth calculation for now. 
      // 100vh = 1000m roughly for visual effect.
      const scrollY = window.scrollY;
      const calculatedDepth = Math.floor((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 6000);
      setDepth(calculatedDepth > 6000 ? 6000 : calculatedDepth < 0 ? 0 : calculatedDepth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDepth = (targetDepth) => {
    const ratio = targetDepth / 6000;
    const targetY = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const jumpPoints = [
    { label: 'Surface', depth: 0 },
    { label: 'Sunlight', depth: 200 },
    { label: 'Twilight', depth: 1000 },
    { label: 'Midnight', depth: 4000 },
    { label: 'Abyssal', depth: 6000 }
  ];

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 glass-panel p-4 flex flex-col items-center gap-4 hidden sm:flex">
      <div 
        className="h-64 md:h-96 w-4 bg-gray-700 rounded-full relative overflow-hidden cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const ratio = clickY / rect.height;
          scrollToDepth(ratio * 6000);
        }}
        aria-label="Interactive depth timeline"
      >
        <div 
          className="absolute top-0 left-0 w-full bg-cyan-400 transition-all duration-100 ease-out"
          style={{ height: `${(depth / 6000) * 100}%` }}
        ></div>
        
        {/* Navigation markers */}
        {jumpPoints.map((point) => (
          <div 
            key={point.label}
            className="absolute w-full h-1 bg-white/20 z-10 hidden group-hover:block"
            style={{ top: `${(point.depth / 6000) * 100}%` }}
            title={`Jump to ${point.label} Zone (${point.depth}m)`}
          />
        ))}
      </div>
      <div className="text-center font-mono">
        <p className="text-xs opacity-70">DEPTH</p>
        <p className="font-bold text-lg text-cyan-400">{depth}m</p>
      </div>
      <div className="text-center font-mono">
        <p className="text-xs opacity-70">PSI</p>
        <p className="font-bold text-sm text-blue-300">{(depth * 0.145).toFixed(0)}</p>
      </div>
    </div>
  );
};

export default DepthGauge;
