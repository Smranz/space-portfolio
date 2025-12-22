"use client";

import React from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Cpu, Code2, Globe } from "lucide-react";

const About = () => {
    return (
        <section
            id="about-me"
            className="flex flex-col items-center justify-center gap-2 h-full relative overflow-hidden py-4"
        >
            <div className="flex flex-col items-center justify-center w-full max-w-6xl z-[20] px-4">
                {/* Introduction Section with Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full mb-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl border border-cyan-500/30 bg-[#0300145e] backdrop-blur-md"
                >
                    {/* Profile Picture */}
                    {/* Profile Picture */}
                    <div className="relative flex-shrink-0 group cursor-pointer">
                        <div className="w-40 h-40 md:w-44 md:h-44 rounded-full border-2 border-cyan-500 p-1 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 relative overflow-hidden">
                            {/* Hover Image (Behind) - Always visible but covered by default */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <NextImage
                                    src="/profile-hover.png"
                                    alt="Samran Form"
                                    fill
                                    sizes="(max-width: 768px) 160px, 176px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Default Image (Front) - Fades out on hover */}
                            <div className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-10">
                                <NextImage
                                    src="/profile-pic.png"
                                    alt="Samran Zahid"
                                    fill
                                    sizes="(max-width: 768px) 160px, 176px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030014] animate-pulse z-20"></div>
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

                <h1 className="text-xl md:text-[28px] font-semibold text-white py-2 md:py-3 font-orbitron text-center w-full">
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
            </div>
        </section>
    );
};

export default About;
