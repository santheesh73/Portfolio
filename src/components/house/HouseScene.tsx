"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { Atmosphere } from "./Atmosphere";
import { HouseLighting } from "./HouseLighting";
import { InteriorLighting } from "./InteriorLighting";
import { Environment } from "./Environment";
import { ExteriorHouse } from "./ExteriorHouse";
import { Entrance } from "./Entrance";
import { Foyer } from "./Foyer";
import { Corridor } from "./Corridor";
import { ProjectStudio } from "./rooms/ProjectStudio";
import { EngineeringLab } from "./rooms/EngineeringLab";
import { RoomSystem } from "./RoomSystem";
import { RoomId } from "./SpatialNavigation";
import { Project, SkillGroupData } from "@/types";

interface HouseSceneProps {
  scrollProgress: number;
  doorOpenProgress: number;
  activeRoomId: RoomId;
  isEntranceHovered: boolean;
  onEntranceHoverChange: (hovered: boolean) => void;
  onDoorClick?: () => void;
  onSelectRoom?: (roomId: string) => void;
  onSelectProject: (project: Project) => void;
  onSelectSkill: (group: SkillGroupData) => void;
  onSceneReady: () => void;
  reducedMotion?: boolean;
}

export function HouseScene({
  scrollProgress,
  doorOpenProgress,
  activeRoomId,
  isEntranceHovered,
  onEntranceHoverChange,
  onDoorClick,
  onSelectRoom,
  onSelectProject,
  onSelectSkill,
  onSceneReady,
  reducedMotion = false,
}: HouseSceneProps) {
  return (
    <div className="relative h-full w-full bg-[#080a12]">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{
          fov: 42,
          near: 0.1,
          far: 65,
          position: [12.0, 5.2, 18.0],
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#080a12"));
          onSceneReady();
        }}
      >
        {/* Dynamic camera rig with cinematic inertia across exterior, foyer, and corridor */}
        <CameraRig
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Exterior blue-hour lighting */}
        <HouseLighting
          isEntranceHovered={isEntranceHovered}
          reducedMotion={reducedMotion}
        />

        {/* Interior warm lighting (foyer cove, corridor downlights) */}
        <InteriorLighting
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Environmental atmosphere, modulated distance fog, and subtle motes */}
        <Atmosphere
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Ground, modern staggered pavers, and framing trees */}
        <Environment />

        {/* Modern minimal architectural house exterior */}
        <ExteriorHouse />

        {/* Front door with physical pivot opening animation */}
        <Entrance
          isHovered={isEntranceHovered}
          onHoverChange={onEntranceHoverChange}
          doorOpenProgress={doorOpenProgress}
          onDoorClick={onDoorClick}
          reducedMotion={reducedMotion}
        />

        {/* Spatial Room System: Foyer, Corridor, Project Studio, Engineering Lab */}
        <RoomSystem activeRoomId={activeRoomId}>
          <Foyer />
          <Corridor
            onSelectRoom={onSelectRoom}
            reducedMotion={reducedMotion}
          />
          <ProjectStudio
            onSelectProject={onSelectProject}
            reducedMotion={reducedMotion}
          />
          <EngineeringLab
            onSelectSkill={onSelectSkill}
            reducedMotion={reducedMotion}
          />
        </RoomSystem>
      </Canvas>
    </div>
  );
}
