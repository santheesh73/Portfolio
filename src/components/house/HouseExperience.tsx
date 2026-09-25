"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { CinematicHUD } from "./CinematicHUD";
import { LoadingScene } from "./LoadingScene";
import { HouseFallback } from "./HouseFallback";
import { HouseErrorBoundary } from "./HouseErrorBoundary";
import { ProjectDetailModal } from "./projects/ProjectDetailModal";
import { SkillDetailModal } from "./skills/SkillDetailModal";
import { ProofDetailModal } from "./proof/ProofDetailModal";
import { StudyDetailModal } from "./about/StudyDetailModal";
import { FinalExitOverlay } from "./FinalExitOverlay";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { PROOF_HACKATHONS, PROOF_MILESTONES, PROOF_OPEN_SOURCE } from "@/data/proof";
import { Project, SkillGroupData, ProofItem, ExhibitionState } from "@/types";
import { useTheme } from "@/theme/ThemeContext";

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

  // Selected interactive details for modals & spatial focus
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [exhibitionState, setExhibitionState] = useState<ExhibitionState>("IDLE");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<SkillGroupData | null>(null);
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);

  const scrollToRoom = useCallback(
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

  // Exhibition State transitions
  const handleSelectProject = useCallback(
    (project: Project) => {
      scrollToRoom("projects");
      setSelectedProject(project);
      setExhibitionState("SELECTED");
    },
    [scrollToRoom]
  );

  const handleSelectSkill = useCallback(
    (group: SkillGroupData) => {
      scrollToRoom("lab");
      setSelectedSkillGroup(group);
      setExhibitionState("SELECTED");
    },
    [scrollToRoom]
  );

  const handleSelectProof = useCallback(
    (item: ProofItem) => {
      scrollToRoom("archive");
      setSelectedProof(item);
    },
    [scrollToRoom]
  );

  const handleCloseProject = useCallback(() => {
    setExhibitionState("EXITING");
  }, []);

  const handleExhibitionStateChange = useCallback((newState: ExhibitionState) => {
    setExhibitionState(newState);
    if (newState === "IDLE") {
      setSelectedProject(null);
      setSelectedSkillGroup(null);
    }
  }, []);

  // Compute active spatial room and physical door opening progress
  const spatialState = getActiveSpatialState(scrollProgress);
  const doorOpenProgress = spatialState.doorOpenProgress;
  const activeRoomId = spatialState.roomId;

  const { updateAccentForRoom, setInteractingProject } = useTheme();

  useEffect(() => {
    updateAccentForRoom(activeRoomId);
  }, [activeRoomId, updateAccentForRoom]);

  // Dynamic Color Intelligence: elevate accent to project identity during focus/selection and restore on departure
  useEffect(() => {
    const activeProject = selectedProject || hoveredProject;
    if (activeProject) {
      setInteractingProject(activeProject.id);
    } else {
      setInteractingProject(null);
    }
  }, [selectedProject, hoveredProject, setInteractingProject]);

  // Scroll tracking across the full 650vh spatial track & Room Departure Boundaries
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

      // Room Departure & Spatial Boundaries: Release modals and exhibit focus on departure
      if (progress < 0.22 || progress > 0.52) {
        setHoveredProject((prev) => (prev !== null ? null : prev));
        setSelectedProject((prev) => {
          if (prev !== null) {
            setExhibitionState((curr) => (curr !== "IDLE" ? "IDLE" : curr));
          }
          return null;
        });
      }
      if (progress < 0.36 || progress > 0.66) {
        setSelectedSkillGroup((prev) => {
          if (prev !== null) {
            setExhibitionState((curr) => (curr !== "IDLE" ? "IDLE" : curr));
          }
          return null;
        });
      }
      if (progress < 0.50 || progress > 0.80) {
        setSelectedProof((prev) => (prev !== null ? null : prev));
      }
      if (progress < 0.64 || progress > 0.94) {
        setIsStudyModalOpen((prev) => (prev ? false : prev));
      }
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
      // Cleanly dismiss active modals and object focus before room jump
      setSelectedProject(null);
      setExhibitionState("IDLE");
      setSelectedSkillGroup(null);
      setSelectedProof(null);
      setIsStudyModalOpen(false);
      setHoveredProject(null);

      scrollToRoom(targetRoomId);
    },
    [scrollToRoom]
  );

  // Hash listener for deep-linking into specific 3D rooms (#projects, #stack, #proof, #about, #contact)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#projects" || hash === "#work") {
        handleNavigateToRoom("projects");
      } else if (hash === "#stack" || hash === "#skills" || hash === "#lab") {
        handleNavigateToRoom("lab");
      } else if (hash === "#proof" || hash === "#archive") {
        handleNavigateToRoom("archive");
      } else if (hash === "#about" || hash === "#study") {
        handleNavigateToRoom("study");
      } else if (hash === "#contact") {
        handleNavigateToRoom("contact");
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

  // Contextual enter action: advances sequentially through the complete house
  const handleEnterClick = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollableDistance = rect.height - window.innerHeight;

    let targetRatio = 0.22; // Step into Foyer
    if (scrollProgress < 0.16) {
      targetRatio = 0.22; // Enter Foyer
    } else if (scrollProgress < 0.32) {
      targetRatio = 0.36; // Enter Project Studio
    } else if (scrollProgress < 0.46) {
      targetRatio = 0.5; // Enter Engineering Lab
    } else if (scrollProgress < 0.6) {
      targetRatio = 0.64; // Enter Archive
    } else if (scrollProgress < 0.74) {
      targetRatio = 0.78; // Enter Private Study
    } else if (scrollProgress < 0.86) {
      targetRatio = 0.9; // Enter Contact
    } else {
      targetRatio = 0.98; // Step out to Terrace
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

  const handleContinueDown = useCallback(() => {
    const el = document.getElementById("identity-heading");
    if (el) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  }, [reduce]);

  // If WebGL is verified as unsupported, render graceful fallback
  if (webglSupported === false) {
    return <HouseFallback />;
  }

  return (
    <section
      ref={containerRef}
      id="house-experience"
      aria-label="Santheesh's Digital House — Complete Cinematic Spatial Experience"
      className="relative h-[650vh] w-full bg-[#F5F4EF]"
    >
      {/* Accessible semantic content for screen readers & SEO */}
      <div className="sr-only">
        <h1>{profile.name} — AI Software Engineer</h1>
        <p>{profile.tagline}</p>
        <p>
          Welcome inside my digital residence. Explore the Project Studio,
          Engineering Lab, Archive of Work, Private Study, and Contact Exit.
          Current space: {spatialState.name} — {spatialState.subtitle}.
        </p>
        <nav aria-label="Spatial room destinations">
          <ul>
            <li>
              <button onClick={() => handleNavigateToRoom("exterior")}>
                00 Exterior Residence
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("foyer")}>
                01 Foyer
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("projects")}>
                02 Project Studio (Work)
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("lab")}>
                03 Engineering Lab (Skills)
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("archive")}>
                04 Archive (Proof of Work)
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("study")}>
                05 Private Study (About & Principles)
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigateToRoom("contact")}>
                06 Contact (Exit)
              </button>
            </li>
            <li>
              <a href="#identity-heading">Perspective & Engineering Identity</a>
            </li>
            <li>
              <a href="#projects">Selected Projects</a>
              <ul>
                {projects.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => handleSelectProject(p)}>
                      Inspect {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#stack">Technical Stack</a>
              <ul>
                {SKILL_GROUPS.map((g) => (
                  <li key={g.id}>
                    <button type="button" onClick={() => handleSelectSkill(g)}>
                      Inspect {g.title}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#proof">Proof of Work</a>
              <ul>
                {[...PROOF_HACKATHONS, PROOF_OPEN_SOURCE, ...PROOF_MILESTONES].map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => handleSelectProof(item)}>
                      Inspect {item.title}
                    </button>
                  </li>
                ))}
              </ul>
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

      {/* Sticky 100vh 3D Viewport with dynamic viewport height support */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden">
        {/* Loading Screen Preloader */}
        <LoadingScene isLoading={!sceneReady} />

        {/* 3D Scene Viewport with Graceful Error Boundary */}
        {webglSupported && (
          <HouseErrorBoundary fallback={<HouseFallback />}>
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
              selectedProject={selectedProject}
              selectedSkillGroup={selectedSkillGroup}
              exhibitionState={exhibitionState}
              onExhibitionStateChange={handleExhibitionStateChange}
              onSelectProject={handleSelectProject}
              onHoverProject={setHoveredProject}
              onSelectSkill={handleSelectSkill}
              onSelectProof={handleSelectProof}
              onOpenStudyModal={() => setIsStudyModalOpen(true)}
              onSceneReady={() => setSceneReady(true)}
              reducedMotion={Boolean(reduce)}
            />
          </HouseErrorBoundary>
        )}

        {/* Spatial Cinematic HUD */}
        <CinematicHUD
          scrollProgress={scrollProgress}
          onNavigateToRoom={handleNavigateToRoom}
          onEnterClick={handleEnterClick}
        />

        {/* Contextual Exhibition Signage & Modals */}
        <ProjectDetailModal
          project={selectedProject}
          exhibitionState={exhibitionState}
          onExhibitionStateChange={handleExhibitionStateChange}
          onClose={handleCloseProject}
        />
        <SkillDetailModal
          group={selectedSkillGroup}
          exhibitionState={exhibitionState}
          onClose={() => setExhibitionState("EXITING")}
        />
        <ProofDetailModal
          item={selectedProof}
          onClose={() => setSelectedProof(null)}
        />
        <StudyDetailModal
          isOpen={isStudyModalOpen}
          onClose={() => setIsStudyModalOpen(false)}
        />

        {/* Final Ending State Overlay at Terrace Exit */}
        <FinalExitOverlay
          isVisible={scrollProgress >= 0.95}
          onRestart={() => handleNavigateToRoom("exterior")}
          onContinueDown={handleContinueDown}
        />
      </div>
    </section>
  );
}



