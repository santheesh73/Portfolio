"use client";

import { ReactNode } from "react";
import { RoomId } from "./SpatialNavigation";

interface RoomSystemProps {
  activeRoomId: RoomId;
  children: ReactNode;
}

export function RoomSystem({ activeRoomId, children }: RoomSystemProps) {
  return (
    <group name={`room-system-active-${activeRoomId}`}>
      {children}
    </group>
  );
}
