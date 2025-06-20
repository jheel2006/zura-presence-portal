
import { useEffect, useRef } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';
import * as THREE from 'three';

export const ThreeDHuman = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(2, 4, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4444ff, 0.5);
    fillLight.position.set(-2, 2, -2);
    scene.add(fillLight);

    // Create a realistic human-like figure using basic geometries
    const humanGroup = new THREE.Group();

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00aaff,
      emissive: 0x001122,
      transparent: true,
      opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    humanGroup.add(head);

    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.8, 16);
    const torsoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0088dd,
      emissive: 0x001122,
      transparent: true,
      opacity: 0.8
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 0.8;
    humanGroup.add(torso);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.6, 12);
    const armMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0099ee,
      emissive: 0x001122,
      transparent: true,
      opacity: 0.8
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.45, 0.8, 0);
    leftArm.rotation.z = 0.3;
    humanGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.45, 0.8, 0);
    rightArm.rotation.z = -0.3;
    humanGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.8, 12);
    const legMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0077cc,
      emissive: 0x001122,
      transparent: true,
      opacity: 0.8
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, -0.2, 0);
    humanGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, -0.2, 0);
    humanGroup.add(rightLeg);

    scene.add(humanGroup);

    // Mouse controls for rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      humanGroup.rotation.y += deltaX * 0.01;
      humanGroup.rotation.x += deltaY * 0.01;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isMouseDown) {
        humanGroup.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, []);

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
              Experience the future of human-digital interaction with our photorealistic 3D avatar technology
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <div 
              ref={mountRef}
              className="w-full h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 shadow-2xl"
              style={{ cursor: 'grab' }}
            />
            
            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                3D Avatar Active • Click and drag to rotate
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-xs text-cyan-400 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
              Neural interface online
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};
