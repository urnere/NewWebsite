"use client";

import type { FC } from "react";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react"; // Import useEffect, useRef, useCallback
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { SectionNavigator } from "@/components/section-navigator";
import { SocialMediaLinks } from "@/components/social-media-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const sections: FC[] = [AboutSection, ProjectsSection, ContactSection];
const sectionIds = ["about", "projects", "contact"];
const DEBOUNCE_DELAY = 150; // Debounce delay in milliseconds

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for debounce timeout
  const isNavigatingRef = useRef(false); // Ref to track if navigation is in progress

  const handleNavigate = useCallback((index: number) => {
    if (index >= 0 && index < sections.length && !isNavigatingRef.current) {
      isNavigatingRef.current = true;
      setActiveIndex(index);
      // Reset navigation lock after transition duration (adjust if needed)
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 500); // Corresponds to the transition duration in globals.css
    }
  }, []); // Empty dependency array as sections.length is constant here

  // Debounced wheel handler
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault(); // Prevent default page scroll

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (isNavigatingRef.current) return; // Don't navigate if already navigating

        const direction = event.deltaY > 0 ? 1 : -1; // 1 for down, -1 for up
        const nextIndex = activeIndex + direction;

        handleNavigate(nextIndex);
      }, DEBOUNCE_DELAY);
    },
    [activeIndex, handleNavigate]
  );

  // Add and remove wheel event listener
  useEffect(() => {
    // Add listener only on the client-side
    if (typeof window !== "undefined") {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wheel", handleWheel);
      }
      // Clear any pending timeout on unmount
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [handleWheel]); // Re-attach listener if handleWheel changes (it shouldn't with useCallback)

  return (
    // Main container takes full viewport height and width
    // Uses flex column to layout elements vertically
    // Added pb-20 to provide space for the fixed navigator at the bottom
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-between pb-20">
      {/* ThemeToggle remains fixed at the top right */}
      <div className="absolute top-6 right-6 z-20 p-2 sm:top-4 sm:right-4 sm:p-0">
        <ThemeToggle />
      </div>

      {/* Section container: grows to fill available space */}
      <main className="section-container relative flex w-full flex-1 items-center justify-center px-4 pt-24 sm:px-6 md:px-8">
        {sections.map((SectionComponent, index) => (
          <div
            key={sectionIds[index]}
            id={sectionIds[index]}
            className={cn(
              "absolute inset-0 flex h-full w-full items-center justify-center px-4 sm:px-6 md:px-8",
              activeIndex === index ? "section-active" : "section-inactive"
            )}
            style={{
              zIndex: activeIndex === index ? 1 : 0,
            }}
            aria-hidden={activeIndex !== index}
          >
            {/* Increased max-width slightly */}
            <div className="w-full max-w-4xl lg:max-w-5xl">
              <SectionComponent />
            </div>
          </div>
        ))}
      </main>

      {/* SocialMediaLinks are now part of the main flow, placed just before the fixed footer */}
      <div className="w-full p-4 flex justify-center">
        <SocialMediaLinks />
      </div>

      {/* Footer area containing ONLY the SectionNavigator */}
      {/* Fixed position container for navigator */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-center p-4">
        <SectionNavigator
          count={sections.length}
          activeIndex={activeIndex}
          onNavigate={handleNavigate}
          labels={["About", "Projects", "Contact"]}
        />
      </footer>
    </div>
  );
}
