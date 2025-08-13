import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn
import profileImage from "@/assets/profile.jpg"; // Import the profile image

export function AboutSection() {
  return (
    // Use flex row for the main card layout
    // Added mx-auto for centering and mb-4 for spacing
    <Card className="w-full max-w-4xl shadow-lg mx-auto overflow-hidden mb-4">
      {" "}
      {/* Reduced bottom margin */}
      {/* Flex container for left (content) and right (image) sections */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section: Header, Content, Footer */}
        {/* Increased padding to p-8 for more spacing */}
        {/* Added group class for potential future group-hover effects if needed */}
        {/* Centering content on small screens, left-aligning on md+ */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:w-2/3 group items-center text-center md:items-start md:text-left">
          {" "}
          {/* Adjusted padding and alignment */}
          {/* Added animation classes: animate-in, fade-in, slide-in-from-left, duration */}
          <CardHeader
            className={cn(
              "p-0 pb-4 w-full", // Ensure header takes full width for centering text
              "animate-in fade-in slide-in-from-left-10 duration-500"
            )}
          >
            {" "}
            {/* Removed default padding */}
            {/* Added hover effect to the CardTitle */}
            <CardTitle className="text-2xl font-bold text-primary sm:text-3xl transition-colors duration-200 hover:text-accent">
              Barış Manço Özdemir
            </CardTitle>
            <p className="text-base text-muted-foreground sm:text-lg">
              Frontend & Mobile Developer
            </p>
          </CardHeader>
          {/* Added animation classes with delay */}
          <CardContent
            className={cn(
              "p-0 pb-4 text-sm sm:text-base w-full", // Ensure content takes full width for centering text
              "animate-in fade-in slide-in-from-left-10 duration-500 delay-150"
            )}
          >
            {" "}
            {/* Removed default padding */}
            <p>
              {" "}
              {/* Text alignment handled by parent div */}
              I'm developing cross-platform mobile applications and web
              applications.
            </p>
          </CardContent>
          {/* Added animation classes with further delay */}
          <CardFooter
            className={cn(
              "p-0 pt-4 flex justify-center md:justify-start w-full", // Center button on small screens, start on md+
              "animate-in fade-in slide-in-from-left-10 duration-500 delay-300"
            )}
          >
            {" "}
            {/* Removed default padding */}
            {/* Added hover scale effect */}
            {/* The button should be placed here, below content */}
            <Button
              variant="outline"
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-200 hover:scale-105"
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </CardFooter>
        </div>

        {/* Right Section: Avatar */}
        {/* Use flex utilities to center the avatar vertically and horizontally within its container */}
        {/* Removed background color for better blending */}
        {/* Added animation classes */}
        <div
          className={cn(
            "flex items-center justify-center p-6 md:w-1/3",
            "animate-in fade-in zoom-in-95 duration-500 delay-200" // Added entrance animation
          )}
        >
          {" "}
          {/* Removed bg-secondary/30 */}
          {/* Increased Avatar size significantly */}
          {/* Added transition and hover effect */}
          <Avatar className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-md border-4 border-accent/50 shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
            {" "}
            {/* Larger size, border, shadow, animation */}
            {/* Corrected path assuming 'profile.jpg' is in 'public/images' */}
            <AvatarImage
              src={profileImage.src}
              alt="Profile Picture"
              className="rounded-md object-cover"
            />
            <AvatarFallback className="rounded-md text-2xl sm:text-3xl">
              BÖ
            </AvatarFallback>{" "}
            {/* Adjusted fallback text size and content */}
          </Avatar>
        </div>
      </div>
    </Card>
  );
}
