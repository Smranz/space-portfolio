"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
                <Link
                    href="#about-me"
                    className="h-auto w-auto flex flex-row items-center"
                >
                    <span className="font-bold ml-[10px] hidden md:block text-gray-300">
                        Electronic Subsystem Engineer
                    </span>
                </Link>

                <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
                    <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                        <Link href="#about-me" className="cursor-pointer hover:text-[#00E5FF] transition">
                            About
                        </Link>
                        <Link href="#skills" className="cursor-pointer hover:text-[#00E5FF] transition">
                            Skills
                        </Link>
                        <Link href="#projects" className="cursor-pointer hover:text-[#00E5FF] transition">
                            Projects
                        </Link>
                    </div>
                </div>

                <div className="flex flex-row gap-5">
                    <Link href="#contact" className="cursor-pointer text-gray-200 hover:text-[#00E5FF] transition font-semibold">
                        Contact Me
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
