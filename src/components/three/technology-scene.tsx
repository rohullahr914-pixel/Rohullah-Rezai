"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const nodes: [number, number, number][] = [
  [-2.8, 0.7, -0.2], [-2.1, 1.3, 0.1], [-1.7, 0.25, 0.3], [-1.2, -0.65, -0.1], [-0.7, 0.95, -0.2],
  [-0.1, 0.1, 0.3], [0.35, 1.25, 0], [0.8, -0.9, -0.2], [1.25, 0.45, 0.1], [1.7, -0.05, -0.25],
  [2.15, 0.95, 0], [2.75, 0.25, -0.2], [-2.4, -0.7, -0.3], [-0.7, -1.25, 0.25], [1.85, -1.1, 0.2],
];

function TechnologyNetwork() {
  const group = useRef<THREE.Group>(null);
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(nodes.flat(), 3));
    return geometry;
  }, []);
  const linksGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const links = [[0, 1], [1, 2], [1, 4], [2, 3], [2, 5], [3, 12], [4, 5], [4, 6], [5, 7], [5, 8], [6, 8], [7, 9], [7, 13], [8, 9], [8, 10], [9, 14], [10, 11], [10, 14], [12, 3], [13, 8]];
    const positions = links.flatMap(([from, to]) => [...nodes[from], ...nodes[to]]);
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.12 - group.current.rotation.y) * Math.min(delta * 1.4, 1);
    group.current.rotation.x += (-pointer.y * 0.07 - group.current.rotation.x) * Math.min(delta * 1.4, 1);
    group.current.rotation.z += delta * 0.008;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={linksGeometry}><lineBasicMaterial color="#a1d8ce" transparent opacity={0.23} depthWrite={false} /></lineSegments>
      <points geometry={pointsGeometry}><pointsMaterial color="#b3f8e9" size={0.05} transparent opacity={0.84} sizeAttenuation depthWrite={false} /></points>
      {nodes.filter((_, index) => index % 3 === 0).map((node, index) => <Float key={index} speed={0.6 + index * 0.08} floatIntensity={0.15} rotationIntensity={0.05}><mesh position={node}><icosahedronGeometry args={[0.11, 1]} /><meshBasicMaterial color="#94e3da" wireframe transparent opacity={0.72} /></mesh></Float>)}
    </group>
  );
}

export default function TechnologyScene({ active }: { active: boolean }) {
  return <Canvas camera={{ position: [0, 0, 6.8], fov: 48 }} dpr={[1, 1.25]} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}><TechnologyNetwork /></Canvas>;
}
