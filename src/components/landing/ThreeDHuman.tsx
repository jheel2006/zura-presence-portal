
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AnimatedWrapper } from './AnimatedWrapper';

// More realistic human figure with enhanced holographic effects
const RealisticHuman = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    }
  });

  // Enhanced holographic materials
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0.6,
    wireframe: true,
  });

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: '#0088cc',
    transparent: true,
    opacity: 0.2,
    emissive: '#0066aa',
    emissiveIntensity: 0.8,
    roughness: 0.1,
    metalness: 0.7,
  });

  const innerGlowMaterial = new THREE.MeshStandardMaterial({
    color: '#00aaff',
    transparent: true,
    opacity: 0.4,
    emissive: '#0099dd',
    emissiveIntensity: 1.2,
  });

  return (
    <group ref={groupRef}>
      {/* Head - more detailed */}
      <group position={[0, 1.75, 0]}>
        {/* Skull */}
        <mesh>
          <sphereGeometry args={[0.12, 32, 32]} />
          <primitive object={wireframeMaterial} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.11, 16, 16]} />
          <primitive object={glowMaterial} />
        </mesh>
        
        {/* Face features */}
        <mesh position={[0, -0.02, 0.08]}>
          <boxGeometry args={[0.08, 0.06, 0.04]} />
          <primitive object={innerGlowMaterial} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.03, 0.02, 0.09]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
        <mesh position={[0.03, 0.02, 0.09]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      </group>
      
      {/* Neck - more anatomical */}
      <mesh position={[0, 1.58, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.15]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Torso - more detailed chest and abs */}
      <group position={[0, 1.2, 0]}>
        {/* Main torso */}
        <mesh>
          <boxGeometry args={[0.35, 0.5, 0.18]} />
          <primitive object={wireframeMaterial} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.33, 0.48, 0.16]} />
          <primitive object={glowMaterial} />
        </mesh>
        
        {/* Chest definition */}
        <mesh position={[0, 0.1, 0.05]}>
          <boxGeometry args={[0.25, 0.15, 0.08]} />
          <primitive object={innerGlowMaterial} />
        </mesh>
        
        {/* Abs */}
        <mesh position={[0, -0.1, 0.06]}>
          <boxGeometry args={[0.15, 0.2, 0.06]} />
          <primitive object={innerGlowMaterial} />
        </mesh>
      </group>
      
      {/* Shoulders */}
      <mesh position={[-0.22, 1.4, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0.22, 1.4, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Arms - more muscular definition */}
      <group>
        {/* Left upper arm */}
        <mesh position={[-0.25, 1.15, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.045, 0.05, 0.35]} />
          <primitive object={wireframeMaterial} />
        </mesh>
        
        {/* Right upper arm */}
        <mesh position={[0.25, 1.15, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.045, 0.05, 0.35]} />
          <primitive object={wireframeMaterial} />
        </mesh>
        
        {/* Elbows */}
        <mesh position={[-0.3, 0.9, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <primitive object={innerGlowMaterial} />
        </mesh>
        <mesh position={[0.3, 0.9, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <primitive object={innerGlowMaterial} />
        </mesh>
        
        {/* Forearms */}
        <mesh position={[-0.32, 0.65, 0]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.035, 0.04, 0.3]} />
          <primitive object={wireframeMaterial} />
        </mesh>
        <mesh position={[0.32, 0.65, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.035, 0.04, 0.3]} />
          <primitive object={wireframeMaterial} />
        </mesh>
      </group>
      
      {/* Hands - more detailed */}
      <mesh position={[-0.35, 0.45, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0.35, 0.45, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Pelvis - more anatomical */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.28, 0.15, 0.12]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.26, 0.13, 0.1]} />
        <primitive object={glowMaterial} />
      </mesh>
      
      {/* Thighs - more muscular */}
      <mesh position={[-0.08, 0.55, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0.08, 0.55, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Knees */}
      <mesh position={[-0.08, 0.3, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <primitive object={innerGlowMaterial} />
      </mesh>
      <mesh position={[0.08, 0.3, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <primitive object={innerGlowMaterial} />
      </mesh>
      
      {/* Calves - more defined */}
      <mesh position={[-0.08, 0.05, 0]}>
        <cylinderGeometry args={[0.045, 0.06, 0.35]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0.08, 0.05, 0]}>
        <cylinderGeometry args={[0.045, 0.06, 0.35]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Feet - more realistic */}
      <mesh position={[-0.08, -0.15, 0.08]}>
        <boxGeometry args={[0.07, 0.05, 0.2]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      <mesh position={[0.08, -0.15, 0.08]}>
        <boxGeometry args={[0.07, 0.05, 0.2]} />
        <primitive object={wireframeMaterial} />
      </mesh>
      
      {/* Enhanced particle system */}
      <group ref={particlesRef}>
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2;
          const radius = 1.5 + Math.sin(i * 0.5) * 0.4;
          const height = 0.5 + Math.sin((i / 40) * Math.PI * 6) * 1.2;
          
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
              ]}
              scale={0.015 + Math.sin(i * 3) * 0.01}
            >
              <sphereGeometry />
              <meshBasicMaterial 
                color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0099ff" : "#00ccee"}
                transparent
                opacity={0.8 + Math.sin(i * 2) * 0.2}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Data stream lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`line-${i}`}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 2,
            0.8,
            Math.sin((i / 8) * Math.PI * 2) * 2
          ]}
          rotation={[0, (i / 8) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.01, 2, 0.01]} />
          <meshBasicMaterial 
            color="#00aaff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} color="#0044aa" />
      <pointLight position={[3, 4, 3]} intensity={1.2} color="#00ccff" />
      <pointLight position={[-3, -2, -3]} intensity={0.8} color="#0099ff" />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#00aaff" />
      
      <spotLight
        position={[0, 6, 0]}
        angle={0.6}
        penumbra={1}
        intensity={1.5}
        color="#00ddff"
        target-position={[0, 1, 0]}
      />
      
      <spotLight
        position={[4, 2, 4]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.8}
        color="#0088cc"
        target-position={[0, 1, 0]}
      />
      
      <RealisticHuman />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        minDistance={2.5}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.2}
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
              Advanced Digital Human
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Witness the next evolution in human-digital interface technology with our photorealistic holographic avatar
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <div className="w-full h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
              <Canvas
                camera={{ position: [0, 2, 5], fov: 45 }}
                style={{ 
                  background: 'radial-gradient(ellipse at center, #001133 0%, #000611 70%, #000000 100%)' 
                }}
              >
                <Scene />
              </Canvas>
            </div>
            
            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Holographic projection active • Interactive 3D model
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-xs text-cyan-400 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
              Neural network visualization
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};
