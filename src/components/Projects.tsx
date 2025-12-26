"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight, Satellite, Car, Bot, Radio, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const cansatImages = [
        "/projects/cansat/cansat-1.jpg",
        "/projects/cansat/cansat-2.jpg",
        "/projects/cansat/cansat-3.jpg",
        "/projects/cansat/cansat-4.jpg",
        "/projects/cansat/cansat-5.jpg",
        "/projects/cansat/cansat-6.jpg",
        "/projects/cansat/cansat-7.jpg",
        "/projects/cansat/cansat-8.jpg",
    ];

    const steeringImages = [
        "/projects/f1-steering/steering-1.jpg",
        "/projects/f1-steering/steering-2.jpg",
        "/projects/f1-steering/steering-3.jpg",
        "/projects/f1-steering/steering-4.jpg",
        "/projects/f1-steering/steering-5.jpg",
    ];

    const projects = [
        {
            id: "cansat",
            title: "CANSAT",
            description: "Atmospheric data collection satellite subsystem simulation. Designed for high-altitude sensor data transmission and real-time telemetry.",
            tech: ["Arduino", "Sensors", "Radio", "Telemetry"],
            icon: <Satellite className="w-20 h-20 text-cyan-400 group-hover:text-white transition-colors" />,
            hasGallery: true
        },
        {
            id: "f1-steering",
            title: "F1 Steering With GUI",
            description: "Custom F1-style steering wheel with integrated display telelmetry and force feedback integration.",
            tech: ["ESP32", "Nextion", "C++", "CAN Bus"],
            icon: <Car className="w-20 h-20 text-purple-400 group-hover:text-white transition-colors" />,
            hasGallery: true
        },
        {
            id: "rc-car",
            title: "RC Car",
            description: "High-speed remote controlled vehicle with custom chassis, motor driver, and long-range RF control.",
            tech: ["Motor Drivers", "RF", "Power Systems", "PWM"],
            icon: <Radio className="w-20 h-20 text-pink-400 group-hover:text-white transition-colors" />,
        },
        {
            id: "logistic-robot",
            title: "Logistic Autonomous Robot",
            description: "Autonomous navigation robot for warehouse logistics with obstacle avoidance and path planning.",
            tech: ["ROS", "Lidar", "Python", "Computer Vision"],
            icon: <Bot className="w-20 h-20 text-yellow-400 group-hover:text-white transition-colors" />,
        },
    ];

    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-start py-8 h-full relative z-[20] overflow-y-auto no-scrollbar"
        >
            <h1 className="text-xl md:text-[28px] font-semibold text-white mt-20 mb-6 font-orbitron tracking-widest">
                MISSION LOG
            </h1>

            <div className="w-full px-4 max-w-6xl mb-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full pb-8 px-5"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="pb-8">
                            <div className="group relative overflow-hidden rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md p-6 min-h-[350px] h-auto flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-500">
                                <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-br from-purple-900/40 to-cyan-900/40 -z-10 group-hover:h-full transition-all duration-700 ease-out"></div>

                                <div className="flex justify-center items-center h-[120px]">
                                    {project.icon}
                                </div>

                                <div className="flex flex-col gap-3 mt-4">
                                    <h2 className="text-xl font-bold text-white font-orbitron">{project.title}</h2>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="mt-6 flex items-center text-cyan-400 text-sm font-bold group-hover:translate-x-2 transition-transform cursor-pointer"
                                    onClick={() => {
                                        if (project.hasGallery) {
                                            document.getElementById(`${project.id}-gallery`)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {project.hasGallery ? "View Mission Assets" : "Mission Details"} <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* CanSat Mission Gallery Section */}
            <div id="cansat-gallery" className="w-full max-w-6xl px-4 mt-8 pb-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                        <h2 className="text-lg md:text-xl font-bold text-cyan-400 font-orbitron tracking-wider">
                            MISSION ASSETS: CANSAT
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {cansatImages.map((src, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden border border-cyan-500/30 group cursor-pointer bg-black/40"
                                onClick={() => setSelectedImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`CanSat mission asset ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="text-white w-6 h-6" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* F1 Steering Mission Gallery Section */}
            <div id="f1-steering-gallery" className="w-full max-w-6xl px-4 mt-8 pb-20">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/50"></div>
                        <h2 className="text-lg md:text-xl font-bold text-purple-400 font-orbitron tracking-wider">
                            MISSION ASSETS: F1 STEERING
                        </h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-purple-500/50"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {steeringImages.map((src, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden border border-purple-500/30 group cursor-pointer bg-black/40"
                                onClick={() => setSelectedImage(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`F1 Steering mission asset ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="text-white w-6 h-6" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox for Gallery */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-10 right-10 text-white hover:text-cyan-400 transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-10 h-10" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full h-full max-w-5xl max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Full size mission asset"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;

