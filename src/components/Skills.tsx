"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Star } from "lucide-react";

// ============================================
// EDIT THIS ARRAY TO CHANGE PLANETS
// ============================================
const PLANETS = [
    {
        name: "Arduino",
        icon: "/arduino.png",
        color: "#06b6d4",
        x: 16,
        y: 30,
        mobileX: 20,
        mobileY: 25,
        size: 52,
        level: "Advanced",
        description: "Expert in Arduino programming for embedded systems and IoT devices.",
        experience: "3+ years",
        projects: ["CANSAT", "RC Car", "Smart Home"]
    },
    {
        name: "ESP32",
        icon: "/esp32.png",
        color: "#3b82f6",
        x: 26,
        y: 40,
        mobileX: 75,
        mobileY: 28,
        size: 48,
        level: "Advanced",
        description: "Proficient in ESP32 development with WiFi and Bluetooth integration.",
        experience: "2.5+ years",
        projects: ["F1 Steering", "IoT Dashboard"]
    },
    {
        name: "Raspberry Pi",
        icon: "/raspberry-pi.png",
        color: "#ec4899",
        x: 36,
        y: 32,
        mobileX: 30,
        mobileY: 40,
        size: 50,
        level: "Intermediate",
        description: "Experience with Raspberry Pi for robotics and automation projects.",
        experience: "2+ years",
        projects: ["Autonomous Robot", "Media Server"]
    },
    {
        name: "React.js",
        icon: "/reactjs.png",
        color: "#06b6d4",
        x: 52,
        y: 36,
        mobileX: 70,
        mobileY: 45,
        size: 64,
        level: "Advanced",
        description: "Building modern, responsive web applications with React ecosystem.",
        experience: "2+ years",
        projects: ["Portfolio Sites", "Dashboards"]
    },
    {
        name: "Node.js",
        icon: "/skills/nodejs.png",
        color: "#22c55e",
        x: 45,
        y: 42,
        mobileX: 25,
        mobileY: 55,
        size: 46,
        level: "Intermediate",
        description: "Backend development with Node.js and Express for APIs.",
        experience: "1.5+ years",
        projects: ["REST APIs", "IoT Backend"]
    },
    {
        name: "Next.js",
        icon: "/nextjs.png",
        color: "#ffffff",
        x: 74,
        y: 28,
        mobileX: 65,
        mobileY: 60,
        size: 52,
        level: "Intermediate",
        description: "Full-stack development with Next.js for modern web applications.",
        experience: "1+ year",
        projects: ["This Portfolio", "Web Apps"]
    },
    {
        name: "C++",
        icon: "/c++.png",
        color: "#3b82f6",
        x: 88,
        y: 24,
        mobileX: 80,
        mobileY: 15,
        size: 54,
        level: "Advanced",
        description: "Low-level programming for embedded systems and performance-critical applications.",
        experience: "3+ years",
        projects: ["Embedded Firmware", "Drivers"]
    },
    {
        name: "Python",
        icon: "/python.png",
        color: "#eab308",
        x: 14,
        y: 58,
        mobileX: 20,
        mobileY: 70,
        size: 56,
        level: "Intermediate",
        description: "Scripting, automation, and data processing with Python.",
        experience: "2+ years",
        projects: ["Automation Scripts", "Data Analysis"]
    },
    {
        name: "EasyEDA",
        icon: "/easyeda.png",
        color: "#22c55e",
        x: 32,
        y: 60,
        mobileX: 75,
        mobileY: 75,
        size: 54,
        level: "Intermediate",
        description: "PCB design and circuit schematic creation using EasyEDA platform.",
        experience: "2+ years",
        projects: ["Custom PCBs", "Circuit Design"]
    },
    {
        name: "Proteus 8 Pro",
        icon: "/proteus 8pro.png",
        color: "#3b82f6",
        x: 58,
        y: 56,
        mobileX: 35,
        mobileY: 82,
        size: 52,
        level: "Advanced",
        description: "Circuit simulation and PCB design with Proteus professional tools.",
        experience: "2.5+ years",
        projects: ["Simulation Projects", "PCB Layouts"]
    },
    {
        name: "IoT Cloud",
        icon: "/cloud.png",
        color: "#a855f7",
        x: 82,
        y: 58,
        mobileX: 80,
        mobileY: 88,
        size: 56,
        level: "Advanced",
        description: "Cloud integration for IoT devices with real-time data synchronization.",
        experience: "2.5+ years",
        projects: ["Cloud Dashboards", "Remote Monitoring"]
    },
];

export default function Skills() {
    const [selected, setSelected] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock scroll when planet is selected
    useEffect(() => {
        if (selected !== null) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
    }, [selected]);

    return (
        <section className="fixed inset-0 flex flex-col items-center pt-4 bg-[#030014] overflow-hidden">
            {/* Title */}
            <div className="relative z-50 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-orbitron">
                    Skills and Tools Scanner
                </h1>
                <p className="text-cyan-400 text-xs font-mono text-center">
                    &gt; SELECT_PLANET_TO_ANALYZE_CAPABILITIES
                </p>
            </div>

            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Planets Container */}
            <div className="fixed inset-0 pointer-events-none">
                {PLANETS.map((planet, index) => {
                    const isSelected = selected === index;
                    const iconSize = planet.size * 0.6;

                    const x = isMobile ? planet.mobileX : planet.x;
                    const y = isMobile ? planet.mobileY : planet.y;

                    return (
                        <div key={index}>
                            {/* Planet */}
                            <motion.div
                                className="absolute cursor-pointer pointer-events-auto"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: "translate(-50%, -50%)",
                                    zIndex: isSelected ? 100 : 10,
                                }}
                                onClick={() => setSelected(isSelected ? null : index)}
                                animate={{
                                    scale: isSelected ? 3 : 1,
                                    y: isSelected ? 0 : [0, -8, 0, 8, 0],
                                }}
                                transition={{
                                    scale: { type: "spring", damping: 15 },
                                    y: { duration: 4 + (index * 0.5), repeat: Infinity, ease: "easeInOut" }
                                }}
                                whileHover={!isSelected ? { scale: 1.2 } : {}}
                            >
                                <div
                                    className="rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        width: planet.size,
                                        height: planet.size,
                                        borderColor: planet.color,
                                        backgroundColor: `${planet.color}15`,
                                        boxShadow: isSelected ? `0 0 30px ${planet.color}` : "none",
                                    }}
                                >
                                    <img
                                        src={planet.icon}
                                        alt={planet.name}
                                        style={{ width: iconSize, height: iconSize }}
                                        className="object-contain z-10"
                                    />
                                </div>

                                {/* Pulsing rings when selected */}
                                {isSelected && (
                                    <>
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                                            style={{
                                                width: planet.size,
                                                height: planet.size,
                                                borderColor: planet.color,
                                            }}
                                            animate={{ scale: [1, 3], opacity: [1, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                                            style={{
                                                width: planet.size,
                                                height: planet.size,
                                                borderColor: planet.color,
                                            }}
                                            animate={{ scale: [1, 3], opacity: [1, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                                        />
                                    </>
                                )}
                            </motion.div>

                            {/* Info Card */}
                            <AnimatePresence>
                                {isSelected && (
                                    <>
                                        {isMobile ? (
                                            // Mobile: Centered Modal with Backdrop
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                                            >
                                                {/* Backdrop */}
                                                <div
                                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                                    onClick={() => setSelected(null)}
                                                />

                                                {/* Card */}
                                                <motion.div
                                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                                    className="w-full max-w-xs bg-[#030014]/95 border-2 rounded-xl p-5 relative z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                                    style={{ borderColor: planet.color }}
                                                >
                                                    {/* Close button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelected(null);
                                                        }}
                                                        className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
                                                    >
                                                        <X size={20} />
                                                    </button>

                                                    {/* Header */}
                                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${planet.color}30` }}>
                                                        <div
                                                            className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0"
                                                            style={{ borderColor: planet.color, backgroundColor: `${planet.color}15` }}
                                                        >
                                                            <img src={planet.icon} alt={planet.name} className="w-8 h-8 object-contain" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-bold text-xl">{planet.name}</h3>
                                                            <div className="flex items-center gap-1.5">
                                                                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                                                <span className="text-sm font-mono" style={{ color: planet.color }}>{planet.level}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="space-y-4">
                                                        <p className="text-gray-300 text-sm leading-relaxed">{planet.description}</p>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="rounded-lg p-3 bg-black/20" style={{ border: `1px solid ${planet.color}30` }}>
                                                                <div className="text-[10px] text-gray-500 font-mono mb-1">EXPERIENCE</div>
                                                                <div className="text-base font-bold" style={{ color: planet.color }}>{planet.experience}</div>
                                                            </div>
                                                            <div className="rounded-lg p-3 bg-purple-500/10 border border-purple-500/30">
                                                                <div className="text-[10px] text-purple-300/70 font-mono mb-1">PROJECTS</div>
                                                                <div className="text-base text-purple-400 font-bold">{planet.projects.length}</div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="text-[10px] text-gray-500 font-mono mb-2 flex items-center gap-1.5">
                                                                <Star className="w-3 h-3" />
                                                                NOTABLE MISSIONS
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {planet.projects.map((project, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="text-[10px] px-2.5 py-1 rounded-full border bg-black/30"
                                                                        style={{
                                                                            borderColor: `${planet.color}30`,
                                                                            color: planet.color
                                                                        }}
                                                                    >
                                                                        {project}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Scanning Animation */}
                                                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                                                        <motion.div
                                                            className="absolute inset-x-0 h-[2px]"
                                                            style={{ backgroundColor: planet.color }}
                                                            animate={{ y: [0, 600] }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ) : (
                                            // Desktop: Floating Card
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ type: "spring", damping: 20 }}
                                                className="fixed w-72 md:w-80 bg-[#030014]/95 backdrop-blur-xl border-2 rounded-lg p-4 pointer-events-auto overflow-hidden"
                                                style={{
                                                    left: planet.x > 70 ? '10%' : (planet.x < 30 ? `${planet.x + 25}%` : `${planet.x}%`),
                                                    top: planet.y > 50 ? '30%' : `${planet.y}%`,
                                                    transform: planet.x > 70
                                                        ? 'translateY(-50%)'
                                                        : (planet.x < 30
                                                            ? 'translateY(-50%)'
                                                            : (planet.x > 50
                                                                ? 'translate(calc(-100% - 200px), -50%)'
                                                                : 'translate(200px, -50%)')),
                                                    borderColor: planet.color,
                                                    boxShadow: `0 0 30px ${planet.color}40`,
                                                    zIndex: 200,
                                                }}
                                            >
                                                {/* Desktop Content (Simplified/Original) */}
                                                <button
                                                    onClick={() => setSelected(null)}
                                                    className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
                                                >
                                                    <X size={20} />
                                                </button>

                                                <div className="flex items-center gap-3 mb-3 pb-3 border-b" style={{ borderColor: `${planet.color}30` }}>
                                                    <div
                                                        className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                                                        style={{ borderColor: planet.color, backgroundColor: `${planet.color}15` }}
                                                    >
                                                        <img src={planet.icon} alt={planet.name} className="w-8 h-8 object-contain" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg">{planet.name}</h3>
                                                        <div className="flex items-center gap-1">
                                                            <Zap className="w-3 h-3 text-yellow-400" />
                                                            <span className="text-xs font-mono" style={{ color: planet.color }}>{planet.level}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-gray-300 text-xs leading-relaxed mb-3">{planet.description}</p>

                                                <div className="grid grid-cols-2 gap-2 mb-3">
                                                    <div className="rounded p-2" style={{ backgroundColor: `${planet.color}10`, border: `1px solid ${planet.color}30` }}>
                                                        <div className="text-[10px] text-gray-400 font-mono">EXPERIENCE</div>
                                                        <div className="text-sm font-bold" style={{ color: planet.color }}>{planet.experience}</div>
                                                    </div>
                                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                                                        <div className="text-[10px] text-gray-400 font-mono">PROJECTS</div>
                                                        <div className="text-sm text-purple-400 font-bold">{planet.projects.length}</div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="text-[10px] text-gray-400 font-mono mb-2 flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        NOTABLE MISSIONS
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {planet.projects.map((project, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[9px] px-2 py-1 rounded-full"
                                                                style={{
                                                                    backgroundColor: `${planet.color}10`,
                                                                    border: `1px solid ${planet.color}30`,
                                                                    color: planet.color
                                                                }}
                                                            >
                                                                {project}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Scanning Animation */}
                                                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                                                    <motion.div
                                                        className="absolute inset-x-0 h-[2px]"
                                                        style={{ backgroundColor: planet.color }}
                                                        animate={{ y: [0, 300] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
