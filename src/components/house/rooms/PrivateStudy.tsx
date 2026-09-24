"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import { createArchitecturalMaterials } from "@/theme/materials";

interface PrivateStudyProps {
  onOpenStudyModal: () => void;
}

export function PrivateStudy({
  onOpenStudyModal,
}: PrivateStudyProps) {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      walnutFloor: arch.studyFloor,
      darkConcreteWall: arch.ivoryWall,
      walnutWoodWall: arch.naturalWalnutWood,
      ceiling: arch.ceiling,
      deskWood: arch.naturalWalnutWood,
      deskMetalLeg: arch.brushedMetal,
      lampBrass: arch.lampBrass,
      lampLight: arch.warmCoveGlow,
      windowGlass: arch.galleryGlass,
      principlePlaque: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.35,
        metalness: 0.08,
      }),
      principleAccent: new THREE.MeshBasicMaterial({
        color: "#7c3aed",
      }),
      plantFoliage: arch.greenery,
      ceramicPot: new THREE.MeshStandardMaterial({
        color: "#f1ede6",
        roughness: 0.6,
        metalness: 0.05,
      }),
      groundingShadow: arch.groundingShadow,
    };
  }, []);

  const principles = [
    { step: "01", label: "BUILD", x: 4.4 },
    { step: "02", label: "THINK", x: 5.6 },
    { step: "03", label: "EXPLORE", x: 6.8 },
    { step: "04", label: "REFINE", x: 8.0 },
  ];

  return (
    <group name="room-05-private-study" position={[0, 0, 0]}>
      {/* 1. ROOM FLOOR */}
      {/* Width x: 2.9 to 9.5 (width 6.6, center 6.2), Depth z: -12.0 to -16.5 (depth 4.5, center -14.25) */}
      <mesh
        position={[6.2, 0.12, -14.25]}
        material={materials.walnutFloor}
        receiveShadow
      >
        <boxGeometry args={[6.6, 0.04, 4.5]} />
      </mesh>

      {/* 2. ROOM CEILING */}
      <mesh
        position={[6.2, 3.22, -14.25]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[6.6, 0.04, 4.5]} />
      </mesh>

      {/* 3. STUDY WALLS */}
      {/* North Wall (z: -12.02) */}
      <mesh
        position={[6.2, 1.67, -11.98]}
        material={materials.walnutWoodWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* South Wall (z: -16.52) — Wall for 4 Principles */}
      <mesh
        position={[6.2, 1.67, -16.52]}
        material={materials.darkConcreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[6.6, 3.1, 0.06]} />
      </mesh>

      {/* East Wall (x: 9.52) — Full-Height Garden Window */}
      <mesh
        position={[9.52, 1.67, -14.25]}
        material={materials.windowGlass}
      >
        <boxGeometry args={[0.04, 3.1, 4.5]} />
      </mesh>
      {/* Window mullions */}
      {[-15.5, -14.25, -13.0].map((zPos) => (
        <mesh key={zPos} position={[9.5, 1.67, zPos]} material={materials.deskMetalLeg}>
          <boxGeometry args={[0.06, 3.1, 0.04]} />
        </mesh>
      ))}

      {/* West Wall (x: 2.88) with Doorway Opening at z: -13.4 */}
      {/* North section: z: -12.0 to -12.8 (length 0.8, center -12.4) */}
      <mesh
        position={[2.88, 1.67, -12.4]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 0.8]} />
      </mesh>
      {/* South section: z: -14.0 to -16.5 (length 2.5, center -15.25) */}
      <mesh
        position={[2.88, 1.67, -15.25]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.5]} />
      </mesh>
      {/* Lintel header above Doorway (z: -13.4, width 1.2) */}
      <mesh
        position={[2.88, 2.85, -13.4]}
        material={materials.darkConcreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 0.74, 1.2]} />
      </mesh>

      {/* 4. ARCHITECTURAL DESK & WORKSTATION */}
      <group position={[6.2, 0.12, -14.1]}>
        {/* Grounding shadow strips under desk legs */}
        <mesh position={[-0.95, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.groundingShadow}>
          <planeGeometry args={[0.12, 0.9]} />
        </mesh>
        <mesh position={[0.95, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.groundingShadow}>
          <planeGeometry args={[0.12, 0.9]} />
        </mesh>

        {/* Cantilevered walnut desktop */}
        <mesh position={[0, 0.74, 0]} material={materials.deskWood} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.05, 0.9]} />
        </mesh>
        {/* Metal legs */}
        <mesh position={[-0.95, 0.37, 0]} material={materials.deskMetalLeg} castShadow>
          <boxGeometry args={[0.05, 0.74, 0.8]} />
        </mesh>
        <mesh position={[0.95, 0.37, 0]} material={materials.deskMetalLeg} castShadow>
          <boxGeometry args={[0.05, 0.74, 0.8]} />
        </mesh>

        {/* Minimalist Desk Lamp */}
        <group position={[0.75, 0.76, -0.2]}>
          <mesh material={materials.lampBrass}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          </mesh>
          <mesh position={[0, 0.22, 0]} material={materials.lampBrass}>
            <cylinderGeometry args={[0.01, 0.01, 0.44, 12]} />
          </mesh>
          <mesh position={[-0.1, 0.44, 0]} rotation={[0, 0, Math.PI / 6]} material={materials.lampBrass}>
            <coneGeometry args={[0.09, 0.14, 16]} />
          </mesh>
          <mesh position={[-0.1, 0.42, 0]} material={materials.lampLight}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>
        </group>

        {/* Notebook / Papers on Desk */}
        <mesh position={[-0.2, 0.77, 0]} rotation={[0, 0.1, 0]} material={materials.principlePlaque}>
          <boxGeometry args={[0.32, 0.01, 0.24]} />
        </mesh>
      </group>

      {/* 4b. Minimalist Ceramic Potted Plant beside Desk */}
      <group position={[4.6, 0.12, -14.1]}>
        {/* Contact shadow under pot */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.groundingShadow}>
          <circleGeometry args={[0.24, 16]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={materials.ceramicPot} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.17, 0.6, 16]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={materials.plantFoliage} castShadow>
          <sphereGeometry args={[0.26, 8, 8]} />
        </mesh>
        <mesh position={[0.08, 0.92, -0.05]} material={materials.plantFoliage} castShadow>
          <sphereGeometry args={[0.18, 8, 8]} />
        </mesh>
      </group>

      {/* 5. FOUR WALL PANELS: THE ENGINEERING PRINCIPLES */}
      {principles.map((p, idx) => {
        const isHovered = hoveredPrinciple === idx;
        return (
          <group
            key={p.label}
            position={[p.x, 1.6, -16.48]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredPrinciple(idx);
            }}
            onPointerOut={() => setHoveredPrinciple(null)}
            onClick={(e) => {
              e.stopPropagation();
              onOpenStudyModal();
            }}
          >
            {/* Panel Backplate */}
            <mesh material={materials.principlePlaque} castShadow receiveShadow>
              <boxGeometry args={[0.95, 1.4, 0.02]} />
            </mesh>

            {/* Glowing Accent Outline */}
            <mesh position={[0, 0, 0.012]}>
              <boxGeometry args={[0.92, 1.37, 0.002]} />
              <meshBasicMaterial color={isHovered ? "#7c3aed" : "#e2e8f0"} />
            </mesh>

            {/* Top Indicator Dot */}
            <mesh position={[-0.32, 0.52, 0.015]} material={materials.principleAccent}>
              <circleGeometry args={[0.025, 12]} />
            </mesh>

            {/* Step Index Line */}
            <mesh position={[0.05, 0.52, 0.015]}>
              <boxGeometry args={[0.55, 0.015, 0.002]} />
              <meshBasicMaterial color={isHovered ? "#7c3aed" : "#64748b"} />
            </mesh>

            {/* Principle Card Body Markings */}
            <mesh position={[0, 0.15, 0.015]}>
              <boxGeometry args={[0.7, 0.012, 0.002]} />
              <meshBasicMaterial color="#64748b" />
            </mesh>
            <mesh position={[0, -0.05, 0.015]}>
              <boxGeometry args={[0.7, 0.012, 0.002]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>
            <mesh position={[-0.1, -0.25, 0.015]}>
              <boxGeometry args={[0.5, 0.012, 0.002]} />
              <meshBasicMaterial color="#cbd5e1" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
