"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { SKILL_GROUPS } from "@/data/skills";
import { SkillGroupData } from "@/types";
import { SkillSystemNode } from "../skills/SkillSystemNode";

interface EngineeringLabProps {
  onSelectSkill: (group: SkillGroupData) => void;
  reducedMotion?: boolean;
}

export function EngineeringLab({
  onSelectSkill,
  reducedMotion = false,
}: EngineeringLabProps) {
  const materials = useMemo(() => {
    return {
      floor: new THREE.MeshStandardMaterial({
        color: "#e4e6eb",
        roughness: 0.45,
        metalness: 0.2,
      }),
      darkConcreteWall: new THREE.MeshStandardMaterial({
        color: "#f1f3f7",
        roughness: 0.85,
        metalness: 0.05,
      }),
      steelPanel: new THREE.MeshStandardMaterial({
        color: "#cbd5e1",
        roughness: 0.35,
        metalness: 0.75,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: "#faf9f6",
        roughness: 0.95,
        metalness: 0.02,
      }),
      conduit: new THREE.MeshStandardMaterial({
        color: "#94a3b8",
        roughness: 0.3,
        metalness: 0.85,
      }),
      luminaireCyan: new THREE.MeshBasicMaterial({
        color: "#0d9488",
      }),
      benchSurface: new THREE.MeshStandardMaterial({
        color: "#e2e8f0",
        roughness: 0.25,
        metalness: 0.3,
      }),
    };
  }, []);

  // Map accents to the 4 skill groups (AI: Teal, Frontend: Azure Blue, Backend: Amber, Infra: Violet)
  const nodeConfigs: {
    id: string;
    accent: string;
    pos: [number, number, number];
    rot: [number, number, number];
  }[] = [
    { id: "ai", accent: "#0d9488", pos: [5.0, 0.12, -7.6], rot: [0, Math.PI / 6, 0] },
    { id: "frontend", accent: "#0284c7", pos: [7.4, 0.12, -7.6], rot: [0, -Math.PI / 6, 0] },
    { id: "backend", accent: "#d97706", pos: [5.0, 0.12, -10.4], rot: [0, (5 * Math.PI) / 6, 0] },
    { id: "data-infra", accent: "#7c3aed", pos: [7.4, 0.12, -10.4], rot: [0, -(5 * Math.PI) / 6, 0] },
  ];

  return (
    <group name="room-03-engineering-lab" position={[0, 0, 0]}>
      {/* 1. ROOM FLOOR */}
      {/* Width x: 2.9 to 9.5 (width 6.6, center x: 6.2), Depth z: -6.0 to -12.0 (depth 6.0, center z: -9.0) */}
      <mesh
        position={[6.2, 0.12, -9.0]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[6.6, 0.04, 6.0]} />
      </mesh>

      {/* Laboratory floor grid inlays (Precision architectural aluminum joint lines) */}
      {[-11.0, -10.0, -9.0, -8.0, -7.0].map((zPos) => (
        <mesh key={zPos} position={[6.2, 0.141, zPos]}>
          <boxGeometry args={[6.4, 0.002, 0.015]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
        </mesh>
      ))}

      {/* 2. ROOM CEILING */}
      <mesh
        position={[6.2, 3.22, -9.0]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[6.6, 0.04, 6.0]} />
      </mesh>

      {/* Ceiling Conduits and Industrial Trays */}
      <group position={[6.2, 3.12, -9.0]}>
        <mesh material={materials.conduit}>
          <boxGeometry args={[6.2, 0.06, 0.14]} />
        </mesh>
        <mesh position={[0, -0.04, 0]} material={materials.luminaireCyan}>
          <boxGeometry args={[5.8, 0.01, 0.04]} />
        </mesh>
      </group>

      {/* 3. LABORATORY WALLS */}
      {/* North Wall (z: -12.02) */}
      <mesh
        position={[6.2, 1.67, -12.02]}
        material={materials.darkConcreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* South Wall (z: -5.98) */}
      <mesh
        position={[6.2, 1.67, -5.98]}
        material={materials.steelPanel}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* East Wall (x: 9.52) */}
      <mesh
        position={[9.52, 1.67, -9.0]}
        material={materials.darkConcreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 6.0]} />
      </mesh>

      {/* West Wall (x: 2.88) with Doorway Opening at z: -8.6 */}
      {/* South section: z: -6.0 to -8.0 (length 2.0, center z: -7.0) */}
      <mesh
        position={[2.88, 1.67, -7.0]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.0]} />
      </mesh>
      {/* North section: z: -9.2 to -12.0 (length 2.8, center z: -10.6) */}
      <mesh
        position={[2.88, 1.67, -10.6]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.8]} />
      </mesh>
      {/* Lintel header above doorway */}
      <mesh
        position={[2.88, 2.85, -8.6]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 0.74, 1.2]} />
      </mesh>

      {/* 4. CENTRAL TELEMETRY CORE BENCH */}
      <group position={[6.2, 0.12, -9.0]}>
        <mesh position={[0, 0.25, 0]} material={materials.benchSurface} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.8, 0.5, 8]} />
        </mesh>
        <mesh position={[0, 0.51, 0]} material={materials.luminaireCyan}>
          <cylinderGeometry args={[0.62, 0.62, 0.02, 8]} />
        </mesh>
        {/* Subtle AI technical core central indicator ring */}
        <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.008, 12, 32]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* 5. SKILL TELEMETRY NODES (4 GROUPS) */}
      {nodeConfigs.map((config) => {
        const group = SKILL_GROUPS.find((g) => g.id === config.id);
        if (!group) return null;
        return (
          <SkillSystemNode
            key={group.id}
            group={group}
            position={config.pos}
            rotation={config.rot}
            accentColor={config.accent}
            onSelect={onSelectSkill}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
}
