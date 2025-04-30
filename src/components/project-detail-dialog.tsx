
import type { FC } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter, // Import DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Import Button
import { ExternalLink } from 'lucide-react'; // Import ExternalLink
import type { Project } from '@/types/project'; // Import Project type

interface ProjectDetailDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectDetailDialog: FC<ProjectDetailDialogProps> = ({
  project,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-md text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        {/* Add a footer with the View Project button */}
        <DialogFooter className="pt-4">
            <Button asChild variant="outline" size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
