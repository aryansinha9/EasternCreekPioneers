"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import MatchResultCard from "@/components/MatchResultCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const newsItems = [
    {
      title: "Registration Open for 2026 Season",
      excerpt: "Join the legacy! Registrations are now open for all age groups, from Under 6s to All Age Men & Women. Secure your spot today.",
      date: "Feb 10, 2026",
      imageUrl: "/news-1.jpg",
      slug: "registration-2026",
    },
    {
      title: "Pre-Season Training Starts Next Week",
      excerpt: "Dust off your boots! Pre-season training for senior squads begins Tuesday, Feb 20th at Eastern Creek Reserve.",
      date: "Feb 12, 2026",
      imageUrl: "/news-2.jpg",
      slug: "pre-season-start",
    },
    {
      title: "New Club Jersey Revealed",
      excerpt: "We are proud to unveil our new kit for the 2026 season, featuring a modern take on our classic green and gold stripes.",
      date: "Jan 28, 2026",
      imageUrl: "/news-3.jpg",
      slug: "new-jersey-reveal",
    },
  ];

  const results = [
    {
      homeTeam: "Eastern Creek",
      awayTeam: "Rooty Hill FC",
      homeScore: 3,
      awayScore: 1,
      date: "Aug 24",
      division: "Premier League",
    },
    {
      homeTeam: "Eastern Creek",
      awayTeam: "Doonside Hawks",
      homeScore: 2,
      awayScore: 2,
      date: "Aug 24",
      division: "U16 Div 1",
    },
    {
      homeTeam: "Glenwood Redbacks",
      awayTeam: "Eastern Creek",
      homeScore: 0,
      awayScore: 4,
      date: "Aug 23",
      division: "All Age Ladies",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col font-body text-neutral-900 overflow-x-hidden">
      <Header />

      <Hero />

      {/* Latest News Section */}
      <section id="news" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="heading-section">Latest Club News</h2>
              <p className="text-gray-600 max-w-2xl text-lg">Stay up to date with everything happening at the Creek.</p>
            </div>
            <Link href="#news" className="hidden md:flex items-center text-primary font-bold hover:text-secondary transition-colors group">
              VIEW ALL NEWS <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="#news" className="flex items-center justify-center text-primary font-bold hover:text-secondary transition-colors">
              VIEW ALL NEWS <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Match Results Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4 text-white uppercase tracking-wide">Match Center</h2>
            <p className="text-gray-300 text-lg">Recent results from around the grounds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {results.map((result, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <MatchResultCard {...result} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="#fixtures" className="inline-block bg-white text-primary font-heading font-bold py-3 px-8 hover:bg-secondary hover:text-primary transition-all shadow-none uppercase tracking-widest">
              VIEW ALL FIXTURES
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="register" className="py-32 bg-secondary relative overflow-hidden flex items-center justify-center">
        {/* Angled background effect */}
        <div className="absolute inset-0 w-full h-full bg-primary/5 skew-y-3 transform scale-110 origin-top-left"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="heading-hero text-6xl md:text-8xl text-primary mb-8 drop-shadow-md">READY TO PLAY?</h2>
          <p className="font-body text-xl text-primary/80 mb-10 max-w-2xl mx-auto">
            Whether you're a beginner or a seasoned pro, there's a place for you at Eastern Creek.
            Join our growing family today for the 2026 season.
          </p>
          <button className="bg-primary text-white font-heading font-bold text-2xl py-5 px-12 hover:bg-white hover:text-primary transition-all shadow-none border border-transparent hover:border-primary uppercase tracking-widest">
            REGISTER NOW
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
