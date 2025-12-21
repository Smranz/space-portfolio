"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, User, Code, Rocket, Mail, Power, Wifi, Cpu, Database, Github, Linkedin, Instagram, Crosshair } from "lucide-react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import AttackMode from "./AttackMode";

// Fiverr icon component (stroke-based SVG to match other icons)
const FiverrIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 6h8M4 6v12M4 11h6" />
        <path d="M16 8v10M14 10h6" />
        <circle cx="20" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// Social media links data
const SOCIAL_LINKS = [
    {
        name: "Fiverr",
        url: "https://www.fiverr.com/users/samranz/seller_dashboard",
        icon: FiverrIcon,
        color: "#1DBF73",
    },
    {
        name: "GitHub",
        url: "https://github.com/Smranz",
        icon: Github,
        color: "#ffffff",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/smranz",
        icon: Linkedin,
        color: "#0A66C2",
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/samranz.official?igsh=MWk4aTh1OHkwanlu",
        icon: Instagram,
        color: "#E4405F",
    },
    {
        name: "Email",
        url: "mailto:samranzahid34@gmail.com",
        icon: Mail,
        color: "#00e5ff",
    },
];

type ViewType = "home" | "about" | "skills" | "projects" | "contact" | "attack";

const CommandCenter = () => {
    const [activeView, setActiveView] = useState<ViewType>("home");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const controls = [
        { id: "home", label: "MAIN", icon: Terminal, color: "cyan" },
        { id: "about", label: "PROFILE", icon: User, color: "cyan" },
        { id: "skills", label: "TECH", icon: Code, color: "cyan" },
        { id: "projects", label: "MISSIONS", icon: Rocket, color: "cyan" },
        { id: "contact", label: "COMMS", icon: Mail, color: "cyan" },
        { id: "attack", label: "ATTACK", icon: Crosshair, color: "red" },
    ];

    const renderView = () => {
        switch (activeView) {
            case "home": return <Hero />;
            case "about": return <About />;
            case "skills": return <Skills />;
            case "projects": return <Projects />;
            case "contact": return <Contact />;
            case "attack": return <AttackMode />;
            default: return <Hero />;
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-[#030014] overflow-hidden">
            {/* Windshield Frame - Top Angled Border */}
            <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-50">
                <svg className="w-full h-full" viewBox="0 0 1920 80" preserveAspectRatio="none">
                    <path
                        d="M 0,80 L 100,0 L 1820,0 L 1920,80 Z"
                        fill="rgba(0,229,255,0.05)"
                        stroke="rgba(0,229,255,0.3)"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            {/* Windshield Frame - Left Border */}
            <div className="absolute top-0 left-0 w-8 md:w-24 h-full pointer-events-none z-50">
                <svg className="w-full h-full" viewBox="0 0 96 1080" preserveAspectRatio="none">
                    <path
                        d="M 96,0 L 0,100 L 0,980 L 96,1080 Z"
                        fill="rgba(0,229,255,0.03)"
                        stroke="rgba(0,229,255,0.3)"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            {/* Windshield Frame - Right Border */}
            <div className="absolute top-0 right-0 w-8 md:w-24 h-full pointer-events-none z-50">
                <svg className="w-full h-full" viewBox="0 0 96 1080" preserveAspectRatio="none">
                    <path
                        d="M 0,0 L 96,100 L 96,980 L 0,1080 Z"
                        fill="rgba(0,229,255,0.03)"
                        stroke="rgba(0,229,255,0.3)"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            {/* Main Windshield Display Area */}
            <div className={`absolute top-16 md:top-24 left-10 right-10 md:left-28 md:right-28 bottom-32 md:bottom-40 ${activeView === 'skills' ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>
                {/* Central Circular HUD Element - Only show on MAIN page */}
                {activeView === "home" && (
                    <div className="absolute top-4 right-4 w-32 h-32 pointer-events-none z-40 hidden md:block">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full" />
                            <div className="absolute inset-3 border border-cyan-500/20 rounded-full" />
                            <div className="absolute inset-6 border border-cyan-500/10 rounded-full" />
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-[2px] h-16 bg-gradient-to-b from-cyan-500 to-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: "50% 100%" }}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono text-cyan-400">
                                SCAN
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area with Holographic Effect */}
                <div className="relative w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`w-full h-full ${activeView === 'skills' ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent'}`}
                            style={{ perspective: "1000px" }}
                        >
                            <div className={`${activeView === 'skills' ? 'h-full' : 'min-h-full'} flex items-center justify-center p-4 md:p-8`}>
                                {renderView()}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* Right Social Panel */}
            <div className="absolute right-7 md:right-8 top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col gap-3">
                {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target={social.name === "Email" ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-cyan-500/30 bg-black/60 backdrop-blur-sm flex items-center justify-center text-gray-400 cursor-pointer"
                            whileHover={{
                                scale: 1.15,
                                borderColor: social.color,
                                boxShadow: `0 0 15px ${social.color}40`,
                            }}
                            whileTap={{ scale: 0.95 }}
                            title={social.name}
                        >
                            <Icon className="w-4 h-4" />
                        </motion.a>
                    );
                })}
            </div>

            {/* Bottom Control Console */}
            <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/95 to-transparent z-50 border-t border-cyan-500/30 pointer-events-none">
                {/* Control Buttons */}
                <div
                    className="flex items-end justify-center h-full gap-3 md:gap-6 px-4 md:px-10 pb-8 pointer-events-auto"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {controls.map((control, index) => {
                        const Icon = control.icon;
                        const isActive = activeView === control.id;

                        // Calculate scale based on distance from hovered button (macOS Dock effect)
                        const getScale = () => {
                            if (hoveredIndex === null) return 1;
                            const distance = Math.abs(index - hoveredIndex);
                            if (distance === 0) return 1.4; // Hovered button
                            if (distance === 1) return 1.2; // Adjacent buttons
                            if (distance === 2) return 1.1; // Next adjacent
                            return 1; // Far buttons
                        };

                        // Calculate horizontal offset to prevent overlap
                        const getXOffset = () => {
                            if (hoveredIndex === null) return 0;
                            const distance = index - hoveredIndex;

                            // Push buttons apart based on their position relative to hovered button
                            if (distance > 0) {
                                // Buttons to the right - push right
                                if (distance === 1) return 20;
                                if (distance === 2) return 10;
                            } else if (distance < 0) {
                                // Buttons to the left - push left
                                if (distance === -1) return -20;
                                if (distance === -2) return -10;
                            }
                            return 0;
                        };

                        return (
                            <motion.button
                                key={control.id}
                                onClick={() => setActiveView(control.id as ViewType)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                className={`
                                    relative flex flex-col items-center justify-center
                                    w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg
                                    transition-colors duration-300 group origin-bottom
                                    ${isActive
                                        ? control.color === 'red'
                                            ? 'bg-red-500/20 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                                            : 'bg-cyan-500/20 border-2 border-cyan-500 shadow-[0_0_20px_rgba(0,229,255,0.6)]'
                                        : control.color === 'red'
                                            ? 'bg-white/5 border border-white/20 hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                                            : 'bg-white/5 border border-white/20 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                                    }
                                `}
                                animate={{
                                    scale: getScale(),
                                    y: hoveredIndex === index ? -10 : 0,
                                    x: getXOffset(),
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                {/* Status LED */}
                                <div className={`absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isActive ? (control.color === 'red' ? 'bg-red-400 shadow-[0_0_8px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_8px_#00e5ff]') : 'bg-gray-600'}`}>
                                    {isActive && (
                                        <motion.div
                                            className={`absolute inset-0 rounded-full ${control.color === 'red' ? 'bg-red-400' : 'bg-cyan-400'}`}
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-1 transition-colors ${isActive ? (control.color === 'red' ? 'text-red-400' : 'text-cyan-400') : (control.color === 'red' ? 'text-gray-500 group-hover:text-red-400' : 'text-gray-500 group-hover:text-cyan-400')}`} />
                                <span className={`text-[8px] md:text-[10px] font-mono font-bold tracking-wider ${isActive ? (control.color === 'red' ? 'text-red-400' : 'text-cyan-400') : (control.color === 'red' ? 'text-gray-500 group-hover:text-red-400' : 'text-gray-500 group-hover:text-cyan-400')}`}>
                                    {control.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-2 left-4 text-[8px] md:text-[10px] font-mono text-cyan-400/70">
                    <span>STATUS: NOMINAL</span>
                    <span className="hidden md:inline ml-2">|</span>
                    <span className="hidden md:inline ml-2">ENCRYPTION: AES-256</span>
                </div>
                <div className="absolute bottom-2 right-4 text-[8px] md:text-[10px] font-mono text-cyan-400/70">
                    <span className="hidden lg:inline">LAT: 34.0522° N | LON: 118.2437° W</span>
                </div>
            </div>

            {/* Scanlines Overlay */}
            <div className="pointer-events-none fixed inset-0 z-[60] opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>

            {/* Corner Accent Lines */}
            <div className="fixed top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none z-50" />
            <div className="fixed top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-500/50 pointer-events-none z-50" />
            <div className="fixed bottom-20 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-500/50 pointer-events-none z-50" />
            <div className="fixed bottom-20 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none z-50" />
        </div >
    );
};

export default CommandCenter;
