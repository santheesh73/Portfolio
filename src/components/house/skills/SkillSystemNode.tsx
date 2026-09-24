"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SkillGroupData } from "@/types";
import { createArchitecturalMaterials } from "@/theme/materials";

interface SkillSystemNodeProps {
  group: SkillGroupData;
  position: [number, number, number];
  rotation?: [number, number, number];
  accentColor?: string;
  onSelect: (group: SkillGroupData) => void;
  reducedMotion?: boolean;
}

export function SkillSystemNode({
  group,
  position,
  rotation = [0, 0, 0],
  accentColor = "#2dd4bf",
  onSelect,
  reducedMotion = false,
}: SkillSystemNodeProps) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      pedestal: arch.plinthBase,
      trim: arch.brushedMetal,
      telemetryPanel: arch.clearGlass,
      accentGlow: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      accentBright: new THREE.MeshBasicMaterial({
        color: accentColor,
      }),
    };
  }, [accentColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * (hovered ? 0.8 : 0.25);
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.48 : 0.22;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`skill-system-${group.id}`}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(group);
      }}
    >
      {/* 1. Technical Modular Rack / Pedestal */}
      <mesh
        material={materials.pedestal}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 0.9, 0.7]} />
      </mesh>

      {/* 2. Beveled Metallic Trim Edge */}
      <mesh material={materials.trim} position={[0, 0.91, 0]}>
        <boxGeometry args={[1.22, 0.02, 0.72]} />
      </mesh>

      {/* 3. Floating Telemetry Screen Plaque */}
      <group position={[0, 1.25, 0.05]} rotation={[-0.2, 0, 0]}>
        {/* Main Panel */}
        <mesh material={materials.telemetryPanel} castShadow>
          <boxGeometry args={[1.05, 0.6, 0.03]} />
        </mesh>

        {/* Emissive Frame Outline */}
        <mesh position={[0, 0, 0.02]} material={materials.accentGlow} ref={glowRef}>
          <planeGeometry args={[1.02, 0.58]} />
        </mesh>

        {/* Index & Status Indicator */}
        <mesh position={[-0.42, 0.2, 0.025]} material={materials.accentBright}>
          <circleGeometry args={[0.025, 12]} />
        </mesh>

        {/* System Category Hairline */}
        <mesh position={[0, -0.15, 0.025]}>
          <boxGeometry args={[0.8, 0.015, 0.002]} />
          <meshBasicMaterial color={hovered ? accentColor : "#64748b"} />
        </mesh>
      </group>

      {/* 4. Top Revolving Telemetry Rings */}
      <group position={[0, 1.7, 0]} ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.008, 12, 28]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.12, 0.006, 12, 24]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.45} />
        </mesh>
      </group>

      {/* 5. Floor Light Spill */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.accentGlow}
      >
        <planeGeometry args={[1.5, 1.0]} />
      </mesh>
    </group>
  );
}
