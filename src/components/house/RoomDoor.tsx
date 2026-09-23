"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoomDoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  index: string;
  title: string;
  subtitle: string;
  isUnlocked?: boolean;
  onSelect?: () => void;
  reducedMotion?: boolean;
}

export function RoomDoor({
  position,
  rotation = [0, 0, 0],
  index,
  title,
  subtitle,
  isUnlocked = false,
  onSelect,
  reducedMotion = false,
}: RoomDoorProps) {
  const [hovered, setHovered] = useState(false);
  const glowPlaneRef = useRef<THREE.Mesh>(null);
  const doorPanelRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      frame: new THREE.MeshStandardMaterial({
        color: "#121418",
        roughness: 0.35,
        metalness: 0.75,
      }),
      doorPanel: new THREE.MeshStandardMaterial({
        color: "#2a221b",
        roughness: 0.55,
        metalness: 0.08,
      }),
      doorTrim: new THREE.MeshStandardMaterial({
        color: "#1a1c22",
        roughness: 0.4,
        metalness: 0.6,
      }),
      handle: new THREE.MeshStandardMaterial({
        color: "#cbd5e1",
        roughness: 0.2,
        metalness: 0.9,
      }),
      lightSpill: new THREE.MeshBasicMaterial({
        color: "#fbbf24",
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      signPlaque: new THREE.MeshStandardMaterial({
        color: "#181a20",
        roughness: 0.4,
        metalness: 0.5,
      }),
      textAmber: new THREE.MeshBasicMaterial({
        color: "#fbbf24",
      }),
    };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (glowPlaneRef.current) {
      const mat = glowPlaneRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.35 : 0.12;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }

    if (doorPanelRef.current) {
      const mat = doorPanelRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = hovered ? new THREE.Color("#362b22") : new THREE.Color("#2a221b");
      mat.color.lerp(targetColor, delta * 6);
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`room-door-${index}-${title.toLowerCase()}`}
      userData={{ title, subtitle }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect();
      }}
    >
      {/* 1. Recessed Architectural Door Frame */}
      <mesh material={materials.frame} position={[0, 1.3, 0]} receiveShadow>
        <boxGeometry args={[1.36, 2.52, 0.12]} />
      </mesh>

      {/* 2. Door Panel (Flush dark architectural wood/charcoal) */}
      <mesh
        ref={doorPanelRef}
        material={materials.doorPanel}
        position={[0, 1.28, 0.02]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 2.38, 0.06]} />
      </mesh>

      {/* 3. Minimalist Brushed Metal Lever Handle */}
      <group position={[0.46, 1.15, 0.07]}>
        {/* Rosette */}
        <mesh material={materials.doorTrim}>
          <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
        </mesh>
        {/* Horizontal Lever */}
        <mesh
          position={[-0.06, 0, 0.02]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.handle}
          castShadow
        >
          <cylinderGeometry args={[0.012, 0.012, 0.14, 12]} />
        </mesh>
      </group>

      {/* 4. Floor Gap Warm Light Leakage (Illuminates corridor baseboard) */}
      <mesh
        position={[0, 0.04, 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.lightSpill}
      >
        <planeGeometry args={[1.25, 0.45]} />
      </mesh>

      {/* 5. Hover Highlight Glow Plane */}
      <mesh
        ref={glowPlaneRef}
        position={[0, 1.28, 0.06]}
        material={materials.lightSpill}
      >
        <planeGeometry args={[1.28, 2.42]} />
      </mesh>

      {/* 6. Architectural Signage Plaque beside door */}
      <group position={[-0.82, 1.6, 0.04]}>
        {/* Plaque backplate */}
        <mesh material={materials.signPlaque} receiveShadow>
          <boxGeometry args={[0.26, 0.38, 0.02]} />
        </mesh>
        {/* Plaque border hairline */}
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.24, 0.36, 0.002]} />
          <meshBasicMaterial color={hovered ? "#fbbf24" : "#475569"} />
        </mesh>
        {/* Index indicator block */}
        <mesh position={[0, 0.08, 0.016]}>
          <boxGeometry args={[0.16, 0.08, 0.002]} />
          <meshBasicMaterial color={isUnlocked ? "#2dd4bf" : "#f59e0b"} />
        </mesh>
        {/* Status dot */}
        <mesh position={[0, -0.09, 0.016]}>
          <circleGeometry args={[0.02, 12]} />
          <meshBasicMaterial color={isUnlocked ? "#2dd4bf" : "#64748b"} />
        </mesh>
      </group>
    </group>
  );
}
