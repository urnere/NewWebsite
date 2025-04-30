
'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { User, FolderGit2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SectionNavigatorProps {
  count: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
  labels?: string[];
}

const icons = [User, FolderGit2, Mail];

export const SectionNavigator: FC<SectionNavigatorProps> = ({
  count,
  activeIndex,
  onNavigate,
  labels = [],
}) => {
  return (
    <TooltipProvider>
      {/* Removed absolute positioning */}
      {/* Kept background and layout styles */}
      <nav className={cn(
        "flex space-x-3 rounded-full bg-primary/10 p-2 backdrop-blur-sm",
        // Centering is now handled by the parent div in page.tsx
      )}>
        {Array.from({ length: count }).map((_, index) => {
          const IconComponent = icons[index] || User;
          const label = labels[index] || `Section ${index + 1}`;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-10 w-10 rounded-full transition-colors duration-300',
                    activeIndex === index
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary hover:bg-accent/20'
                  )}
                  onClick={() => onNavigate(index)}
                  aria-label={`Go to ${label} section`}
                >
                  <IconComponent className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
};
