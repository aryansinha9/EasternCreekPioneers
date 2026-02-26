"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/EaternCreekHomeImg.png"
                    alt="Eastern Creek Soccer Club Field"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay - STRONG Horizontal Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-left px-6 max-w-7xl mx-auto w-full flex flex-col items-start h-full justify-center">
                <div className="animate-fade-in-up drop-shadow-lg mb-8">
                    <h1 className="heading-hero text-white">
                        <span className="block text-6xl md:text-8xl lg:text-9xl">JOIN THE</span>
                        <span className="block text-secondary text-7xl md:text-9xl lg:text-[11rem] mt-[-10px] md:mt-[-20px]">LEGACY</span>
                    </h1>
                </div>
                <p className="font-body text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl animate-fade-in-up delay-100 font-medium leading-relaxed drop-shadow-md">
                    Eastern Creek Soccer Club - Since 1976. Building champions on and off the field.
                    Register now for the 2026 season.
                </p>

                <div className="flex flex-col md:flex-row gap-6 animate-fade-in-up delay-200">
                    <a
                        href="https://playfootball.com.au/football-finder?st=location&lat=-33.8016&lng=150.8516&suburb=Eastern+Creek&state_code=NSW&postcode=2766&age=junior&clubId=74462#infoModal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-secondary text-primary font-heading font-bold text-xl py-5 px-10 hover:bg-white transition-all shadow-none uppercase tracking-widest hover:pl-12 duration-300"
                    >
                        REGISTER FOR 2026 <MoveRight size={24} />
                    </a>
                    <a
                        href="/teams"
                        className="flex items-center gap-3 border-2 border-white/30 text-white font-heading font-bold text-xl py-5 px-10 hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm uppercase tracking-widest"
                    >
                        OUR TEAMS
                    </a>
                </div>
            </div>
        </section>
    );
}
