"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { Sparkles, Cpu } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative flex flex-col h-full w-full items-center justify-center px-4 py-2" id="about-me">

            <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-6xl z-[20]"
            >
                <div className="h-full w-full flex flex-col gap-3 justify-center m-auto text-start">
                    <motion.div
                        variants={slideInFromTop}
                        className="Welcome-box py-[6px] px-[12px] border border-[#7042f88b] opacity-[0.9] rounded-full flex flex-row items-center justify-center w-fit bg-[#0300145e]"
                    >
                        <Sparkles className="text-[#b49bff] mr-[8px] h-4 w-4" />
                        <h1 className="Welcome-text text-[11px] font-bold text-[#b49bff]">
                            Electronic Subsystem Engineer Portfolio
                        </h1>
                    </motion.div>

                    <motion.div
                        variants={slideInFromLeft(0.5)}
                        className="flex flex-col gap-3 mt-2 text-4xl md:text-5xl font-bold text-white max-w-[600px] w-auto h-auto font-orbitron"
                    >
                        <span>
                            Commanding the
                            <span className="text-cyan-500">
                                {" "}
                                Hardware{" "}
                            </span>
                            Universe
                        </span>
                    </motion.div>

                    <motion.div
                        variants={slideInFromLeft(0.8)}
                        className="text-base text-gray-400 my-2 max-w-[600px]"
                    >
                        I'm a Subsystem Engineer specializing in IoT, Embedded Systems, and PCB Design.
                        Navigating through code and circuitry to build the future of connected devices.
                    </motion.div>
                </div>

                <motion.div
                    variants={slideInFromRight(0.8)}
                    className="w-full h-full flex justify-center items-center"
                >
                    {/* Placeholder for a cool 3D Orbit or Illustration */}
                    <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center">
                        {/* Inner ring - continuous floating animation */}
                        <div
                            className="absolute w-[200px] h-[200px] border-4 border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite,float_3s_ease-in-out_infinite]"
                            style={{
                                animation: 'spin 10s linear infinite, float 3s ease-in-out infinite'
                            }}
                        />
                        {/* Outer ring - continuous floating animation with offset */}
                        <div
                            className="absolute w-[300px] h-[300px] border-2 border-purple-500/10 rounded-full"
                            style={{
                                animation: 'spin 15s linear infinite reverse, float 4s ease-in-out infinite 0.5s'
                            }}
                        />
                        {/* Chip icon - slower rotation on hover */}
                        <motion.div
                            whileHover={{
                                scale: 1.2,
                                rotate: 360,
                                transition: { duration: 2, ease: "easeInOut" }
                            }}
                            className="cursor-pointer z-10"
                        >
                            <Cpu className="text-white w-20 h-20" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
