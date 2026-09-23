"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { CinematicHUD } from "./CinematicHUD";
import { LoadingScene } from "./LoadingScene";
import { HouseFallback } from "./HouseFallback";
import { ProjectDetailModal } from "./projects/ProjectDetailModal";
import { SkillDetailModal } from "./skills/SkillDetailModal";
import { profile } from "@/data/profile";
import { Project, SkillGroupData } from "@/types";

import {
  RoomId,
  ROOM_WAYPOINTS,
  getActiveSpatialState,
} from "./SpatialNavigation";

// Dynamically import HouseScene to ensure strict client-side evaluation
const HouseScene = dynamic(
  () => import("./HouseScene").then((mod) => mod.HouseScene),
  { ssr: false }
);

// React 19 compliant browser capability store
function subscribeNoop() {
  return () => {};
}

let cachedWebGL: boolean | null = null;
function getWebGLSnapshot(): boolean {
  if (cachedWebGL === null) {
    try {
      const canvas = document.createElement("canvas");
      cachedWebGL = Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
      );
    } catch {
      cachedWebGL = false;
    }
  }
  return cachedWebGL;
}

function getWebGLServerSnapshot(): boolean {
  return true;
}

export function HouseExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const webglSupported = useSyncExternalStore(
    subscribeNoop,
    getWebGLSnapshot,
    getWebGLServerSnapshot
  );
  const [sceneReady, setSceneReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEntranceHovered, setIsEntranceHovered] = useState(false);

  // Selected interactive details for modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<SkillGroupData | null>(null);

  // Compute active spatial room and physical door opening progress
  const spatialState = getActiveSpatialState(scrollProgress);
  const doorOpenProgress = spatialState.doorOpenProgress;
  const activeRoomId = spatialState.roomId;

  // Scroll tracking across the full 380vh spatial track
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }

      const scrolledDistance = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolledDistance / totalScrollableDistance)
      );

      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Programmatic direct spatial navigation to specific waypoints
  const handleNavigateToRoom = useCallback(
    (targetRoomId: RoomId) => {
      if (!containerRef.current) return;
      const waypoint = ROOM_WAYPOINTS.find((w) => w.id === targetRoomId);
      if (!waypoint) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;
      const targetScrollY =
        window.scrollY + rect.top + totalScrollableDistance * waypoint.scrollTarget;

      window.scrollTo({
        top: targetScrollY,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce]
  );

  // Hash listener for deep-linking into specific 3D rooms (#projects, #stack, #lab, #foyer)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#projects" || hash === "#work") {
        handleNavigateToRoom("projects");
      } else if (hash === "#stack" || hash === "#skills" || hash === "#lab") {
        handleNavigateToRoom("lab");
      } else if (hash === "#foyer") {
        handleNavigateToRoom("foyer");
      } else if (hash === "#exterior") {
        handleNavigateToRoom("exterior");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleNavigateToRoom]);

  // Contextual enter action: advances sequentially through the house
  const handleEnterClick = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollableDistance = rect.height - window.innerHeight;

    let targetRatio = 0.32; // Enter into Foyer
    if (scrollProgress < 0.28) {
      targetRatio = 0.32; // Step into Foyer
    } else if (scrollProgress < 0.50) {
      targetRatio = 0.58; // Enter Project Studio
    } else if (scrollProgress < 0.78) {
      targetRatio = 0.85; // Enter Engineering Lab
    } else {
      // Transition to Identity Narrative
      const narrativeEl = document.getElementById("identity-heading");
      if (narrativeEl) {
        narrativeEl.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        return;
      }
      targetRatio = 1.0;
    }

    const targetScrollY =
      window.scrollY + rect.top + totalScrollableDistance * targetRatio;

    window.scrollTo({
      top: targetScrollY,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [scrollProgress, reduce]);

  // Click directly on front door swings it open and glides into foyer
  const handleDoorClick = useCallback(() => {
    handleNavigateToRoom("foyer");
  }, [handleNavigateToRoom]);

  // If WebGL is verified as unsupported, render graceful fallback
  if (webglSupported === false) {
    return <HouseFallback />;
  }

  return (
    <section
      ref={containerRef}
      id="house-experience"
      aria-label="Santheesh's Digital House — Cinematic Spatial Experience"
      className="relative h-[520vh] w-full bg-[#080a12]"
    >
      {/* Accessible semantic content for screen readers & SEO */}
      <div className="sr-only">
        <h1>{profile.name} — AI Software Engineer</h1>
        <p>{profile.tagline}</p>
        <p>
          Welcome inside my digital residence. Phase 3 establishes the Project
          Studio featuring live work, and the Engineering Lab displaying core technical skills.
          Current space: {spatialState.name} — {spatialState.subtitle}.
        </p>
        <nav aria-label="Spatial room destinations">
          <ul>
            <li>
              <button onClick={() => handleNavigateToRoom("exterior")}>
                Exterior Residence
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("foyer")}>
                Room 01: Foyer
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("projects")}>
                Room 02: Project Studio
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("lab")}>
                Room 03: Engineering Lab
              </button>
            </li>
            <li>
              <a href="#identity-heading">Perspective & Engineering Identity</a>
            </li>
            <li>
              <a href="#projects">Selected Projects</a>
            </li>
            <li>
              <a href="#stack">Technical Stack</a>
            </li>
            <li>
              <a href="#about">About & Philosophy</a>
            </li>
            <li>
              <a href="#contact">Contact & Communications</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sticky 100vh 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading Screen Preloader */}
        <LoadingScene isLoading={!sceneReady} />

        {/* 3D Scene Viewport */}
        {webglSupported && (
          <HouseScene
            scrollProgress={scrollProgress}
            doorOpenProgress={doorOpenProgress}
            activeRoomId={activeRoomId}
            isEntranceHovered={isEntranceHovered}
            onEntranceHoverChange={setIsEntranceHovered}
            onDoorClick={handleDoorClick}
            onSelectRoom={(rId) => {
              handleNavigateToRoom(rId as RoomId);
            }}
            onSelectProject={setSelectedProject}
            onSelectSkill={setSelectedSkillGroup}
            onSceneReady={() => setSceneReady(true)}
            reducedMotion={Boolean(reduce)}
          />
        )}

        {/* Spatial Cinematic HUD */}
        <CinematicHUD
          scrollProgress={scrollProgress}
          onNavigateToRoom={handleNavigateToRoom}
          onEnterClick={handleEnterClick}
        />

        {/* Interactive Modals */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <SkillDetailModal
          group={selectedSkillGroup}
          onClose={() => setSelectedSkillGroup(null)}
        />
      </div>
    </section>
  );
}
