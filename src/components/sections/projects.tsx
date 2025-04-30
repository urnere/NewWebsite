"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectDetailDialog } from "@/components/project-detail-dialog";
import type { Project } from "@/types/project";
import projectimage1 from "@/assets/projectimage1.png";
import projectimage2 from "@/assets/projectimage2.png";
import projectimage3 from "@/assets/projectimage3.png";

const allProjects: Project[] = [
  {
    id: "alpha",
    title: "Pet Adoption App",
    description:
      "This app is a mobile app developed to simplify the pet adoption process. Users can add their pets, communicate with other users, and save their favorite animals. The app is integrated with Firebase and includes a messaging system that allows users to chat.",
    imageUrl: projectimage1.src,
    link: "https://github.com/urnere/Pet-Adopt-App",
  },
  {
    id: "beta",
    title: "Chat App",
    description:
      "A user-friendly mobile chat app with real-time messaging built using Flutter and Firebase. It offers secure authentication, media sharing, and multi-platform support.",
    imageUrl: projectimage2.src,
    link: "https://github.com/urnere/chatapp",
  },
  {
    id: "gamma",
    title: "Word App",
    description:
      "A Flutter application designed to help users learn and memorize foreign language vocabulary. This app allows users to create, manage, and track their progress with English-Turkish word pairs.",
    imageUrl: projectimage3.src,
    link: "https://github.com/urnere/WordApp",
  },
];

const initialProjects = allProjects.slice(0, 3);
const GITHUB_USERNAME = "urnere";
const GITHUB_REPOS_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSelectedProject(project);
    }
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    // Added mx-auto for centering within its container
    // Added mb-4 for spacing from controls if scroll occurs
    <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center space-y-4 md:space-y-6 px-2 mx-auto mb-4">
      <h2 className="text-2xl font-bold text-primary md:text-3xl">
        My Projects
      </h2>

      {/* Grid container for larger screens (md and up) */}
      <div className="hidden w-full md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {initialProjects.map((project) => (
          <Card
            key={project.id}
            className={cn(
              "flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105",
              "cursor-default"
            )}
          >
            <CardHeader className="p-0">
              <div className="relative h-40 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between p-3">
              <div>
                <CardTitle className="mb-1 text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </div>
              <CardFooter className="mt-3 p-0">
                {/* Ensure button uses flex and items-center for icon alignment */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center"
                >
                  <a
                    href={project.link !== "#" ? project.link : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Horizontal scroll container for smaller screens (below md) */}
      {/* Added scroll-smooth for potentially smoother scrolling */}
      <div className="w-full overflow-x-auto pb-4 md:hidden touch-pan-y scroll-smooth">
        {/* Added px-4 for padding *inside* the scrollable area, ensuring cards don't touch edges */}
        {/* Use gap-4 for spacing between cards */}
        <div className="flex min-w-max gap-4 px-4">
          {initialProjects.map((project) => (
            <Card
              key={project.id}
              className={cn(
                "flex flex-col overflow-hidden shadow-lg",
                // Fixed width for consistency, slightly larger on sm+
                "cursor-pointer w-64 sm:w-72 flex-shrink-0"
              )}
              onClick={() => handleProjectClick(project)}
            >
              <CardHeader className="p-0">
                <div className="relative h-36 sm:h-40 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between p-3">
                <div>
                  {/* Responsive text size */}
                  <CardTitle className="mb-1 text-base sm:text-lg">
                    {project.title}
                  </CardTitle>
                  {/* Responsive text size */}
                  <CardDescription className="text-xs sm:text-sm line-clamp-2">
                    {" "}
                    {/* Limit description lines */}
                    {project.description}
                  </CardDescription>
                </div>
                {/* Footer is hidden on mobile */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* "See More" button linking to GitHub */}
      {/* Ensure button uses flex and items-center for icon alignment */}
      <div className="pt-2 md:pt-4">
        <Button
          asChild
          variant="outline"
          className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center"
        >
          <a href={GITHUB_REPOS_URL} target="_blank" rel="noopener noreferrer">
            See More on GitHub <Github className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Render Dialog */}
      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => {
            if (!open) handleCloseDialog();
          }}
        />
      )}
    </div>
  );
}
