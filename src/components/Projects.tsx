"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight, Satellite, Car, Bot, Radio } from "lucide-react";

const Projects = () => {
    const projects = [
        {
            title: "CANSAT",
            description: "Atmospheric data collection satellite subsystem simulation.",
            tech: ["Arduino", "Sensors", "Radio"],
            icon: <Satellite className="w-20 h-20 text-cyan-400 group-hover:text-white transition-colors" />,
        },
        {
            title: "F1 Steering With GUI",
            description: "Custom F1-style steering wheel with integrated display telelmetry.",
            tech: ["ESP32", "Nextion", "C++"],
            icon: <Car className="w-20 h-20 text-purple-400 group-hover:text-white transition-colors" />,
        },
        {
            title: "RC Car",
            description: "High-speed remote controlled vehicle with custom chassis and motor driver.",
            tech: ["Motor Drivers", "RF", "Power Systems"],
            icon: <Radio className="w-20 h-20 text-pink-400 group-hover:text-white transition-colors" />,
        },
        {
            title: "Logistic Autonomous Robot",
            description: "Autonomous navigation robot for warehouse logistics.",
            tech: ["ROS", "Lidar", "Python"],
            icon: <Bot className="w-20 h-20 text-yellow-400 group-hover:text-white transition-colors" />,
        },
    ];

    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-start py-8 h-full relative z-[20] overflow-y-auto no-scrollbar"
        >
            <h1 className="text-xl md:text-[28px] font-semibold text-white mt-20 mb-6 font-orbitron">
                Mission Log
            </h1>

            <div className="w-full flex-1 flex flex-col justify-center px-4 max-w-6xl pb-32">
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
                            <div className="group relative overflow-hidden rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md p-4 min-h-[320px] h-auto flex flex-col justify-between hover:shadow-[0_0_20px_rgba(112,66,248,0.5)] transition-all duration-300">

                                <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-br from-purple-900/50 to-cyan-900/50 -z-10 group-hover:h-full transition-all duration-500 ease-out"></div>

                                <div className="flex justify-center items-center h-[100px]">
                                    {project.icon}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h2 className="text-lg font-bold text-white font-orbitron mt-2">{project.title}</h2>
                                    <p className="text-gray-300 text-xs">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[9px] px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center text-cyan-400 text-xs font-bold group-hover:translate-x-2 transition-transform cursor-pointer">
                                    View Details <ArrowRight className="w-3 h-3 ml-2" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Projects;
