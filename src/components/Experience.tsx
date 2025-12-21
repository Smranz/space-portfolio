"use client";

import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-40 py-20" id="about-me">
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
                Crew Experience
            </h1>

            <div className="w-full max-w-[900px] flex flex-col gap-10 px-10">
                {/* Experience Card 1 */}
                <div className="flex flex-col md:flex-row gap-5 border border-[#7042f861] bg-[#0300145e] p-6 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 rounded-l-2xl"></div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-2xl font-bold text-white">Electronic Subsystem Engineer</h2>
                        <span className="text-sm text-gray-400">3 Years Experience</span>
                        <p className="text-gray-300 mt-2">
                            Specialized in designing and implementing IoT-based projects.
                            Expertise in microprocessor utilization including Arduino (UNO, Micro, Nano, Mega),
                            ESP (32, 32CAM, NodeMCU, ESP-S3), and Raspberry Pi.
                            Proficient in integrating hardware and software subsystems for seamless operation.
                        </p>
                    </div>
                </div>

                {/* Education Card */}
                <div className="flex flex-col md:flex-row gap-5 border border-[#7042f861] bg-[#0300145e] p-6 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 rounded-l-2xl"></div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-2xl font-bold text-white">BSCS Student</h2>
                        <span className="text-sm text-gray-400">Lahore Garrison University</span>
                        <p className="text-gray-300 mt-2">
                            Currently pursuing Bachelor of Science in Computer Science.
                            Applying theoretical knowledge to practical embedded systems and software development.
                        </p>
                    </div>
                </div>

                {/* Tools Card */}
                <div className="flex flex-col md:flex-row gap-5 border border-[#7042f861] bg-[#0300145e] p-6 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-pink-500 rounded-l-2xl"></div>
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-2xl font-bold text-white">Tools & Technologies</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["VS Code", "Arduino IDE", "React JS", "Node JS", "Cloud Services"].map((tool, i) => (
                                <span key={i} className="px-3 py-1 text-sm border border-pink-500/30 rounded-full bg-pink-500/10 text-pink-200">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experience;
