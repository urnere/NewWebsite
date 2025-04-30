
'use client';

import type { FC } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/urnere',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/urnere',
    icon: Linkedin,
  },
  
];

export const SocialMediaLinks: FC = () => {
  return (
    <TooltipProvider>
      {/* Centered flex container, padding handled by parent */}
      {/* No absolute/fixed positioning */}
      <div className={cn(
        "flex justify-center space-x-2 w-full" // Removed padding, parent div in page.tsx handles it
      )}>
        {socialLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  // Slightly smaller icons/buttons for better fit
                  'h-9 w-9 rounded-full text-primary hover:bg-accent/20'
                )}
                aria-label={`Visit my ${link.name} profile`}
              >
                {/* Slightly smaller icon size */}
                <link.icon className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
