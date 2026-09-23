"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/types";

interface ProjectDisplayProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
  isFeatured?: boolean;
  onSelect: (project: Project) => void;
  reducedMotion?: boolean;
}

export function ProjectDisplay({
  project,
  position,
  rotation = [0, 0, 0],
  isFeatured = false,
  onSelect,
  reducedMotion = false,
}: ProjectDisplayProps) {
  const [hovered, setHovered] = useState(false);
  const glowPlaneRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      plinth: new THREE.MeshStandardMaterial({
        color: isFeatured ? "#1c2226" : "#1a1c20",
        roughness: 0.65,
        metalness: 0.2,
      }),
      trim: new THREE.MeshStandardMaterial({
        color: isFeatured ? "#2dd4bf" : "#64748b",
        roughness: 0.25,
        metalness: 0.8,
      }),
      glassPlaque: new THREE.MeshStandardMaterial({
        color: "#0a1017",
        roughness: 0.1,
        metalness: 0.7,
        transparent: true,
        opacity: 0.78,
      }),
      glowEmissive: new THREE.MeshBasicMaterial({
        color: isFeatured ? "#2dd4bf" : "#fbbf24",
        transparent: true,
        opacity: isFeatured ? 0.28 : 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      statusDot: new THREE.MeshBasicMaterial({
        color: isFeatured ? "#2dd4bf" : "#f59e0b",
      }),
    };
  }, [isFeatured]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (glowPlaneRef.current) {
      const mat = glowPlaneRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered
        ? (isFeatured ? 0.55 : 0.35)
        : (isFeatured ? 0.28 : 0.14);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }

    if (coreRef.current) {
      // Gentle micro-pulse for featured project
      if (isFeatured) {
        coreRef.current.rotation.y += delta * 0.4;
      }
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`project-display-${project.id}`}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
    >
      {/* 1. Base Pedestal / Workstation Plinth */}
      <mesh
        material={materials.plinth}
        position={[0, isFeatured ? 0.45 : 0.4, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={isFeatured ? [1.4, 0.9, 0.8] : [0.95, 0.8, 0.55]}
        />
      </mesh>

      {/* 2. Plinth Architectural Metal Accent Trim */}
      <mesh
        material={materials.trim}
        position={[0, isFeatured ? 0.91 : 0.81, 0]}
      >
        <boxGeometry
          args={isFeatured ? [1.42, 0.02, 0.82] : [0.97, 0.02, 0.57]}
        />
      </mesh>

      {/* 3. Angled Architectural Display Screen / Plaque */}
      <group
        position={[0, isFeatured ? 1.25 : 1.12, 0.05]}
        rotation={[-0.22, 0, 0]}
      >
        {/* Glass Screen */}
        <mesh material={materials.glassPlaque} castShadow>
          <boxGeometry
            args={isFeatured ? [1.25, 0.65, 0.04] : [0.85, 0.55, 0.03]}
          />
        </mesh>

        {/* Screen Edge Glow Frame */}
        <mesh position={[0, 0, 0.022]} material={materials.glowEmissive}>
          <planeGeometry
            args={isFeatured ? [1.22, 0.62] : [0.82, 0.52]}
          />
        </mesh>

        {/* Hover Highlight Plane */}
        <mesh
          ref={glowPlaneRef}
          position={[0, 0, 0.025]}
          material={materials.glowEmissive}
        >
          <planeGeometry
            args={isFeatured ? [1.24, 0.64] : [0.84, 0.54]}
          />
        </mesh>

        {/* Status Indicator Dot */}
        <mesh
          position={[isFeatured ? -0.52 : -0.34, isFeatured ? 0.22 : 0.18, 0.03]}
          material={materials.statusDot}
        >
          <circleGeometry args={[isFeatured ? 0.03 : 0.02, 16]} />
        </mesh>

        {/* Title Hairline Bar */}
        <mesh
          position={[0, isFeatured ? -0.18 : -0.15, 0.03]}
        >
          <boxGeometry
            args={isFeatured ? [0.9, 0.015, 0.002] : [0.6, 0.012, 0.002]}
          />
          <meshBasicMaterial
            color={hovered ? (isFeatured ? "#2dd4bf" : "#fbbf24") : "#475569"}
          />
        </mesh>
      </group>

      {/* 4. Featured ORION Special Architectural Indicator */}
      {isFeatured && (
        <group position={[0, 1.7, 0]} ref={coreRef}>
          {/* Subtle neural ring indicator */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.008, 12, 32]} />
            <meshBasicMaterial color="#2dd4bf" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.16, 0.006, 12, 24]} />
            <meshBasicMaterial color="#2dd4bf" transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* 5. Floor Accent Light Spill */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.glowEmissive}
      >
        <planeGeometry args={isFeatured ? [1.8, 1.2] : [1.2, 0.8]} />
      </mesh>
    </group>
  );
}
