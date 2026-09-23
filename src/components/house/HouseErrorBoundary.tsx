"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface HouseErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface HouseErrorBoundaryState {
  hasError: boolean;
}

export class HouseErrorBoundary extends Component<
  HouseErrorBoundaryProps,
  HouseErrorBoundaryState
> {
  constructor(props: HouseErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): HouseErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully handled 3D canvas initialization or runtime failure
    if (process.env.NODE_ENV !== "production") {
      console.warn("House 3D Experience captured an error, falling back to 2D:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
