export type RoomId =
  | "exterior"
  | "entrance"
  | "foyer"
  | "corridor"
  | "projects"
  | "lab"
  | "archive"
  | "study"
  | "contact"
  | "exit";

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
    scrollTarget: 0.12,
    isUnlocked: true,
    phase: "PHASE 02",
  },
  {
    id: "foyer",
    index: "01",
    name: "FOYER",
    subtitle: "THE RESIDENCE",
    scrollTarget: 0.22,
    isUnlocked: true,
    phase: "PHASE 02",
  },
  {
    id: "projects",
    index: "02",
    name: "WORK",
    subtitle: "PROJECT STUDIO",
    scrollTarget: 0.36,
    isUnlocked: true,
    phase: "PHASE 03",
  },
  {
    id: "lab",
    index: "03",
    name: "LAB",
    subtitle: "ENGINEERING LAB",
    scrollTarget: 0.5,
    isUnlocked: true,
    phase: "PHASE 03",
  },
  {
    id: "archive",
    index: "04",
    name: "ARCHIVE",
    subtitle: "PROOF & MILESTONES",
    scrollTarget: 0.64,
    isUnlocked: true,
    phase: "PHASE 04",
  },
  {
    id: "study",
    index: "05",
    name: "STUDY",
    subtitle: "ABOUT & PHILOSOPHY",
    scrollTarget: 0.78,
    isUnlocked: true,
    phase: "PHASE 04",
  },
  {
    id: "contact",
    index: "06",
    name: "CONTACT",
    subtitle: "COMMUNICATION",
    scrollTarget: 0.9,
    isUnlocked: true,
    phase: "PHASE 04",
  },
  {
    id: "exit",
    index: "—",
    name: "EXIT",
    subtitle: "NIGHT TERRACE",
    scrollTarget: 0.98,
    isUnlocked: true,
    phase: "PHASE 04",
  },
];

export function getActiveSpatialState(scrollProgress: number) {
  if (scrollProgress < 0.1) {
    return {
      roomId: "exterior" as RoomId,
      index: "00",
      name: "EXTERIOR",
      subtitle: "BLUE HOUR",
      isInterior: false,
      doorOpenProgress: 0,
    };
  } else if (scrollProgress < 0.2) {
    // Front door opening zone: 0.10 to 0.20
    const doorProgress = Math.min(1, Math.max(0, (scrollProgress - 0.1) / 0.1));
    return {
      roomId: "entrance" as RoomId,
      index: "—",
      name: "ENTRANCE",
      subtitle: "THE THRESHOLD",
      isInterior: doorProgress > 0.6,
      doorOpenProgress: doorProgress,
    };
  } else if (scrollProgress < 0.32) {
    return {
      roomId: "foyer" as RoomId,
      index: "01",
      name: "FOYER",
      subtitle: "THE RESIDENCE",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.46) {
    return {
      roomId: "projects" as RoomId,
      index: "02",
      name: "PROJECT STUDIO",
      subtitle: "THE WORK",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.6) {
    return {
      roomId: "lab" as RoomId,
      index: "03",
      name: "ENGINEERING LAB",
      subtitle: "SYSTEMS I BUILD WITH",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.74) {
    return {
      roomId: "archive" as RoomId,
      index: "04",
      name: "ARCHIVE",
      subtitle: "PROOF & MILESTONES",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.86) {
    return {
      roomId: "study" as RoomId,
      index: "05",
      name: "PRIVATE STUDY",
      subtitle: "HOW I THINK",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else if (scrollProgress < 0.96) {
    return {
      roomId: "contact" as RoomId,
      index: "06",
      name: "CONTACT",
      subtitle: "COMMUNICATION",
      isInterior: true,
      doorOpenProgress: 1,
    };
  } else {
    return {
      roomId: "exit" as RoomId,
      index: "—",
      name: "TERRACE",
      subtitle: "THE HOUSE BEHIND YOU",
      isInterior: false,
      doorOpenProgress: 1,
    };
  }
}
