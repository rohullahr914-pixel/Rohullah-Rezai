"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Network() {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    let seed = 91;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let index = 0; index < 180; index += 1) {
      positions.push((random() - 0.5) * 7.5, (random() - 0.5) * 5.8, (random() - 0.5) * 4.5);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let index = 0; index < 48; index += 1) {
      const angle = (index / 48) * Math.PI * 2;
      const radius = 1.4 + (index % 4) * 0.32;
      positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, (index % 7 - 3) * 0.17);
      positions.push(Math.cos(angle + 0.38) * (radius + 0.32), Math.sin(angle + 0.38) * (radius + 0.26) * 0.72, (index % 5 - 2) * 0.2);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.13 - group.current.rotation.y) * Math.min(delta * 1.8, 1);
    group.current.rotation.x += (-pointer.y * 0.08 - group.current.rotation.x) * Math.min(delta * 1.8, 1);
    group.current.rotation.z += delta * 0.015;
    if (orbit.current) {
      orbit.current.rotation.y += delta * 0.12;
      orbit.current.rotation.x = Math.sin(performance.now() * 0.00016) * 0.18;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.52} />
      <pointLight position={[1.6, 2.2, 3.4]} intensity={18} color="#89eaff" distance={8} />
      <pointLight position={[-2.5, -1.6, 1.8]} intensity={10} color="#8a63ff" distance={7} />
      <points geometry={pointsGeometry}><pointsMaterial color="#a8f4e5" size={0.018} transparent opacity={0.66} sizeAttenuation depthWrite={false} /></points>
      <lineSegments geometry={linesGeometry}><lineBasicMaterial color="#8ed8cf" transparent opacity={0.13} depthWrite={false} /></lineSegments>
      <Float speed={0.36} rotationIntensity={0.09} floatIntensity={0.14}>
        <mesh position={[0.15, 0.05, 0.15]}>
          <icosahedronGeometry args={[0.77, 2]} />
          <meshPhysicalMaterial color="#7fe7ff" emissive="#4228bd" emissiveIntensity={0.22} metalness={0.62} roughness={0.2} clearcoat={0.9} transparent opacity={0.76} />
        </mesh>
        <mesh position={[0.15, 0.05, 0.15]}>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshBasicMaterial color="#adfae9" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
      <group ref={orbit} position={[0.15, 0.05, 0.15]}>
        <mesh rotation={[1.13, 0.12, -0.38]}><torusGeometry args={[1.24, 0.008, 8, 144]} /><meshBasicMaterial color="#58ddf5" transparent opacity={0.52} /></mesh>
        <mesh rotation={[0.45, -0.72, 0.96]}><torusGeometry args={[1.48, 0.006, 8, 144]} /><meshBasicMaterial color="#9e78ff" transparent opacity={0.39} /></mesh>
        <mesh position={[1.24, 0.04, 0]}><sphereGeometry args={[0.055, 16, 16]} /><meshBasicMaterial color="#e1fbff" /></mesh>
      </group>
      <Float speed={0.56} rotationIntensity={0.22} floatIntensity={0.18}>
        <mesh position={[-1.3, -0.74, 0.3]} rotation={[0.4, 0.2, 0.7]}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshBasicMaterial color="#ba9aff" wireframe transparent opacity={0.62} />
        </mesh>
      </Float>
      <Sparkles count={30} scale={[4.7, 3.8, 3.6]} size={1.8} speed={0.16} opacity={0.52} color="#a8f4e5" />
      <mesh position={[-1.25, 0.82, 0.38]}><sphereGeometry args={[0.035, 12, 12]} /><meshBasicMaterial color="#c7fff3" /></mesh>
      <mesh position={[1.42, -0.62, -0.3]}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#a1d8ff" /></mesh>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 54 }} dpr={[1, 1.35]} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
      <Network />
    </Canvas>
  );
}
