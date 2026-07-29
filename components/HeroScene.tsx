"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type BoxSpec = {
  position: [number, number, number];
  size: [number, number, number];
};

function WireframeBox({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  const edges = useMemo(() => {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    return new THREE.EdgesGeometry(geometry);
  }, [size]);

  return (
    <lineSegments position={position} geometry={edges}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.9} />
    </lineSegments>
  );
}

const STRUCTURE: BoxSpec[] = [
  { position: [0, -0.05, 0], size: [3.2, 0.08, 3.2] },
  { position: [0, 0.9, 0], size: [1.4, 1.8, 1.4] },
  { position: [0, 2.2, 0], size: [0.9, 0.7, 0.9] },
  { position: [0, 2.85, 0], size: [0.45, 0.5, 0.45] },
  { position: [-1.55, 0.55, 0], size: [1.0, 1.1, 1.2] },
  { position: [1.55, 0.55, 0], size: [1.0, 1.1, 1.2] },
  { position: [0, 0.55, -1.55], size: [1.8, 1.1, 0.9] },
  { position: [-1.55, 0.55, -1.1], size: [0.7, 0.9, 0.7] },
  { position: [1.55, 0.55, -1.1], size: [0.7, 0.9, 0.7] },
  { position: [0, 1.55, 0.75], size: [2.2, 0.06, 0.06] },
  { position: [0, 0.35, 0.75], size: [2.2, 0.06, 0.06] },
];

function ArchitecturalWireframe() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const scale = size.width < 640 ? 0.65 : size.width < 1024 ? 0.85 : 1;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.4, 0]}>
      {STRUCTURE.map((box, index) => (
        <WireframeBox
          key={index}
          position={box.position}
          size={box.size}
        />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 1.2, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        <ArchitecturalWireframe />
      </Canvas>
    </div>
  );
}
