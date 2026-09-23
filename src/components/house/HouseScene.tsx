"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { Atmosphere } from "./Atmosphere";
import { HouseLighting } from "./HouseLighting";
import { Environment } from "./Environment";
import { ExteriorHouse } from "./ExteriorHouse";
import { Entrance } from "./Entrance";

interface HouseSceneProps {
  scrollProgress: number;
  isEntranceHovered: boolean;
  onEntranceHoverChange: (hovered: boolean) => void;
  onSceneReady: () => void;
  reducedMotion?: boolean;
}

export function HouseScene({
  scrollProgress,
  isEntranceHovered,
  onEntranceHoverChange,
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
          far: 60,
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
          // Notify parent that WebGL context and shaders are ready
          onSceneReady();
        }}
      >
        {/* Dynamic camera rig with cinematic inertia */}
        <CameraRig
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* Cinematic blue-hour lighting */}
        <HouseLighting
          isEntranceHovered={isEntranceHovered}
          reducedMotion={reducedMotion}
        />

        {/* Environmental atmosphere, fog, and drifting motes */}
        <Atmosphere reducedMotion={reducedMotion} />

        {/* Ground, modern staggered pavers, and framing trees */}
        <Environment />

        {/* Modern minimal architectural house */}
        <ExteriorHouse />

        {/* Interactive front door and entrance porch */}
        <Entrance
          isHovered={isEntranceHovered}
          onHoverChange={onEntranceHoverChange}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
