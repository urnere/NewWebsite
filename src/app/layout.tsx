import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Inter from next/font/google
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define a CSS variable for Inter
});

export const metadata: Metadata = {
  title: "Barış Manço Özdemir | Junior Flutter Developer ", // Updated title
  description:
    "Junior Flutter Developer with passion for creating responsive and user-friendly mobile applications. Check out my portfolio and projects.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Use the Inter font variable */}
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set default theme to dark as per color scheme
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster /> {/* Add Toaster here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
