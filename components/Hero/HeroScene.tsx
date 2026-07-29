"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type BoxSpec = {
  position: [number, number, number];
  size: [number, number, number];
};

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

function ShaderBox({
  position,
  size,
  mouse,
  time,
}: {
  position: [number, number, number];
  size: [number, number, number];
  mouse: React.MutableRefObject<[number, number]>;
  time: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#c9a962") },
      uColor2: { value: new THREE.Color("#f5f0e8") },
      uColor3: { value: new THREE.Color("#8a7a4a") },
    }),
    []
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time.current;
      materialRef.current.uniforms.uMouse.value.set(
        mouse.current[0],
        mouse.current[1]
      );
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uAmplitude;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave1 = sin(pos.x * 1.5 + pos.z * 1.2 + uTime * 0.4) * 0.04;
      float wave2 = sin(pos.x * 2.3 - pos.z * 1.8 + uTime * 0.6) * 0.03;
      float dist = distance(pos.xz, uMouse * 2.0);
      float mouseInf = exp(-dist * 2.0) * 0.12;
      float elevation = (wave1 + wave2) * uAmplitude + mouseInf;
      pos.y += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float n = sin(vUv.x * 10.0 + uTime * 0.4) * cos(vUv.y * 8.0 + uTime * 0.3) * 0.5 + 0.5;
      float eF = vElevation * 2.0 + 0.4;
      vec3 c = mix(mix(uColor1, uColor2, n), uColor3, eF);
      float g = 0.7 + 0.3 * abs(sin(vUv.x * 14.0 + vUv.y * 10.0 + uTime * 0.6));
      gl_FragColor = vec4(c * g, 0.85);
    }
  `;

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}

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
      <lineBasicMaterial color="#c9a962" transparent opacity={0.3} />
    </lineSegments>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef<[number, number]>([0, 0]);
  const time = useRef(0);
  const { size } = useThree();
  const scale = size.width < 640 ? 0.5 : size.width < 1024 ? 0.75 : 0.9;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    time.current += delta;
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[0, -0.5, 0]}
      onPointerMove={(e) => {
        mouse.current = [e.point.x, e.point.z];
      }}
    >
      {STRUCTURE.map((box, index) => (
        <group key={index}>
          <ShaderBox
            position={box.position}
            size={box.size}
            mouse={mouse}
            time={time}
          />
          <WireframeBox position={box.position} size={box.size} />
        </group>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
