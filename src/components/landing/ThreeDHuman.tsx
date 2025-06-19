
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, useGLTF, Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnimatedWrapper } from './AnimatedWrapper';

// Simple human-like figure made of basic shapes
const HumanFigure = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#fdbcf4" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.8]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Floating particles around the figure */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.5,
            1 + Math.sin((i / 8) * Math.PI * 4) * 0.3,
            Math.sin((i / 8) * Math.PI * 2) * 1.5
          ]}
          scale={0.1}
        >
          <sphereGeometry />
          <meshStandardMaterial 
            color={`hsl(${(i * 45) % 360}, 70%, 60%)`}
            emissive={`hsl(${(i * 45) % 360}, 70%, 30%)`}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#a855f7"
      />
      
      <HumanFigure />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Experience the Future
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interact with our 3D avatar and discover what's possible in the digital realm
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20">
              <Canvas
                camera={{ position: [0, 2, 5], fov: 50 }}
                style={{ background: 'transparent' }}
              >
                <Scene />
              </Canvas>
            </div>
            
            <div className="absolute bottom-4 left-4 text-sm text-gray-400 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
              Click and drag to explore • Auto-rotating
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};
