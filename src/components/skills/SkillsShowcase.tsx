"use client";

import { useCallback, useState } from "react";
import { SkillGroup } from "@/components/skills/SkillGroup";
import type { SkillGroupData } from "@/types";

interface SkillsShowcaseProps {
  groups: SkillGroupData[];
}

/**
 * Phase 9 — Cinematic Technical Stack Coordinator.
 * Client component managing active category interaction state,
 * hover elevation, and accessibility across all four technical domains.
 */
export function SkillsShowcase({ groups }: SkillsShowcaseProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActivate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveId(null);
  }, []);

  const hasActive = activeId !== null;

  return (
    <div
      role="feed"
      aria-label="Technical stack capability domains"
      className="flex flex-col border-b border-border-subtle/80"
    >
      {groups.map((group) => {
        const isActive = activeId === group.id;

        return (
          <SkillGroup
            key={group.id}
            group={group}
            isActive={isActive}
            isMuted={hasActive && !isActive}
            onActivate={() => handleActivate(group.id)}
            onDeactivate={handleDeactivate}
          />
        );
      })}
    </div>
  );
}
