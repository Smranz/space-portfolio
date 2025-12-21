"use client";

import React, { useEffect, useState } from "react";

const HudOverlay = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toISOString().split("T")[1].split(".")[0]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] w-full h-full overflow-hidden">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 pointer-events-none" />

            {/* Corner Brackets */}
            {/* Top Left */}
            <div className="absolute top-5 left-5 w-64 h-24 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-xl opacity-80" />
            <div className="absolute top-5 left-5 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#00e5ff]" />
            <div className="absolute top-6 left-8 text-[10px] font-mono text-cyan-500/80 tracking-widest">
                SYS.ONLINE // {time}
            </div>

            {/* Top Right */}
            <div className="absolute top-5 right-5 w-64 h-24 border-r-2 border-t-2 border-purple-500/50 rounded-tr-xl opacity-80" />
            <div className="absolute top-5 right-5 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#7042f8]" />
            <div className="absolute top-6 right-8 text-[10px] font-mono text-purple-500/80 tracking-widest text-right">
                SECURE CONNECTION
                <br />
                ENCRYPTION: AES-256
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-5 left-5 w-64 h-24 border-l-2 border-b-2 border-cyan-500/50 rounded-bl-xl opacity-80" />
            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-cyan-500/80 tracking-widest">
                COORDINATES: 34.0522° N, 118.2437° W
                <br />
                STATUS: NOMINAL
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-5 right-5 w-64 h-24 border-r-2 border-b-2 border-purple-500/50 rounded-br-xl opacity-80" />

            {/* Center Crosshair (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full opacity-20 pointer-events-none flex items-center justify-center">
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="absolute w-10 h-[1px] bg-white/10" />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>
    );
};

export default HudOverlay;
