"use client";

import { useMemo } from "react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectDisplay } from "../projects/ProjectDisplay";
import { createArchitecturalMaterials } from "@/theme/materials";

interface ProjectStudioProps {
  onSelectProject: (project: Project) => void;
  reducedMotion?: boolean;
}

export function ProjectStudio({
  onSelectProject,
  reducedMotion = false,
}: ProjectStudioProps) {
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      floor: arch.studioFloor,
      concreteWall: arch.ivoryWall,
      woodAccentWall: arch.warmWalnut,
      ceiling: arch.ceiling,
      trackLight: arch.trackLightBezel,
      trackLens: arch.trackLens,
    };
  }, []);

  // Split featured project (ORION) from secondary projects
  const featuredProject = useMemo(() => projects.find((p) => p.featured) || projects[0], []);
  const secondaryProjects = useMemo(() => projects.filter((p) => p.id !== featuredProject.id), [featuredProject]);

  // Spatial coordinates for secondary projects
  const secondaryPositions: {
    pos: [number, number, number];
    rot: [number, number, number];
  }[] = [
    { pos: [-2.4, 0, -4.8], rot: [0, Math.PI / 4, 0] },     // HeartTune
    { pos: [-2.4, 0, -7.8], rot: [0, (3 * Math.PI) / 4, 0] }, // NISF
    { pos: [-6.6, 0, -4.8], rot: [0, -Math.PI / 4, 0] },    // AHAL AI
    { pos: [-6.6, 0, -7.8], rot: [0, -(3 * Math.PI) / 4, 0] },// PRYSM
    { pos: [-4.5, 0, -4.4], rot: [0, 0, 0] },               // BHOOMI
    { pos: [-4.5, 0, -8.6], rot: [0, Math.PI, 0] },          // MINCHAL
  ];

  return (
    <group name="room-02-project-studio" position={[0, 0, 0]}>
      {/* 1. ROOM FLOOR */}
      {/* Width x: -0.5 to -8.5 (width 8.0), Depth z: -3.5 to -9.5 (depth 6.0), y: 0.12 */}
      <mesh
        position={[-4.5, 0.12, -6.5]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[8.0, 0.04, 6.0]} />
      </mesh>

      {/* 2. ROOM CEILING */}
      <mesh
        position={[-4.5, 3.22, -6.5]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[8.0, 0.04, 6.0]} />
      </mesh>

      {/* Architectural Ceiling Track Lighting Rails */}
      {[-5.0, -8.0].map((zPos, idx) => (
        <group key={idx} position={[-4.5, 3.19, zPos]}>
          <mesh material={materials.trackLight}>
            <boxGeometry args={[6.8, 0.03, 0.06]} />
          </mesh>
          {[-2.5, -1.0, 1.0, 2.5].map((xOffset) => (
            <mesh key={xOffset} position={[xOffset, -0.02, 0]} material={materials.trackLens}>
              <cylinderGeometry args={[0.03, 0.03, 0.015, 12]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. STUDIO WALLS */}
      {/* North Wall (z: -9.5) */}
      <mesh
        position={[-4.5, 1.67, -9.52]}
        material={materials.concreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.0, 3.1, 0.06]} />
      </mesh>

      {/* South Wall (z: -3.5) */}
      <mesh
        position={[-4.5, 1.67, -3.48]}
        material={materials.woodAccentWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.0, 3.1, 0.06]} />
      </mesh>

      {/* West Wall (x: -8.5) */}
      <mesh
        position={[-8.52, 1.67, -6.5]}
        material={materials.concreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 6.0]} />
      </mesh>

      {/* East Wall (x: -0.5) with Doorway Opening leading to Corridor */}
      {/* North section of east wall */}
      <mesh
        position={[-0.48, 1.67, -8.25]}
        material={materials.concreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.5]} />
      </mesh>
      {/* South section of east wall */}
      <mesh
        position={[-0.48, 1.67, -4.75]}
        material={materials.concreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 2.5]} />
      </mesh>
      {/* Lintel header above doorway */}
      <mesh
        position={[-0.48, 2.85, -6.5]}
        material={materials.concreteWall}
        receiveShadow
      >
        <boxGeometry args={[0.06, 0.74, 1.4]} />
      </mesh>

      {/* 3b. ARCHITECTURAL PRODUCT WORKBENCH (West wall display) */}
      <group position={[-8.1, 0.14, -6.5]}>
        {/* Floating natural timber tabletop */}
        <mesh position={[0, 0.72, 0]} material={materials.woodAccentWall} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.04, 3.2]} />
        </mesh>
        {/* Brushed aluminum legs */}
        <mesh position={[0, 0.36, -1.4]} material={materials.trackLight} castShadow>
          <boxGeometry args={[0.65, 0.72, 0.04]} />
        </mesh>
        <mesh position={[0, 0.36, 1.4]} material={materials.trackLight} castShadow>
          <boxGeometry args={[0.65, 0.72, 0.04]} />
        </mesh>
        {/* Minimal design prototype artifacts on workbench */}
        <mesh position={[0, 0.78, -0.6]} material={materials.concreteWall} castShadow>
          <boxGeometry args={[0.22, 0.08, 0.3]} />
        </mesh>
        <mesh position={[0, 0.79, 0.4]} material={materials.trackLight} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        </mesh>
      </group>

      {/* 3c. MINIMAL WALL SHELVING (West wall above workbench) */}
      <group position={[-8.38, 1.8, -6.5]}>
        <mesh material={materials.trackLight} castShadow>
          <boxGeometry args={[0.04, 0.8, 2.6]} />
        </mesh>
        <mesh position={[0.12, 0, 0]} material={materials.trackLight} castShadow>
          <boxGeometry args={[0.24, 0.02, 2.8]} />
        </mesh>
      </group>

      {/* 4. FEATURED CENTERPIECE: ORION */}
      <ProjectDisplay
        project={featuredProject}
        position={[-4.5, 0.14, -6.5]}
        rotation={[0, 0, 0]}
        isFeatured={true}
        onSelect={onSelectProject}
        reducedMotion={reducedMotion}
      />

      {/* 5. SECONDARY PROJECT DISPLAYS */}
      {secondaryProjects.map((project, idx) => {
        const layout = secondaryPositions[idx] || {
          pos: [-3.0 - idx * 0.8, 0, -5.0],
          rot: [0, 0, 0],
        };
        return (
          <ProjectDisplay
            key={project.id}
            project={project}
            position={[layout.pos[0], 0.14, layout.pos[2]]}
            rotation={layout.rot as [number, number, number]}
            isFeatured={false}
            onSelect={onSelectProject}
            reducedMotion={reducedMotion}
          />
        );
      })}
    </group>
  );
}
