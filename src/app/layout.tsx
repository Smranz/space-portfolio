import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: "Space Portfolio | Electronic Subsystem Engineer",
  description: "Portfolio of an Electronic Subsystem Engineer specializing in IoT and Embedded Systems",
};

import Navbar from "@/components/Navbar";
import StarsCanvas from "@/components/StarBackground";
import Footer from "@/components/Footer";

import HudOverlay from "@/components/HudOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-[#030014] text-white`}
        suppressHydrationWarning
      >
        {/* CommandCenter has its own HUD and navigation */}
        <StarsCanvas />
        {children}
      </body>
    </html>
  );
}
