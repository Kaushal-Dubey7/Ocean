import React, { useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import OceanZone from './components/OceanZone';
import DepthGauge from './components/DepthGauge';
import BackgroundScene from './components/BackgroundScene';
import CreatureCard from './components/CreatureCard';
import Bioluminescence from './components/Bioluminescence';
import SoundControls from './components/SoundControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Basic setup for global scroll tracking
    const container = containerRef.current;
    if (!container) return;

    // We will implement complex GSAP scroll logics inside components or via a global hook
    gsap.utils.toArray('.ocean-zone-content').forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
          }
        }
      );
    });

  }, []);

  return (
    <div ref={containerRef} className="ocean-container relative">
      <BackgroundScene />
      <Bioluminescence />
      <SoundControls />
      <DepthGauge />
      
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HeroSection />
        </div>
        
        {/* Sunlight Zone */}
        <div className="pointer-events-auto">
          <OceanZone 
            id="sunlight-zone"
            title="The Sunlight Zone"
            depth="200m"
            description="Only 1% of sunlight reaches here. Eyes grow larger to see."
            zoneClass="bg-gradient-to-b from-[var(--surface-primary)] to-[var(--sunlight-primary)]"
          >
            <div className="ocean-zone-content mt-10">
              <CreatureCard 
                name="Giant Oarfish"
                scientificName="Regalecus glesne"
                depth="200m - 1000m"
                facts={["Longest bony fish alive", "Rarely seen at the surface", "Historically thought to be sea serpents"]}
                size="Up to 11 meters"
                image="majestic-giantOrfish.jpg"
                align="left"
              />
            </div>
          </OceanZone>
        </div>
        
        {/* Twilight Zone */}
        <div className="pointer-events-auto">
          <OceanZone 
            id="twilight-zone"
            title="The Twilight Zone"
            depth="1000m"
            description="Light fades, bioluminescence begins."
            zoneClass="bg-gradient-to-b from-[var(--sunlight-primary)] to-[var(--twilight-primary)]"
          >
            <div className="ocean-zone-content mt-10">
              <CreatureCard 
                name="Lanternfish"
                scientificName="Myctophidae"
                depth="1000m"
                facts={["Possesses light-producing organs (photophores)", "Undertakes daily vertical migrations", "Crucial part of the food web"]}
                size="10 to 15 centimeters"
                image="lentrane fish.jpg"
                align="right"
              />
            </div>
          </OceanZone>
        </div>

        {/* Midnight Zone */}
        <div className="pointer-events-auto">
          <OceanZone 
            id="midnight-zone"
            title="The Midnight Zone"
            depth="4000m"
            description="No light has touched these waters. Yet life finds a way to glow."
            zoneClass="bg-gradient-to-b from-[var(--twilight-primary)] to-[var(--midnight-primary)]"
          >
            <div className="ocean-zone-content mt-10">
              <CreatureCard 
                name="Vampire Squid"
                scientificName="Vampyroteuthis infernalis"
                depth="3000m"
                facts={["Not a true squid or octopus", "Eats marine snow", "Turns inside out to defend itself"]}
                size="Up to 30 centimeters"
                image="vampire squid.jpg"
                align="left"
              />
            </div>
          </OceanZone>
        </div>

        {/* Abyssal Zone */}
        <div className="pointer-events-auto">
          <OceanZone 
            id="abyssal-zone"
            title="The Abyssal Zone"
            depth="6000m+"
            description="Pressure here can crush a submarine. These creatures thrive."
            zoneClass="bg-gradient-to-b from-[var(--midnight-primary)] to-[var(--abyssal-primary)]"
          >
             <div className="ocean-zone-content mt-10">
              <CreatureCard 
                name="Gulper Eel"
                scientificName="Eurypharynx pelecanoides"
                depth="3000m - 6000m"
                facts={["Mouth can expand to swallow animals larger than itself", "Tiny eyes adapted for detecting bioluminescence", "Whiplike tail ending in a glowing organ"]}
                size="Up to 1 meter"
                image="Gulper-Eel.jpg"
                align="right"
              />
            </div>
          </OceanZone>
        </div>

        <div className="h-screen bg-[var(--abyssal-primary)] flex items-center justify-center">
          <h2 className="title-font text-4xl text-center z-10">
            We've reached the deepest explored point.<br />
            <span className="text-xl text-[var(--surface-light)]">Your journey continues.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;
