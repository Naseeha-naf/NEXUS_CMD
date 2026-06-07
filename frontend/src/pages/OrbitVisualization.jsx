import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import axios from 'axios';

const Earth = () => {
  const earthRef = useRef();
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow Earth rotation
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      {/* Wireframe earth for a futuristic mission control feel instead of realistic textures */}
      <meshBasicMaterial color="#0B1020" />
      <meshStandardMaterial color="#00F0FF" wireframe={true} transparent opacity={0.3} />
    </mesh>
  );
};

const SatelliteObj = ({ data, radius, speed, angleOffset, color }) => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
      // Slight inclination for realism
      groupRef.current.position.y = Math.sin(t * 0.5) * (radius * 0.2); 
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
      <Html distanceFactor={15}>
        <div className="bg-spaceBlack border border-slateGray px-2 py-1 rounded text-[8px] font-orbitron text-white whitespace-nowrap opacity-80 select-none">
          {data.name}
        </div>
      </Html>
    </group>
  );
};

const OrbitVisualization = () => {
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    const fetchSats = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/satellites`, { headers: { 'x-auth-token': token } });
      setSatellites(res.data);
    };
    fetchSats();
  }, []);

  const getSatColor = (status) => {
    if (status === 'Active') return '#39FF14'; // neonGreen
    return '#FF003C'; // neonRed
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="border-b border-slateGray pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-white tracking-wider">ORBITAL VISUALIZATION</h2>
        <p className="text-gray-400 mt-1">Interactive 3D Constellation Tracker</p>
      </div>

      <div className="flex-1 bg-darkNavy border border-slateGray rounded-xl overflow-hidden relative min-h-[500px]">
        {/* Overlay UI */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="font-orbitron text-xs text-neonCyan mb-2 tracking-widest bg-spaceBlack bg-opacity-70 p-2 rounded">TRACKING {satellites.length} TARGETS</div>
        </div>
        
        <Canvas camera={{ position: [0, 2, 7], fov: 60 }}>
          <color attach="background" args={['#0B1020']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Earth />
          
          {satellites.map((sat, idx) => (
            <SatelliteObj 
              key={sat._id} 
              data={sat} 
              radius={3 + (idx * 0.8)} // Different orbit heights
              speed={0.5 - (idx * 0.1)} // Different speeds
              angleOffset={idx * (Math.PI * 2 / 3)} // Spaced out
              color={getSatColor(sat.status)} 
            />
          ))}

          <OrbitControls 
            enablePan={false}
            minDistance={3}
            maxDistance={15}
            autoRotate={false}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default OrbitVisualization;
