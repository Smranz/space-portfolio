"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://formsubmit.co/ajax/samranzahid34@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Message from ${formData.name} - Space Portfolio`,
                    _replyto: formData.email,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center py-4 h-full relative z-[20] w-full"
        >
            <h1 className="text-xl md:text-[28px] font-semibold text-white py-2 md:py-3 font-orbitron">
                Comms Array
            </h1>

            <div className="w-full max-w-2xl px-4">
                <div className="relative rounded-lg border border-[#7042f861] bg-[#030014]/80 backdrop-blur-xl p-5 md:p-6 shadow-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="absolute top-0 left-0 w-full h-7 bg-gray-900 flex items-center px-3 gap-2 border-b border-gray-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        <div className="ml-3 font-mono text-[10px] text-gray-500">user@space-ship:~/contact</div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 font-mono">
                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-500 text-xs">{">"} Enter Identity:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Captain Name"
                                required
                                className="w-full bg-transparent border-b border-gray-700 text-white text-sm py-1.5 focus:border-cyan-500 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-500 text-xs">{">"} Enter Frequency (Email):</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@fleet.com"
                                required
                                className="w-full bg-transparent border-b border-gray-700 text-white text-sm py-1.5 focus:border-cyan-500 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-500 text-xs">{">"} Transmission Message:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Mission details..."
                                required
                                className="w-full bg-transparent border-b border-gray-700 text-white text-sm py-1.5 focus:border-cyan-500 outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Status Messages */}
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-green-400 text-sm"
                            >
                                <CheckCircle className="w-4 h-4" />
                                <span>Transmission successful! Message received.</span>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                <span>Transmission failed. Please try again.</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="self-end mt-2 px-5 py-1.5 bg-cyan-500/10 border border-cyan-500 text-cyan-500 text-sm rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? (
                                <>
                                    Transmitting
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Transmit
                                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
