"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ExhibitionState, EXHIBIT_TRANSFORMS } from "@/types/exhibition";
import { ProjectDisplay } from "../projects/ProjectDisplay";
import { createArchitecturalMaterials } from "@/theme/materials";

interface ProjectStudioProps {
  selectedProject?: Project | null;
  exhibitionState?: ExhibitionState;
  onSelectProject: (project: Project) => void;
  onHoverProject?: (project: Project | null) => void;
  reducedMotion?: boolean;
}

export function ProjectStudio({
  selectedProject = null,
  exhibitionState = "IDLE",
  onSelectProject,
  onHoverProject,
  reducedMotion = false,
}: ProjectStudioProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      floor: arch.paleStoneFloor,
      concreteWall: arch.ivoryWall,
      woodAccentWall: arch.naturalWalnutWood,
      ceiling: arch.ceiling,
      galleryGlass: arch.galleryGlass,
      metalFrame: arch.darkMetalFrame,
      coveLight: arch.warmCoveGlow,
      plinthIlluminated: arch.plinthIlluminated,
      groundingShadow: arch.groundingShadow,
      trackLight: arch.trackLightBezel,
      trackLens: arch.trackLens,
    };
  }, []);

  // Split featured project (ORION) from secondary projects
  const featuredProject = useMemo(() => projects.find((p) => p.featured) || projects[0], []);
  const secondaryProjects = useMemo(() => projects.filter((p) => p.id !== featuredProject.id), [featuredProject]);

  return (
    <group name="room-02-project-studio" position={[0, 0, 0]}>
      {/* 1. ROOM FLOOR (Continuous Pale Limestone Exhibition Floor) */}
      {/* Width x: -0.5 to -8.5 (width 8.0), Depth z: -3.5 to -9.5 (depth 6.0), y: 0.12 */}
      <mesh
        position={[-4.5, 0.12, -6.5]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[8.0, 0.04, 6.0]} />
      </mesh>

      {/* 2. ROOM CEILING WITH RECESSED GALLERY LIGHTING & COVES */}
      <mesh
        position={[-4.5, 3.22, -6.5]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[8.0, 0.04, 6.0]} />
      </mesh>

      {/* Architectural Perimeter Cove Lighting (North & South soffits) */}
      <mesh position={[-4.5, 3.19, -9.42]} material={materials.coveLight}>
        <boxGeometry args={[7.8, 0.02, 0.06]} />
      </mesh>
      <mesh position={[-4.5, 3.19, -3.58]} material={materials.coveLight}>
        <boxGeometry args={[7.8, 0.02, 0.06]} />
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

      {/* 3. STUDIO GALLERY WALLS */}
      {/* North Exhibition Wall (z: -9.5) */}
      <mesh
        position={[-4.5, 1.67, -9.52]}
        material={materials.concreteWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.0, 3.1, 0.06]} />
      </mesh>

      {/* South Wall with Warm Walnut Paneling (z: -3.5) */}
      <mesh
        position={[-4.5, 1.67, -3.48]}
        material={materials.woodAccentWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8.0, 3.1, 0.06]} />
      </mesh>

      {/* West Wall: Floor-to-Ceiling Panoramic Glass Facade to Landscape (Reference Video 00:06-00:07) */}
      {/* Top lintel */}
      <mesh position={[-8.52, 3.0, -6.5]} material={materials.concreteWall} receiveShadow>
        <boxGeometry args={[0.06, 0.44, 6.0]} />
      </mesh>
      {/* Bottom sill */}
      <mesh position={[-8.52, 0.22, -6.5]} material={materials.concreteWall} receiveShadow>
        <boxGeometry args={[0.06, 0.2, 6.0]} />
      </mesh>
      {/* North jamb */}
      <mesh position={[-8.52, 1.67, -9.2]} material={materials.concreteWall} receiveShadow>
        <boxGeometry args={[0.06, 2.7, 0.6]} />
      </mesh>
      {/* South jamb */}
      <mesh position={[-8.52, 1.67, -3.8]} material={materials.concreteWall} receiveShadow>
        <boxGeometry args={[0.06, 2.7, 0.6]} />
      </mesh>

      {/* Panoramic Glass Pane */}
      <mesh position={[-8.52, 1.61, -6.5]} material={materials.galleryGlass}>
        <boxGeometry args={[0.02, 2.58, 4.8]} />
      </mesh>
      {/* Slim Dark Metal Mullions dividing the panoramic glass */}
      {[-7.7, -6.5, -5.3].map((zMullion) => (
        <mesh key={zMullion} position={[-8.52, 1.61, zMullion]} material={materials.metalFrame}>
          <boxGeometry args={[0.04, 2.6, 0.04]} />
        </mesh>
      ))}

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

      {/* 4. ILLUMINATED CENTERPIECE EXHIBITION PLINTH (Reference Video 00:06-00:07) */}
      <group position={[-4.5, 0.12, -6.5]}>
        {/* Soft grounding contact shadow */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.groundingShadow}>
          <planeGeometry args={[2.5, 2.5]} />
        </mesh>
        {/* Under-edge warm glowing illuminated reveal */}
        <mesh position={[0, 0.02, 0]} material={materials.plinthIlluminated}>
          <boxGeometry args={[2.1, 0.03, 2.1]} />
        </mesh>
        {/* Elevated pale limestone exhibition plinth base */}
        <mesh position={[0, 0.06, 0]} material={materials.floor} receiveShadow castShadow>
          <boxGeometry args={[2.0, 0.06, 2.0]} />
        </mesh>
      </group>

      {/* Featured Centerpiece Exhibit: ORION */}
      <ProjectDisplay
        project={featuredProject}
        position={EXHIBIT_TRANSFORMS.orion.position}
        rotation={EXHIBIT_TRANSFORMS.orion.rotation}
        isFeatured={true}
        isFocused={hoveredProjectId === featuredProject.id}
        exhibitionState={selectedProject?.id === featuredProject.id ? exhibitionState : undefined}
        isInspected={selectedProject?.id === featuredProject.id}
        isAnyInspected={selectedProject !== null}
        onFocusChange={(focused) => {
          setHoveredProjectId(focused ? featuredProject.id : null);
          onHoverProject?.(focused ? featuredProject : null);
        }}
        onSelect={onSelectProject}
        reducedMotion={reducedMotion}
      />

      {/* 5. SECONDARY PROJECT EXHIBITION PLATFORMS */}
      {secondaryProjects.map((project) => {
        const transform = EXHIBIT_TRANSFORMS[project.id] || {
          position: [-3.0, 0.14, -5.0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
        };
        return (
          <group key={project.id}>
            {/* Low architectural display platform disk */}
            <mesh
              position={[transform.position[0], 0.13, transform.position[2]]}
              material={materials.floor}
              receiveShadow
            >
              <cylinderGeometry args={[0.65, 0.7, 0.02, 24]} />
            </mesh>
            <ProjectDisplay
              project={project}
              position={transform.position}
              rotation={transform.rotation}
              isFeatured={false}
              isFocused={hoveredProjectId === project.id}
              exhibitionState={selectedProject?.id === project.id ? exhibitionState : undefined}
              isInspected={selectedProject?.id === project.id}
              isAnyInspected={selectedProject !== null}
              onFocusChange={(focused) => {
                setHoveredProjectId(focused ? project.id : null);
                onHoverProject?.(focused ? project : null);
              }}
              onSelect={onSelectProject}
              reducedMotion={reducedMotion}
            />
          </group>
        );
      })}
    </group>
  );
}
