"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import { SKILL_GROUPS } from "@/data/skills";
import { SkillGroupData } from "@/types";
import { TechExhibitInstallation } from "../skills/TechExhibitInstallation";
import { createArchitecturalMaterials } from "@/theme/materials";

interface EngineeringLabProps {
  onSelectSkill: (group: SkillGroupData) => void;
  reducedMotion?: boolean;
}

export function EngineeringLab({
  onSelectSkill,
  reducedMotion = false,
}: EngineeringLabProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      floor: arch.technicalTerrazzo,
      stoneFloor: arch.paleStoneFloor,
      wall: arch.coolWall,
      steelPanel: arch.brushedMetal,
      ceiling: arch.ceiling,
      galleryGlass: arch.galleryGlass,
      metalFrame: arch.darkMetalFrame,
      conduit: new THREE.MeshStandardMaterial({
        color: "#94a3b8",
        roughness: 0.3,
        metalness: 0.85,
      }),
      luminaireCyan: new THREE.MeshBasicMaterial({
        color: "#0d9488",
      }),
      benchSurface: new THREE.MeshStandardMaterial({
        color: "#f1f5f9",
        roughness: 0.25,
        metalness: 0.35,
      }),
      floorMarking: new THREE.MeshBasicMaterial({
        color: "#cbd5e1",
        transparent: true,
        opacity: 0.6,
      }),
    };
  }, []);

  // Map accents to the 4 skill groups (AI: Teal, Frontend: Azure Blue, Backend: Amber, Infra: Violet)
  const nodeConfigs: {
    id: 'ai' | 'frontend' | 'backend' | 'data-infra';
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
      {/* 1. ROOM FLOOR (Technical Terrazzo with Precision Aluminum Inlay Grid) */}
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

      {/* Floor zone markings & Conduit Connections */}
      <group position={[6.2, 0.142, -9.0]}>
        {/* Central connecting lines */}
        <mesh material={materials.conduit} position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.002, 0.02]} />
        </mesh>
        <mesh material={materials.conduit} position={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.002, 2.8]} />
        </mesh>
        <mesh material={materials.conduit} position={[-1.2, 0, 1.4]} rotation={[0, Math.PI/4, 0]}>
           <boxGeometry args={[0.5, 0.002, 0.02]} />
        </mesh>
        <mesh material={materials.conduit} position={[1.2, 0, 1.4]} rotation={[0, -Math.PI/4, 0]}>
           <boxGeometry args={[0.5, 0.002, 0.02]} />
        </mesh>
        <mesh material={materials.conduit} position={[-1.2, 0, -1.4]} rotation={[0, -Math.PI/4, 0]}>
           <boxGeometry args={[0.5, 0.002, 0.02]} />
        </mesh>
        <mesh material={materials.conduit} position={[1.2, 0, -1.4]} rotation={[0, Math.PI/4, 0]}>
           <boxGeometry args={[0.5, 0.002, 0.02]} />
        </mesh>
        
        {/* Category specific floor markings */}
        <mesh position={[-1.2, 0, 1.4]} rotation={[-Math.PI/2, 0, 0]} material={materials.floorMarking}>
          <ringGeometry args={[0.5, 0.52, 32]} />
        </mesh>
        <mesh position={[1.2, 0, 1.4]} rotation={[-Math.PI/2, 0, 0]} material={materials.floorMarking}>
          <ringGeometry args={[0.5, 0.52, 32]} />
        </mesh>
        <mesh position={[-1.2, 0, -1.4]} rotation={[-Math.PI/2, 0, 0]} material={materials.floorMarking}>
          <ringGeometry args={[0.5, 0.52, 32]} />
        </mesh>
        <mesh position={[1.2, 0, -1.4]} rotation={[-Math.PI/2, 0, 0]} material={materials.floorMarking}>
          <ringGeometry args={[0.5, 0.52, 32]} />
        </mesh>
      </group>

      {/* 2. ROOM CEILING */}
      <mesh
        position={[6.2, 3.22, -9.0]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[6.6, 0.04, 6.0]} />
      </mesh>

      {/* Ceiling Architectural Trays & Cyan Luminaire Spine */}
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
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* South Wall with Brushed Architectural Steel Panels (z: -5.98) */}
      <mesh
        position={[6.2, 1.67, -5.98]}
        material={materials.steelPanel}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* East Wall (x: 9.52) with High Architectural Ribbon Clerestory Window */}
      <mesh
        position={[9.52, 1.3, -9.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 2.36, 6.0]} />
      </mesh>
      {/* Clerestory ribbon window glass */}
      <mesh position={[9.52, 2.75, -9.0]} material={materials.galleryGlass}>
        <boxGeometry args={[0.02, 0.7, 5.6]} />
      </mesh>
      {/* Top lintel above clerestory */}
      <mesh position={[9.52, 3.15, -9.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[0.06, 0.14, 6.0]} />
      </mesh>

      {/* West Wall (x: 2.88) with Doorway Opening at z: -8.6 & Glass Sidelight Partition */}
      {/* South section: Floor-to-ceiling Glass Gallery Partition looking into corridor */}
      <mesh position={[2.88, 1.55, -7.0]} material={materials.galleryGlass}>
        <boxGeometry args={[0.02, 2.6, 1.8]} />
      </mesh>
      <mesh position={[2.88, 2.95, -7.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[0.06, 0.34, 2.0]} />
      </mesh>
      <mesh position={[2.88, 0.18, -7.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[0.06, 0.12, 2.0]} />
      </mesh>

      {/* North section: Solid architectural drywall (z: -9.2 to -12.0) */}
      <mesh
        position={[2.88, 1.67, -10.6]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.8]} />
      </mesh>
      {/* Lintel header above doorway */}
      <mesh
        position={[2.88, 2.85, -8.6]}
        material={materials.wall}
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
        {/* Exhibition signage / glass plate on bench */}
        <mesh position={[0, 0.75, 0]} rotation={[-Math.PI / 4, 0, 0]} material={materials.galleryGlass} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
        </mesh>
        <mesh position={[0, 0.75, 0.01]} rotation={[-Math.PI / 4, 0, 0]} material={materials.conduit}>
           <boxGeometry args={[0.5, 0.02, 0.02]} />
        </mesh>
        <mesh position={[0, 0.55, -0.1]} material={materials.metalFrame}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        </mesh>
        {/* Subtle AI technical core central indicator ring */}
        <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.008, 12, 32]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* 5. SKILL TELEMETRY NODES (4 GROUPS) */}
      {nodeConfigs.map((config) => {
        const group = SKILL_GROUPS.find((g) => g.id === config.id);
        if (!group) return null;
        return (
          <TechExhibitInstallation
            key={group.id}
            group={group}
            categoryId={config.id}
            position={config.pos}
            rotation={config.rot}
            accentColor={config.accent}
            isFocused={hoveredNodeId === group.id}
            isAnyFocused={hoveredNodeId !== null}
            onFocusChange={(focused) => setHoveredNodeId(focused ? group.id : null)}
            onSelect={onSelectSkill}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
}
