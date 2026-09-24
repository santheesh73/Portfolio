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
import { ArchiveRoom } from "./rooms/ArchiveRoom";
import { PrivateStudy } from "./rooms/PrivateStudy";
import { ContactRoom } from "./rooms/ContactRoom";
import { RoomSystem } from "./RoomSystem";
import { RoomId } from "./SpatialNavigation";
import { Project, SkillGroupData, ProofItem } from "@/types";

interface HouseSceneProps {
  scrollProgress: number;
  doorOpenProgress: number;
  activeRoomId: RoomId;
  isEntranceHovered: boolean;
  onEntranceHoverChange: (hovered: boolean) => void;
  onDoorClick?: () => void;
  onSelectRoom?: (roomId: string) => void;
  onSelectProject: (project: Project) => void;
  onHoverProject?: (project: Project | null) => void;
  onSelectSkill: (group: SkillGroupData) => void;
  onSelectProof: (item: ProofItem) => void;
  onOpenStudyModal: () => void;
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
  onHoverProject,
  onSelectSkill,
  onSelectProof,
  onOpenStudyModal,
  onSceneReady,
  reducedMotion = false,
}: HouseSceneProps) {
  return (
    <div className="relative h-full w-full bg-[#F5F4EF] touch-pan-y">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
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
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color("#F5F4EF");
          gl.setClearColor(new THREE.Color("#F5F4EF"));
          onSceneReady();
        }}
      >
        {/* Architectural daylight background color */}
        <color attach="background" args={["#F5F4EF"]} />
        {/* Dynamic camera rig with cinematic inertia across full digital house */}
        <CameraRig
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Exterior blue-hour lighting */}
        <HouseLighting
          isEntranceHovered={isEntranceHovered}
          reducedMotion={reducedMotion}
        />

        {/* Interior multi-zone dynamic lighting */}
        <InteriorLighting
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Environmental atmosphere, modulated distance fog, and subtle motes */}
        <Atmosphere
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Ground, modern staggered pavers, framing trees, exterior house, and entrance */}
        <group visible={scrollProgress <= 0.35}>
          <Environment />
          <ExteriorHouse />
          <Entrance
            isHovered={isEntranceHovered}
            onHoverChange={onEntranceHoverChange}
            doorOpenProgress={doorOpenProgress}
            onDoorClick={onDoorClick}
            reducedMotion={reducedMotion}
          />
        </group>

        {/* Complete Spatial Room System: All 6 Rooms + Corridor with Visibility Culling */}
        <RoomSystem activeRoomId={activeRoomId}>
          <group visible={scrollProgress <= 0.48}>
            <Foyer />
          </group>
          <group visible={scrollProgress >= 0.15 && scrollProgress <= 0.98}>
            <Corridor
              scrollProgress={scrollProgress}
              onSelectRoom={onSelectRoom}
              reducedMotion={reducedMotion}
            />
          </group>
          <group visible={scrollProgress >= 0.18 && scrollProgress <= 0.62}>
            <ProjectStudio
              onSelectProject={onSelectProject}
              onHoverProject={onHoverProject}
              reducedMotion={reducedMotion}
            />
          </group>
          <group visible={scrollProgress >= 0.28 && scrollProgress <= 0.76}>
            <EngineeringLab
              onSelectSkill={onSelectSkill}
              reducedMotion={reducedMotion}
            />
          </group>
          <group visible={scrollProgress >= 0.42 && scrollProgress <= 0.9}>
            <ArchiveRoom
              onSelectProof={onSelectProof}
              reducedMotion={reducedMotion}
            />
          </group>
          <group visible={scrollProgress >= 0.56 && scrollProgress <= 0.98}>
            <PrivateStudy
              onOpenStudyModal={onOpenStudyModal}
            />
          </group>
          <group visible={scrollProgress >= 0.72}>
            <ContactRoom
              scrollProgress={scrollProgress}
              reducedMotion={reducedMotion}
            />
          </group>
        </RoomSystem>
      </Canvas>
    </div>
  );
}
