import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import MatchResultCard from "@/components/MatchResultCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const { data: newsData } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);
  const newsItems = newsData || [];

  const { data: sponsorsData } = await supabase
    .from('sponsors')
    .select('id, title, image_url')
    .order('created_at', { ascending: true });
  const sponsors = sponsorsData || [];

  const { data: resultsData } = await supabase
    .from('results')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const results = resultsData || [];

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
            {newsItems.length > 0 ? (
              newsItems.map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  date={news.date}
                  imageUrl={news.image_url || '/placeholder-news.jpg'}
                  slug={news.slug}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white border border-gray-100">
                No news articles available.
              </div>
            )}
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
                <MatchResultCard
                  homeTeam={result.home_team}
                  awayTeam={result.away_team}
                  homeScore={result.home_score}
                  awayScore={result.away_score}
                  date={result.date}
                  division={result.division}
                />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/results" className="inline-block bg-white text-primary font-heading font-bold py-3 px-8 hover:bg-secondary hover:text-primary transition-all shadow-none uppercase tracking-widest">
              VIEW ALL RESULTS
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
          <a
            href="https://playfootball.com.au/football-finder?st=location&lat=-33.8016&lng=150.8516&suburb=Eastern+Creek&state_code=NSW&postcode=2766&age=junior&clubId=74462#infoModal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white font-heading font-bold text-2xl py-5 px-12 hover:bg-white hover:text-primary transition-all shadow-none border border-transparent hover:border-primary uppercase tracking-widest"
          >
            REGISTER NOW
          </a>
        </div>
      </section>

      {/* Sponsors Section */}
      {
        sponsors.length > 0 && (
          <section className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="heading-section text-4xl mb-12">OUR SPONSORS</h2>

              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {sponsors.map((sponsor) => (
                  <Link key={sponsor.id} href="/sponsors" className="relative h-20 w-32 md:h-24 md:w-40 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 group">
                    <Image
                      src={sponsor.image_url}
                      alt={sponsor.title}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/sponsors" className="text-gray-500 hover:text-primary font-bold transition-colors text-sm uppercase tracking-wider">
                  View All Sponsors &rarr;
                </Link>
              </div>
            </div>
          </section>
        )
      }

      <Footer />
    </main >
  );
}
