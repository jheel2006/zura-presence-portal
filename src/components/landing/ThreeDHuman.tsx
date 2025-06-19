
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnimatedWrapper } from './AnimatedWrapper';

// Realistic human figure with holographic glow effect
const RealisticHuman = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  // Common material for the holographic effect
  const holoMaterial = new THREE.MeshBasicMaterial({
    color: '#00ccff',
    transparent: true,
    opacity: 0.8,
    wireframe: true,
  });

  const solidHoloMaterial = new THREE.MeshStandardMaterial({
    color: '#0099cc',
    transparent: true,
    opacity: 0.3,
    emissive: '#0066aa',
    emissiveIntensity: 0.5,
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <primitive object={solidHoloMaterial} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.2]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.2]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.38, 0.58, 0.18]} />
        <primitive object={solidHoloMaterial} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.3, 1.3, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.3, 1.3, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Forearms */}
      <mesh position={[-0.3, 0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.4]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.3, 0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.4]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.3, 0.65, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.3, 0.65, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Pelvis */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.15]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Thighs */}
      <mesh position={[-0.1, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.1, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Calves */}
      <mesh position={[-0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.5]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.1, -0.4, 0.05]}>
        <boxGeometry args={[0.08, 0.06, 0.2]} />
        <primitive object={holoMaterial} />
      </mesh>
      <mesh position={[0.1, -0.4, 0.05]}>
        <boxGeometry args={[0.08, 0.06, 0.2]} />
        <primitive object={holoMaterial} />
      </mesh>
      
      {/* Glowing particles around the figure */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 20) * Math.PI * 2) * (1.2 + Math.sin(i) * 0.3),
            0.8 + Math.sin((i / 20) * Math.PI * 4) * 0.8,
            Math.sin((i / 20) * Math.PI * 2) * (1.2 + Math.cos(i) * 0.3)
          ]}
          scale={0.02 + Math.sin(i * 2) * 0.01}
        >
          <sphereGeometry />
          <meshBasicMaterial 
            color="#00ffff"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} color="#0066aa" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00ccff" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#0099ff" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#00aaff"
        target-position={[0, 0, 0]}
      />
      
      <RealisticHuman />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.3}
      />
    </>
  );
};

export const ThreeDHuman = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="features-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Digital Human Interface
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of human-digital interaction with our holographic avatar
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <div className="w-full h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20">
              <Canvas
                camera={{ position: [0, 2, 5], fov: 50 }}
                style={{ background: 'radial-gradient(circle at center, #001122 0%, #000000 100%)' }}
              >
                <Scene />
              </Canvas>
            </div>
            
            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
              Drag to rotate • Scroll to zoom • Holographic rendering active
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};
