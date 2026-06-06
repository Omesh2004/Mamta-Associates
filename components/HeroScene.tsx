"use client";

import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function MolecularDrop() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.006 + pointer.y * 0.002;
    meshRef.current.rotation.y += 0.01 + pointer.x * 0.003;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={meshRef} scale={[1.25, 1.55, 1.25]}>
        <icosahedronGeometry args={[1.6, 5]} />
        <MeshDistortMaterial
          color="#22C55E"
          distort={0.34}
          envMapIntensity={0.8}
          metalness={0.08}
          roughness={0.22}
          speed={1.8}
          transparent
          opacity={0.86}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 48 }}>
        <ambientLight intensity={1.8} />
        <directionalLight color="#ffffff" intensity={2.4} position={[3, 5, 4]} />
        <pointLight color="#8ff7bc" intensity={8} position={[-3, -2, 3]} />
        <MolecularDrop />
        <Sparkles color="#d4ffe6" count={42} scale={5} size={2.3} speed={0.35} />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
