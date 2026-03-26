import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

const MarineSnow = ({ count = 5000 }) => {
  const mesh = useRef();
  
  // Create an array of random positions
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // spread particles widely since they need to cover the screen and scroll depths
      pos[i * 3] = (Math.random() - 0.5) * 50; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10; // z
      
      spd[i] = Math.random() * 0.05 + 0.01;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const array = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // move particles down slowly
      array[i * 3 + 1] -= speeds[i];
      // if they go too far down, reset them to the top
      if (array[i * 3 + 1] < -25) {
        array[i * 3 + 1] = 25;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  );
};

const BackgroundScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MarineSnow count={3000} />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
