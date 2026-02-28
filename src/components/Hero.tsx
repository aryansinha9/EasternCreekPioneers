"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hmpgbg.png"
                    alt="Eastern Creek Soccer Club Field"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay - STRONG Horizontal Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 lg:from-primary/90 via-primary/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-left px-6 max-w-7xl mx-auto w-full flex flex-col items-start h-full justify-center pt-16">
                <div className="animate-fade-in-up drop-shadow-lg mb-6">
                    <h1 className="heading-hero text-white leading-none">
                        <span className="block text-4xl md:text-6xl lg:text-7xl mb-2">JOIN US AND</span>
                        <span className="block text-secondary text-5xl md:text-7xl lg:text-8xl mt-[-5px]">PLAY THE CREEK WAY</span>
                    </h1>
                </div>
                <p className="font-body text-base md:text-xl text-gray-100 mb-8 max-w-3xl animate-fade-in-up delay-100 font-medium leading-relaxed drop-shadow-md">
                    Building a stronger community through passion and teamwork.
                    Be part of Eastern Creek SC's lasting legacy and register for the upcoming season.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up delay-200">
                    <a
                        href="https://playfootball.com.au/football-finder?st=location&lat=-33.8016&lng=150.8516&suburb=Eastern+Creek&state_code=NSW&postcode=2766&age=junior&clubId=74462#infoModal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-secondary text-primary font-heading font-bold text-lg md:text-xl py-4 px-8 hover:bg-white transition-all shadow-none uppercase tracking-widest hover:pl-10 duration-300"
                    >
                        REGISTER NOW <MoveRight size={24} />
                    </a>
                    <a
                        href="/teams"
                        className="flex items-center justify-center gap-3 border-2 border-white/30 text-white font-heading font-bold text-lg md:text-xl py-4 px-8 hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm uppercase tracking-widest text-center"
                    >
                        REGISTRATION INFO
                    </a>
                </div>
            </div>
        </section>
    );
}
