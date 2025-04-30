"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast"; // Corrected import path
import { Send, Mail, MapPin } from "lucide-react"; // Import icons

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { toast } = useToast();
  // Remove isSubmitting state as it's handled by mail client now
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    // Construct the mailto link
    const recipientEmail = "wpbaris@gmail.com";
    const subject = encodeURIComponent(
      `Contact Form Submission from ${data.name}`
    );
    // Include sender's email and name in the body for context
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open the default email client
    if (typeof window !== "undefined") {
      window.location.href = mailtoLink;

      // Show a toast message indicating the action
      toast({
        title: "Opening Email Client",
        description:
          "Please complete sending the email in your mail application.",
      });
      // Reset form after attempting to open mail client
      form.reset(); // Reset form fields
    } else {
      // Fallback or error handling if window is not defined (e.g., during SSR)
      toast({
        title: "Error",
        description: "Could not open email client.",
        variant: "destructive",
      });
    }
  };

  return (
    // Added mx-auto for centering and mb-4 for spacing
    <Card className="w-full max-w-2xl shadow-lg mx-auto mb-4">
      <CardHeader className="px-4 sm:px-6 pt-6 pb-4">
        {" "}
        {/* Adjusted padding */}
        <CardTitle className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Get In Touch
        </CardTitle>
        {/* Add contact info here */}
        <CardDescription className="text-center text-muted-foreground pt-2 space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>wpbaris@gmail.com</span> {/* Actual email */}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Istanbul, Turkey</span> {/* Actual location */}
          </div>
          <p className="pt-2">
            Or use the form below to send me a message directly.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        {" "}
        {/* Adjusted padding */}
        <Form {...form}>
          {/* Adjusted spacing between form fields */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    {/* Slightly taller textarea by default */}
                    <Textarea
                      placeholder="Your message..."
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Added pt-2 for slight spacing above button */}
            {/* Update button text and remove disabled state based on isSubmitting */}
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 pt-2"
            >
              Send via Email <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
