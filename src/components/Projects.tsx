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
import { createPortal } from "react-dom";

// Sub-component for the global lightbox to avoid stacking context issues
const Lightbox = ({ src, isVideo, onClose }: { src: string; isVideo: boolean; onClose: () => void }) => {
    // Prevent body scroll when lightbox is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const content = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030014]/98 backdrop-blur-3xl px-4 md:px-20 py-10"
            onClick={onClose}
        >
            {/* Global HUD Scanning Line */}
            <motion.div
                className="absolute left-0 right-0 h-[1px] bg-cyan-500/20 shadow-[0_0_15px_rgba(0,255,255,0.3)] z-[10000] pointer-events-none"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* HUD Corners for Lightbox */}
            <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" />

            <motion.button
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute top-8 right-8 text-white/50 hover:text-red-500 transition-all z-[110] bg-white/5 border border-white/10 rounded-full p-4 backdrop-blur-xl hover:scale-110 active:scale-95 group shadow-2xl"
                onClick={onClose}
            >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full h-full flex items-center justify-center max-w-7xl group"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/5 bg-black/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] px-2">
                    {isVideo ? (
                        <video
                            src={src}
                            controls
                            autoPlay
                            className="max-w-full max-h-[85vh] rounded-lg border border-white/10"
                        />
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={src}
                                alt="Classified Mission Asset"
                                className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/10"
                            />
                        </div>
                    )}

                    {/* Asset Metadata HUD - Visible on Hover */}
                    <div className="absolute bottom-6 left-6 flex flex-col gap-1 font-mono text-[10px] text-cyan-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            ASSET_IDENTIFIED: CLASSIFIED
                        </span>
                        <span>RESOLUTION: OPTIMIZED_HD</span>
                        <span>FEED_STATUS: ENCRYPTED_STABLE</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    return createPortal(content, document.body);
};

const Projects = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeProject, setActiveProject] = useState<string>("cansat");

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

    const cansatVideos = ["/projects/cansat/cansat-video-1.mp4"];

    const steeringImages = [
        "/projects/f1-steering/steering-1.jpg",
        "/projects/f1-steering/steering-2.jpg",
        "/projects/f1-steering/steering-3.jpg",
        "/projects/f1-steering/steering-4.jpg",
        "/projects/f1-steering/steering-5.jpg",
        "/projects/f1-steering/steering-6.jpg",
        "/projects/f1-steering/steering-7.jpg",
        "/projects/f1-steering/steering-8.jpg",
    ];

    const steeringVideos = [
        "/projects/f1-steering/f1-steering-video.mp4",
        "/projects/f1-steering/f1-steering-video-2.mp4",
    ];

    const projects = [
        {
            id: "cansat",
            title: "CANSAT",
            description: "Atmospheric data collection satellite subsystem simulation. Designed for high-altitude sensor data transmission and real-time telemetry.",
            tech: ["Arduino", "Sensors", "Radio", "Telemetry"],
            icon: <Satellite className="w-20 h-20 text-cyan-400 group-hover:text-white transition-colors" />,
            hasGallery: true,
            assets: [...cansatVideos, ...cansatImages],
            color: "cyan"
        },
        {
            id: "f1-steering",
            title: "F1 Steering With GUI",
            description: "Custom F1-style steering wheel with integrated display telelmetry and force feedback integration.",
            tech: ["ESP32", "Nextion", "C++", "CAN Bus"],
            icon: <Car className="w-20 h-20 text-purple-400 group-hover:text-white transition-colors" />,
            hasGallery: true,
            assets: [...steeringVideos, ...steeringImages],
            color: "purple"
        },
        {
            id: "rc-car",
            title: "RC Car",
            description: "High-speed remote controlled vehicle with custom chassis, motor driver, and long-range RF control.",
            tech: ["Motor Drivers", "RF", "Power Systems", "PWM"],
            icon: <Radio className="w-20 h-20 text-pink-400 group-hover:text-white transition-colors" />,
            color: "pink"
        },
        {
            id: "logistic-robot",
            title: "Logistic Autonomous Robot",
            description: "Autonomous navigation robot for warehouse logistics with obstacle avoidance and path planning.",
            tech: ["ROS", "Lidar", "Python", "Computer Vision"],
            icon: <Bot className="w-20 h-20 text-yellow-400 group-hover:text-white transition-colors" />,
            color: "yellow"
        },
    ];

    const isVideo = (path: string) => path.endsWith('.mp4') || path.endsWith('.webm');

    const handleProjectSelect = (id: string) => {
        setActiveProject(id);
        const galleryElement = document.getElementById('project-gallery-view');
        if (galleryElement) {
            galleryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const activeProjectData = projects.find(p => p.id === activeProject);

    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-start py-8 h-full relative z-[20] overflow-y-auto no-scrollbar"
        >
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-[21]" />

            <h1 className="text-xl md:text-[28px] font-semibold text-white mt-20 mb-6 font-orbitron tracking-widest relative z-[22]">
                MISSION CONTROL: ASSETS
            </h1>

            <div className="w-full px-4 max-w-6xl mb-8 relative z-[22]">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full pb-10 px-5"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="pb-8">
                            <motion.div
                                onClick={() => project.hasGallery && handleProjectSelect(project.id)}
                                className={`
                                    group relative overflow-hidden rounded-2xl border backdrop-blur-md p-6 min-h-[380px] h-auto flex flex-col justify-between transition-all duration-500 cursor-pointer
                                    ${activeProject === project.id
                                        ? `border-${project.color}-500 shadow-[0_0_30px_rgba(var(--${project.color}-rgb),0.3)] bg-white/10`
                                        : 'border-[#7042f861] bg-[#0300145e] hover:border-white/40'
                                    }
                                `}
                            >
                                <div className={`absolute top-0 left-0 w-full h-[120px] bg-gradient-to-br from-${project.color}-900/40 to-transparent -z-10 group-hover:h-full transition-all duration-700 ease-out opacity-30`}></div>

                                <div className="flex justify-center items-center h-[120px] mb-4">
                                    <div className={`transition-transform duration-500 group-hover:scale-110 ${activeProject === project.id ? 'scale-110' : ''}`}>
                                        {project.icon}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-white font-orbitron tracking-tight">{project.title}</h2>
                                        {activeProject === project.id && (
                                            <div className={`w-2 h-2 rounded-full bg-${project.color}-400 animate-pulse`} />
                                        )}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full border border-${project.color}-500/30 bg-${project.color}-500/10 text-${project.color}-300 font-mono`}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`mt-6 flex items-center text-${project.color}-400 text-sm font-bold transition-all duration-300 ${activeProject === project.id ? 'translate-x-2' : 'group-hover:translate-x-2'}`}>
                                    {project.hasGallery ? "Access Mission File" : "Data Restricted"} <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Focused Mission Gallery Area */}
            <div id="project-gallery-view" className="w-full max-w-6xl px-4 mt-4 pb-24 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeProjectData && activeProjectData.hasGallery ? (
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent to-${activeProjectData.color}-500/50`}></div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className={`text-[10px] font-mono text-${activeProjectData.color}-400/70 tracking-[0.3em] uppercase`}>Encrypted Mission Repository</span>
                                    <h2 className={`text-xl md:text-2xl font-bold text-white font-orbitron tracking-widest`}>
                                        {activeProjectData.title} <span className={`text-${activeProjectData.color}-400`}>DATA_SETS</span>
                                    </h2>
                                </div>
                                <div className={`h-[1px] flex-1 bg-gradient-to-l from-transparent to-${activeProjectData.color}-500/50`}></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {activeProjectData.assets?.map((asset, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        className={`relative aspect-video md:aspect-square rounded-xl overflow-hidden border border-${activeProjectData.color}-500/30 group cursor-pointer bg-black/60 shadow-xl`}
                                        onClick={() => setSelectedImage(asset)}
                                    >
                                        {isVideo(asset) ? (
                                            <>
                                                <video
                                                    src={asset}
                                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                                    muted
                                                    loop
                                                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                                                    onMouseOut={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
                                                />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20 group-hover:bg-transparent transition-all duration-500">
                                                    <div className={`w-12 h-12 rounded-full border border-${activeProjectData.color}-500/50 bg-${activeProjectData.color}-500/20 backdrop-blur-sm flex items-center justify-center`}>
                                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[15px] border-l-white border-b-[8px] border-b-transparent ml-1 shadow-[0_0_10px_white]" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-white font-orbitron tracking-widest drop-shadow-md">ANALYZE_FOOTAGE</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Image
                                                    src={asset}
                                                    alt={`${activeProjectData.title} asset ${index}`}
                                                    fill
                                                    className="object-cover transition-all duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t from-${activeProjectData.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center`}>
                                                    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                                        <Maximize2 className="text-white w-5 h-5" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-${activeProjectData.color}-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-[300px] border border-white/5 bg-white/5 rounded-3xl backdrop-blur-sm"
                        >
                            <Radio className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
                            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Select a mission to view classified assets</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Global Lightbox for Gallery */}
            <AnimatePresence>
                {selectedImage && (
                    <Lightbox
                        src={selectedImage}
                        isVideo={isVideo(selectedImage)}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
