"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { PROOF_HACKATHONS, PROOF_OPEN_SOURCE, PROOF_MILESTONES } from "@/data/proof";
import { ProofItem } from "@/types";
import { ProofDisplay } from "../proof/ProofDisplay";
import { createArchitecturalMaterials } from "@/theme/materials";

interface ArchiveRoomProps {
  onSelectProof: (item: ProofItem) => void;
  reducedMotion?: boolean;
}

export function ArchiveRoom({
  onSelectProof,
  reducedMotion = false,
}: ArchiveRoomProps) {
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      floor: arch.parchmentFloor,
      darkWall: arch.parchmentWall,
      woodAccent: arch.naturalOak,
      ceiling: arch.ceiling,
      shelfWood: arch.warmWalnut,
      timelineRail: new THREE.MeshBasicMaterial({
        color: "#b45309",
        transparent: true,
        opacity: 0.5,
      }),
      coveLight: arch.warmCoveGlow,
    };
  }, []);

  // Ordered sequence of verified proof items
  const timelineItems: ProofItem[] = useMemo(() => {
    return [
      PROOF_HACKATHONS[0],
      PROOF_MILESTONES[0],
      PROOF_MILESTONES[1],
      PROOF_MILESTONES[2],
      PROOF_OPEN_SOURCE,
    ].filter(Boolean);
  }, []);

  // Spatial positions for the 5 proof items
  const itemCoordinates: {
    pos: [number, number, number];
    rot: [number, number, number];
  }[] = [
    { pos: [-5.8, 1.45, -14.3], rot: [0, 0, 0] },          // OSDHack 2026
    { pos: [-3.8, 1.45, -14.3], rot: [0, 0, 0] },          // Thinking on-device
    { pos: [-1.8, 1.45, -14.3], rot: [0, 0, 0] },          // Inference-backed product
    { pos: [-5.8, 1.45, -9.7], rot: [0, Math.PI, 0] },     // Streaming-grade backend
    { pos: [-2.8, 1.45, -9.7], rot: [0, Math.PI, 0] },     // Building in public
  ];

  return (
    <group name="room-04-archive" position={[0, 0, 0]}>
      {/* 1. ROOM FLOOR */}
      {/* Width x: -0.5 to -7.5 (width 7.0, center -4.0), Depth z: -9.5 to -14.5 (depth 5.0, center -12.0) */}
      <mesh
        position={[-4.0, 0.12, -12.0]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[7.0, 0.04, 5.0]} />
      </mesh>

      {/* 2. ROOM CEILING */}
      <mesh
        position={[-4.0, 3.22, -12.0]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[7.0, 0.04, 5.0]} />
      </mesh>

      {/* Recessed Warm Ceiling Slot */}
      <group position={[-4.0, 3.2, -12.0]}>
        <mesh material={materials.coveLight}>
          <boxGeometry args={[5.8, 0.01, 0.08]} />
        </mesh>
      </group>

      {/* 3. ARCHIVE WALLS */}
      {/* North Wall (z: -14.52) */}
      <mesh
        position={[-4.0, 1.67, -14.52]}
        material={materials.woodAccent}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[7.0, 3.1, 0.06]} />
      </mesh>

      {/* South Wall (z: -9.48) */}
      <mesh
        position={[-4.0, 1.67, -9.48]}
        material={materials.darkWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[7.0, 3.1, 0.06]} />
      </mesh>

      {/* West Wall (x: -7.52) */}
      <mesh
        position={[-7.52, 1.67, -12.0]}
        material={materials.darkWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 5.0]} />
      </mesh>

      {/* East Wall (x: -0.48) with Doorway Opening at z: -11.0 */}
      {/* South section: z: -9.5 to -10.4 (length 0.9, center -9.95) */}
      <mesh
        position={[-0.48, 1.67, -9.95]}
        material={materials.darkWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 0.9]} />
      </mesh>
      {/* North section: z: -11.6 to -14.5 (length 2.9, center -13.05) */}
      <mesh
        position={[-0.48, 1.67, -13.05]}
        material={materials.darkWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.9]} />
      </mesh>
      {/* Lintel header above Doorway (z: -11.0, width 1.2) */}
      <mesh
        position={[-0.48, 2.85, -11.0]}
        material={materials.darkWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 0.74, 1.2]} />
      </mesh>

      {/* 4. ILLUMINATED ARCHITECTURAL TIMELINE RAIL */}
      {/* North Wall Timeline Rail */}
      <mesh position={[-3.8, 1.45, -14.42]} material={materials.timelineRail}>
        <boxGeometry args={[5.2, 0.015, 0.01]} />
      </mesh>
      {/* South Wall Timeline Rail */}
      <mesh position={[-4.3, 1.45, -9.58]} material={materials.timelineRail}>
        <boxGeometry args={[4.2, 0.015, 0.01]} />
      </mesh>

      {/* 5. ARCHIVAL DOCUMENT SHELVING (West Wall) */}
      <group position={[-7.2, 1.5, -12.0]}>
        {/* Main bookshelf case */}
        <mesh material={materials.shelfWood} castShadow receiveShadow>
          <boxGeometry args={[0.5, 2.6, 3.8]} />
        </mesh>
        {/* Three shelf dividers */}
        {[-0.8, -0.2, 0.4, 1.0].map((yOffset) => (
          <mesh key={yOffset} position={[0, yOffset, 0]} material={materials.darkWall}>
            <boxGeometry args={[0.52, 0.04, 3.76]} />
          </mesh>
        ))}
      </group>

      {/* 6. TIMELINE PROOF PLAQUES */}
      {timelineItems.map((item, idx) => {
        const layout = itemCoordinates[idx];
        if (!layout) return null;
        return (
          <ProofDisplay
            key={item.id}
            item={item}
            position={layout.pos}
            rotation={layout.rot}
            onSelect={onSelectProof}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
}
