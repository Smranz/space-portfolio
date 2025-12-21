"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRightCircle } from "lucide-react";

export const slideInFromLeft = (delay: number) => {
    return {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: delay,
                duration: 0.5,
            },
        },
    };
};

export const slideInFromRight = (delay: number) => {
    return {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: delay,
                duration: 0.5,
            },
        },
    };
};

export const slideInFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
};

const HeroContent = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
        >
            <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
                <motion.div
                    variants={slideInFromTop}
                    className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] rounded-full w-fit flex flex-row items-center gap-2 bg-[#0300145e]"
                >
                    <Sparkles className="text-[#b49bff] mr-[10px] h-5 w-5" />
                    <h1 className="Welcome-text text-[13px] text-[#b49bff]">
                        Electronic Subsystem Engineer Portfolio
                    </h1>
                </motion.div>

                <motion.div
                    variants={slideInFromLeft(0.5)}
                    className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto leading-tight font-serif"
                >
                    <span>
                        Providing
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            the best{" "}
                        </span>
                        project experience
                    </span>
                </motion.div>

                <motion.p
                    variants={slideInFromLeft(0.8)}
                    className="text-lg text-gray-400 my-5 max-w-[600px]"
                >
                    I&apos;m an Electronic Subsystem Engineer with experience in Website,
                    Mobile, and Software development. Check out my projects and skills.
                </motion.p>

                <motion.a
                    variants={slideInFromLeft(1)}
                    href="#projects"
                    className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] bg-gradient-to-r from-purple-500 to-cyan-500 p-4 font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
                >
                    See Projects!
                </motion.a>
            </div>

            <motion.div
                variants={slideInFromRight(0.8)}
                className="w-full h-full flex justify-center items-center"
            >
                {/* Placeholder for a hero image or 3D model */}
                <div className="relative w-[650px] h-[650px] rounded-full border border-cyan-500/20 bg-gradient-to-tr from-purple-900/20 to-cyan-900/20 animate-pulse flex items-center justify-center">
                    <div className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/30 animate-spin-slow"></div>
                    <span className="text-cyan-200 font-mono text-xl animate-pulse">SYSTEM ONLINE</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HeroContent;
