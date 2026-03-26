import React from 'react';

const OceanZone = ({ id, title, depth, description, zoneClass, children }) => {
  return (
    <section id={id} className={`relative w-full min-h-screen flex items-center p-8 md:p-16 ${zoneClass}`}>
      <div className="max-w-4xl mx-auto z-10">
        <p className="text-xl md:text-2xl title-font opacity-80 mb-2">{depth}</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 title-font drop-shadow-lg">{title}</h2>
        <p className="text-lg md:text-xl max-w-xl opacity-90 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-full z-20 mt-10">
        {children}
      </div>
    </section>
  );
};

export default OceanZone;
