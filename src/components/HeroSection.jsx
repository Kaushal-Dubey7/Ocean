import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[var(--surface-primary)] to-[var(--surface-secondary)] flex flex-col justify-center items-center">
      <div className="z-10 text-center px-4">
        <h1 className="title-font text-5xl md:text-7xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(0,168,232,0.8)]">
          OCEAN DEPTHS
        </h1>
        <h2 className="title-font text-2xl md:text-3xl text-[var(--surface-light)] drop-shadow-[0_0_10px_rgba(125,216,247,0.5)]">
          A JOURNEY INTO THE ABYSS
        </h2>
        <p className="mt-6 text-lg max-w-lg mx-auto text-[var(--text-main)]">
          Scroll to descend through 5 mysterious zones
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {/* Background elements like wave SVG can be added here */}
    </section>
  );
};

export default HeroSection;
