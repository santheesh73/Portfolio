"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { CinematicHUD } from "./CinematicHUD";
import { LoadingScene } from "./LoadingScene";
import { HouseFallback } from "./HouseFallback";
import { profile } from "@/data/profile";

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

  // Contextual enter action: advances sequentially through the house
  const handleEnterClick = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollableDistance = rect.height - window.innerHeight;

    let targetRatio = 0.6; // Enter into Foyer
    if (scrollProgress >= 0.35 && scrollProgress < 0.7) {
      targetRatio = 0.88; // Enter Corridor Gallery
    } else if (scrollProgress >= 0.7) {
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
      aria-label="Santheesh's Digital House — Phase 2 Cinematic Spatial Experience"
      className="relative h-[380vh] w-full bg-[#080a12]"
    >
      {/* Accessible semantic content for screen readers & SEO */}
      <div className="sr-only">
        <h1>{profile.name} — AI Software Engineer</h1>
        <p>{profile.tagline}</p>
        <p>
          Welcome inside my digital residence. Phase 2 establishes the physical
          entrance, architectural foyer, and continuous gallery corridor.
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
              <button onClick={() => handleNavigateToRoom("corridor")}>
                Corridor Gallery
              </button>
            </li>
            <li>
              <a href="#identity-heading">Perspective & Engineering Identity</a>
            </li>
            <li>
              <a href="#projects">Selected Projects</a>
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
              if (rId === "exterior" || rId === "foyer" || rId === "corridor") {
                handleNavigateToRoom(rId as RoomId);
              }
            }}
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
      </div>
    </section>
  );
}
