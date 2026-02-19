"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background style logic
            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Smart Hide/Show Logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling DOWN -> Hide
                setIsVisible(false);
            } else {
                // Scrolling UP or at top -> Show
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "TEAMS", href: "/teams" },
        { name: "NEWS", href: "/news" },
        { name: "GALLERY", href: "/gallery" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
                    } ${isScrolled ? "bg-primary/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo (Top Left) */}
                    <Link href="/" className="relative w-48 h-16 md:w-64 md:h-20 flex items-center">
                        <Image
                            src="/EasternCHomelogo.svg"
                            alt="Eastern Creek Soccer Club"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Hamburger Menu Button (Always Visible) */}
                    <button
                        className="text-white focus:outline-none hover:text-secondary transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={40} strokeWidth={1.5} />
                    </button>
                </div>
            </header>

            {/* Mobile/Global Drawer */}
            <div className={`fixed inset-0 z-[60] ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                {/* Overlay - Fade In/Out */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Drawer - Slide In/Out */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-full md:w-[400px] bg-primary text-white p-10 shadow-2xl flex flex-col border-l border-white/10 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-end mb-12">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-secondary transition-colors">
                            <X size={40} strokeWidth={1.5} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-heading text-4xl hover:text-secondary transition-colors border-b border-white/10 pb-4 tracking-wide"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#register"
                            className="mt-8 bg-secondary text-primary font-heading font-bold py-5 px-6 text-center text-2xl hover:bg-white transition-all shadow-none uppercase tracking-widest block"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            JOIN THE CLUB
                        </Link>
                    </nav>

                    <div className="mt-auto text-center text-white/40 text-sm">
                        &copy; 2026 Eastern Creek SC
                    </div>
                </div>
            </div>
        </>
    );
}
