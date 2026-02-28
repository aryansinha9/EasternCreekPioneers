"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

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
        { name: "ABOUT", href: "/about" },
        { name: "REGISTRATION", href: "/teams" },
        { name: "NEWS", href: "/news" },
        { name: "FIXTURES & RESULTS", href: "/fixtures" },
        { name: "GALLERY", href: "/gallery" },
        { name: "SPONSORS", href: "/sponsors" },
        { name: "CLUB POLICIES", href: "/policies" },
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
                    {/* Logo (Left) */}
                    <Link href="/" className="relative w-48 h-16 md:w-64 md:h-20 flex items-center shrink-0">
                        <Image
                            src="/EasternCHomelogo.svg"
                            alt="Eastern Creek Soccer Club"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation (Center/Right) */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-heading text-base lg:text-lg transition-colors tracking-wide ${isActive ? "text-secondary font-bold border-b-2 border-secondary" : "text-white hover:text-secondary"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                        <a
                            href="https://playfootball.com.au/football-finder?st=location&lat=-33.8016&lng=150.8516&suburb=Eastern+Creek&state_code=NSW&postcode=2766&age=junior&clubId=74462#infoModal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-secondary text-primary font-heading font-bold py-2 px-5 rounded-sm lg:text-base hover:bg-white transition-all uppercase tracking-widest whitespace-nowrap"
                        >
                            JOIN
                        </a>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="lg:hidden text-white focus:outline-none hover:text-secondary transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={32} strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div className={`fixed inset-0 z-[60] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <div
                    className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-primary text-white p-8 shadow-2xl flex flex-col border-l border-white/10 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-secondary transition-colors">
                            <X size={32} strokeWidth={2} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-heading text-2xl transition-colors border-b border-white/10 pb-4 tracking-wide ${isActive ? "text-secondary font-bold" : "text-white hover:text-secondary"
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                        <a
                            href="https://playfootball.com.au/football-finder?st=location&lat=-33.8016&lng=150.8516&suburb=Eastern+Creek&state_code=NSW&postcode=2766&age=junior&clubId=74462#infoModal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 bg-secondary text-primary font-heading font-bold py-4 px-6 text-center text-xl hover:bg-white transition-all uppercase tracking-widest block rounded-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            JOIN THE CLUB
                        </a>
                    </nav>
                </div>
            </div>
        </>
    );
}

