"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Cpu, Code2, Globe } from "lucide-react";

const About = () => {
    const [isInteract, setIsInteract] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // Start false to prevent flash
    const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        // Snake Animation on Mount
        // We set isAnimating true after a tiny delay to ensure CSS is ready and prevent 0,0 flash
        let startTime: number | null = null;
        let animationFrameId: number;
        const duration = 2500; // Increased duration for smoother tail

        // Start animation after mount
        const startTimeout = setTimeout(() => {
            setIsAnimating(true);
            startTime = Date.now();
            animate();
        }, 800);

        const animate = () => {
            if (!startTime) return;
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (progress < 1) {
                // Generate a series of points for the tail
                // We calculate the position at 'progress' and several lagging points
                const tailLength = 10;
                const maskParts = [];

                for (let i = 0; i < tailLength; i++) {
                    // Lag factor (0 is head, 1 is end of tail)
                    const lag = i * 0.015; // Gap between tail segments
                    const p = Math.max(0, progress - lag);

                    if (p > 0) {
                        // Position Math (Same as before)
                        const startY = 320;
                        const endY = 40;
                        const currentY = startY - ((startY - endY) * p);

                        const centerX = 130;
                        const amplitude = 60;
                        const frequency = 8;
                        const currentX = centerX + (Math.sin(p * frequency) * amplitude);

                        // Size tapers off
                        // Head is 60px (Thicker), Tail end is ~30px
                        const size = 60 - (i * 3);
                        const opacity = 1; // Keep opaque for the mask

                        maskParts.push(`radial-gradient(circle ${size}px at ${currentX}px ${currentY}px, black 100%, transparent 100%)`);
                    }
                }

                // Apply the complex mask
                // We must use a direct ref or state. Since we need to update rapidy, direct ref to maskStyle state is hard.
                // But we are targeting a specific div.
                const revealImage = document.getElementById('reveal-image-layer');
                if (revealImage) {
                    const maskString = maskParts.join(', ');
                    revealImage.style.maskImage = maskString;
                    revealImage.style.webkitMaskImage = maskString;
                }

                animationFrameId = requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
                // Reset mask to allow normal hover to take over clean
                const revealImage = document.getElementById('reveal-image-layer');
                if (revealImage) {
                    revealImage.style.maskImage = '';
                    revealImage.style.webkitMaskImage = '';
                }
            }
        };

        return () => {
            clearTimeout(startTimeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (
        <section
            id="about-me"
            className="flex flex-col items-center justify-start gap-4 h-full relative overflow-y-auto py-8 no-scrollbar"
        >
            <div className="flex flex-col items-center w-full max-w-6xl z-[20] px-4 shrink-0">
                {/* Introduction Section with Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border border-cyan-500/30 bg-[#0300145e] backdrop-blur-md"
                >
                    {/* Profile Picture */}
                    {/* Profile Picture */}
                    <div
                        id="profile-card-container"
                        className="relative flex-shrink-0 cursor-pointer"
                        onMouseEnter={() => {
                            setIsAnimating(false); // Stop animation on interaction
                            setIsInteract(true);
                        }}
                        onMouseLeave={() => setIsInteract(false)}
                        onTouchStart={() => {
                            setIsAnimating(false);
                            setIsInteract(true);
                        }}
                        onTouchEnd={() => setIsInteract(false)}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.style.setProperty('--x', `${x}px`);
                            e.currentTarget.style.setProperty('--y', `${y}px`);
                        }}
                        onTouchMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const touch = e.touches[0];
                            const x = touch.clientX - rect.left;
                            const y = touch.clientY - rect.top;
                            e.currentTarget.style.setProperty('--x', `${x}px`);
                            e.currentTarget.style.setProperty('--y', `${y}px`);
                        }}
                    >
                        <div className="w-[220px] h-[280px] md:w-[260px] md:h-[340px] relative overflow-hidden group border-2 border-cyan-500/50 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm">

                            {/* Base Image (Normal) - Always Visible */}
                            <div className="absolute inset-0 z-10">
                                <NextImage
                                    src="/profile-pic.png"
                                    alt="Samran Zahid"
                                    fill
                                    sizes="(max-width: 768px) 220px, 260px"
                                    className="object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                                    priority
                                />
                            </div>

                            {/* Reveal Image (Hover) - Masked by Cursor */}
                            <div
                                id="reveal-image-layer"
                                className={`absolute inset-0 z-20 transition-opacity duration-200 ${isInteract || isAnimating ? 'opacity-100' : 'opacity-0'}`}
                                style={!isAnimating ? {
                                    maskImage: `
                                        radial-gradient(circle 40px at var(--x) var(--y), black 100%, transparent 100%),
                                        radial-gradient(circle 30px at calc(var(--x) + 20px) calc(var(--y) - 15px), black 100%, transparent 100%),
                                        radial-gradient(circle 30px at calc(var(--x) - 20px) calc(var(--y) + 10px), black 100%, transparent 100%),
                                        radial-gradient(circle 25px at calc(var(--x) + 15px) calc(var(--y) + 20px), black 100%, transparent 100%),
                                        radial-gradient(circle 25px at calc(var(--x) - 15px) calc(var(--y) - 20px), black 100%, transparent 100%)
                                    `,
                                    WebkitMaskImage: `
                                        radial-gradient(circle 40px at var(--x) var(--y), black 100%, transparent 100%),
                                        radial-gradient(circle 30px at calc(var(--x) + 20px) calc(var(--y) - 15px), black 100%, transparent 100%),
                                        radial-gradient(circle 30px at calc(var(--x) - 20px) calc(var(--y) + 10px), black 100%, transparent 100%),
                                        radial-gradient(circle 25px at calc(var(--x) + 15px) calc(var(--y) + 20px), black 100%, transparent 100%),
                                        radial-gradient(circle 25px at calc(var(--x) - 15px) calc(var(--y) - 20px), black 100%, transparent 100%)
                                    `,
                                } : undefined}
                            >
                                <NextImage
                                    src="/profile-hover.png"
                                    alt="Samran Form"
                                    fill
                                    sizes="(max-width: 768px) 220px, 260px"
                                    className="object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                                    priority
                                />
                            </div>
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute bottom-4 right-8 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030014] animate-pulse z-30 shadow-[0_0_10px_#22c55e]"></div>
                    </div>

                    {/* Introduction Text */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-bold text-white font-orbitron mb-1">
                            Samran Zahid
                        </h2>
                        <p className="text-cyan-400 text-sm md:text-base font-mono mb-2">
                            Computer Science Student | Hardware Engineer
                        </p>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                            Navigating the cosmos of embedded systems and IoT. Mission specialist in hardware-software integration,
                            charting new territories in PCB design and cloud connectivity. Ready to engineer the future, one circuit at a time.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex md:flex-col gap-3 md:gap-2 flex-shrink-0">
                        <div className="text-center px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                            <div className="text-cyan-400 text-lg md:text-xl font-bold font-mono">3.5</div>
                            <div className="text-gray-400 text-[10px] md:text-xs">Years</div>
                        </div>
                        <div className="text-center px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <div className="text-purple-400 text-lg md:text-xl font-bold font-mono">7+</div>
                            <div className="text-gray-400 text-[10px] md:text-xs">Projects</div>
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-xl md:text-[28px] font-semibold text-white py-2 md:py-3 font-orbitron text-center w-full mt-24">
                    Crew Profile
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 w-full">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center p-5 rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md hover:scale-105 transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 mb-3">
                            <Cpu className="text-cyan-400 w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2 font-orbitron">Engineering</h2>
                        <p className="text-gray-400 text-center text-sm">
                            3 Years of experience in Electronic Subsystems, creating robust hardware solutions for complex problems.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center p-5 rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md hover:scale-105 transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 mb-3">
                            <Code2 className="text-purple-400 w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2 font-orbitron">Development</h2>
                        <p className="text-gray-400 text-center text-sm">
                            Proficient in code: Arduino C++, React.js, Node.js. Bridging the gap between hardware and software.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center p-5 rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md hover:scale-105 transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 mb-3">
                            <Globe className="text-pink-400 w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold text-white mb-2 font-orbitron">Deployment</h2>
                        <p className="text-gray-400 text-center text-sm">
                            IoT Cloud integration, ensuring seamless communication across the globe. From ESP32 to the Cloud.
                        </p>
                    </motion.div>
                </div>
            </div >
        </section >
    );
};

export default About;
