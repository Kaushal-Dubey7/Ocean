import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

const CreatureCard = ({ name, scientificName, depth, facts, size, image, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative my-16 flex w-full z-20 ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
      <motion.div 
        className={`creature-trigger cursor-pointer flex flex-col items-center ${align === 'left' ? 'ml-4 md:ml-16 lg:ml-24' : 'mr-20 md:mr-48 lg:mr-64'}`}
        whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-gradient-to-br from-[#0c4a6e] to-[#082f49] flex items-center justify-center text-cyan-300 relative overflow-hidden group">
          <Info size={40} className="group-hover:opacity-0 transition-opacity duration-300" />
          <span className="absolute text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">DISCOVER</span>
        </div>
        <p className="mt-4 font-bold title-font text-xl">{name}</p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="discovery-section glass-panel relative bg-slate-900/90 border-cyan-500/30"
              style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: '90%',
                maxWidth: '500px',
                padding: '30px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                aria-label="Close"
              >
                <X size={24} className="text-gray-300" />
              </button>
              
              {/* IMAGE SECTION */}
              <div className="creature-image-wrapper">
                <img 
                  src={`/assets/creatures/${image || name.toLowerCase().replace(/\s+/g, '-') + '.png'}`}
                  alt={name}
                  className="creature-image"
                  onError={(e) => {
                    // Fallback for missing images
                    e.target.style.display = 'none';
                    console.log(`Image not found: ${image || name.toLowerCase().replace(/\s+/g, '-') + '.png'}`);
                  }}
                />
              </div>
              
              <div className="creature-info">
                <h3 className="creature-name title-font text-cyan-400">{name}</h3>
                <p className="creature-scientific">{scientificName} • {depth}</p>
                
                <div className="space-y-4 text-left mt-4 text-gray-200">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-500 tracking-wider mb-2 uppercase">Fascinating Facts</h4>
                    <ul className="list-disc pl-4 space-y-2 text-sm">
                      {facts.map((fact, idx) => (
                        <li key={idx}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <h4 className="text-xs font-bold text-cyan-500 tracking-wider mb-1 uppercase">Size Comparison</h4>
                    <p className="text-sm text-gray-300">{size}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatureCard;
