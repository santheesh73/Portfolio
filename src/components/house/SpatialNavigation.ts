export type RoomId =
  | "exterior"
  | "entrance"
  | "foyer"
  | "corridor"
  | "projects"
  | "lab"
  | "archive"
  | "study"
  | "contact";

export interface RoomWaypoint {
  id: RoomId;
  index: string;
  name: string;
  subtitle: string;
  scrollTarget: number;
  isUnlocked: boolean;
  phase: string;
}

export const ROOM_WAYPOINTS: RoomWaypoint[] = [
  {
    id: "exterior",
    index: "00",
    name: "EXTERIOR",
    subtitle: "BLUE HOUR RESIDENCE",
    scrollTarget: 0.0,
    isUnlocked: true,
    phase: "PHASE 01",
  },
  {
    id: "entrance",
    index: "—",
    name: "ENTRANCE",
    subtitle: "THE THRESHOLD",
    scrollTarget: 0.18,
    isUnlocked: true,
    phase: "PHASE 02",
  },
  {
    id: "foyer",
    index: "01",
    name: "FOYER",
    subtitle: "THE RESIDENCE",
    scrollTarget: 0.32,
    isUnlocked: true,
    phase: "PHASE 02",
  },
  {
    id: "corridor",
    index: "—",
    name: "CORRIDOR",
    subtitle: "GALLERY",
    scrollTarget: 0.44,
    isUnlocked: true,
    phase: "PHASE 02",
  },
  {
    id: "projects",
    index: "02",
    name: "WORK",
    subtitle: "PROJECT STUDIO",
    scrollTarget: 0.58,
    isUnlocked: true,
    phase: "PHASE 03",
  },
  {
    id: "lab",
    index: "03",
    name: "LAB",
    subtitle: "ENGINEERING LAB",
    scrollTarget: 0.85,
    isUnlocked: true,
    phase: "PHASE 03",
  },
  {
    id: "archive",
    index: "04",
    name: "ARCHIVE",
    subtitle: "PROOF & MILESTONES",
    scrollTarget: 0.95,
    isUnlocked: false,
    phase: "PHASE 04",
  },
  {
    id: "study",
    index: "05",
    name: "STUDY",
    subtitle: "ABOUT & PHILOSOPHY",
    scrollTarget: 0.98,
    isUnlocked: false,
    phase: "PHASE 04",
  },
  {
    id: "contact",
    index: "06",
    name: "CONTACT",
    subtitle: "COMMUNICATION",
    scrollTarget: 1.0,
    isUnlocked: false,
    phase: "PHASE 04",
  },
];

export function getActiveSpatialState(scrollProgress: number) {
  if (scrollProgress < 0.16) {
    return {
      roomId: "exterior" as RoomId,
      index: "00",
      name: "EXTERIOR",
      subtitle: "BLUE HOUR",
      isInterior: false,
      doorOpenProgress: 0,
    };
  } else if (scrollProgress < 0.28) {
    // Door opening zone: 0.16 to 0.28
    const doorProgress = Math.min(1, Math.max(0, (scrollProgress - 0.16) / 0.12));
    return {
      roomId: "entrance" as RoomId,
      index: "—",
      name: "ENTRANCE",
      subtitle: "THE THRESHOLD",
      isInterior: doorProgress > 0.6,
      doorOpenProgress: doorProgress,
    };
  } else if (scrollProgress < 0.44) {
    return {
      roomId: "foyer" as RoomId,
      index: "01",
      name: "FOYER",
      subtitle: "THE RESIDENCE",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.72) {
    return {
      roomId: "projects" as RoomId,
      index: "02",
      name: "PROJECT STUDIO",
      subtitle: "THE WORK",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.98) {
    return {
      roomId: "lab" as RoomId,
      index: "03",
      name: "ENGINEERING LAB",
      subtitle: "SYSTEMS I BUILD WITH",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else {
    return {
      roomId: "corridor" as RoomId,
      index: "—",
      name: "CORRIDOR",
      subtitle: "GALLERY",
      isInterior: true,
      doorOpenProgress: 1,
    };
  }
}
