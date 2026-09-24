"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProofItem } from "@/types";
import { createArchitecturalMaterials } from "@/theme/materials";

interface ProofDisplayProps {
  item: ProofItem;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (item: ProofItem) => void;
  reducedMotion?: boolean;
}

export function ProofDisplay({
  item,
  position,
  rotation = [0, 0, 0],
  onSelect,
  reducedMotion = false,
}: ProofDisplayProps) {
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Mesh>(null);

  const accentColor = useMemo(() => {
    switch (item.category) {
      case "hackathon":
        return "#2dd4bf"; // Teal
      case "open-source":
        return "#38bdf8"; // Cyan
      case "milestone":
      default:
        return "#f59e0b"; // Warm Amber
    }
  }, [item.category]);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      glassBackplate: arch.clearGlass,
      frame: arch.brushedMetal,
      glow: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      marker: new THREE.MeshBasicMaterial({
        color: accentColor,
      }),
      timelinePin: new THREE.MeshStandardMaterial({
        color: "#64748b",
        roughness: 0.3,
        metalness: 0.8,
      }),
    };
  }, [accentColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.45 : 0.18;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }

    if (markerRef.current) {
      const targetScale = hovered ? 1.25 : 1.0;
      markerRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6
      );
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`proof-display-${item.id}`}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      {/* 1. Timeline Pin / Connector to floor & wall rail */}
      <mesh position={[0, -0.4, -0.05]} material={materials.timelinePin}>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 12]} />
      </mesh>

      {/* 2. Frosted Glass Info Plaque */}
      <mesh material={materials.glassBackplate} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.75, 0.03]} />
      </mesh>

      {/* 3. Outer Frame Trim */}
      <mesh position={[0, 0, 0.005]} material={materials.frame}>
        <boxGeometry args={[1.32, 0.77, 0.02]} />
      </mesh>

      {/* 4. Emissive Border Hover Glow */}
      <mesh
        ref={glowRef}
        position={[0, 0, 0.02]}
        material={materials.glow}
      >
        <planeGeometry args={[1.28, 0.73]} />
      </mesh>

      {/* 5. Category Beacon Dot */}
      <mesh
        ref={markerRef}
        position={[-0.52, 0.25, 0.025]}
        material={materials.marker}
      >
        <circleGeometry args={[0.035, 16]} />
      </mesh>

      {/* 6. Timeline Milestone Header Bar */}
      <mesh position={[0.05, 0.25, 0.022]}>
        <boxGeometry args={[0.95, 0.02, 0.002]} />
        <meshBasicMaterial color={hovered ? accentColor : "#64748b"} />
      </mesh>

      {/* 7. Milestone Sub-rule */}
      <mesh position={[-0.1, 0.05, 0.022]}>
        <boxGeometry args={[0.65, 0.01, 0.002]} />
        <meshBasicMaterial color="#94a3b8" />
      </mesh>

      {/* 8. Floor Spot Spill */}
      <mesh
        position={[0, -0.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.glow}
      >
        <planeGeometry args={[0.9, 0.6]} />
      </mesh>
    </group>
  );
}
