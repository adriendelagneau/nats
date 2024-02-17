"use client"

import { ReactLenis } from "@studio-freight/react-lenis";

import React, { ReactNode } from "react";

// Define the props interface for SmoothScrolling component
interface SmoothScrollingProps {
  children: ReactNode;
}

function SmoothScrolling({ children }: SmoothScrollingProps) {
  // Render ReactLenis with the specified options and children
  return (
    <ReactLenis
      root
      options={{ lerp: 0.07, duration: 0.3, smoothTouch: true } as any}
    >
      {children}
    </ReactLenis>
  );
}

// Export the SmoothScrolling component as the default export
export default SmoothScrolling;
