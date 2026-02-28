import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, Calendar, Trophy, ListOrdered } from "lucide-react";

export const metadata = {
    title: "Fixtures & Results | Eastern Creek SC",
    description: "View the latest fixtures, results, and ladders for Eastern Creek Soccer Club.",
};

export default function FixturesPage() {
    return (
        <main className="min-h-screen flex flex-col font-body">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <h1 className="heading-hero text-5xl md:text-7xl mb-6">FIXTURES & RESULTS</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">
                        Keep track of all upcoming matches and latest scores across the Blacktown District Soccer Football Association competitions.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-gray-50 flex-grow">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm text-center">
                        <h2 className="text-3xl font-heading text-primary font-bold mb-6">OFFICIAL LEAGUE DATA</h2>
                        <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
                            All official fixtures, match results, and competition ladders are managed externally through Dribl.
                            Click the links below to view the latest data for Eastern Creek SC teams.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Fixtures Button */}
                            <a
                                href="https://bdsfa.dribl.com/fixtures?season=3vmZMMMdq5&date_range=default&timezone=Australia%2FSydney"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-100 hover:border-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-primary mb-3">FIXTURES</h3>
                                <p className="text-gray-500 text-sm mb-6">View upcoming match schedules and ground locations.</p>
                                <span className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:text-secondary">
                                    View on Dribl <ExternalLink size={16} className="ml-2" />
                                </span>
                            </a>

                            {/* Results Button */}
                            <a
                                href="https://bdsfa.dribl.com/results?season=3vmZMMMdq5&date_range=default&timezone=Australia%2FSydney"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-100 hover:border-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <Trophy size={32} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-primary mb-3">RESULTS</h3>
                                <p className="text-gray-500 text-sm mb-6">Check the final scores from recent weekend matches.</p>
                                <span className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:text-secondary">
                                    View on Dribl <ExternalLink size={16} className="ml-2" />
                                </span>
                            </a>

                            {/* Ladders Button */}
                            <a
                                href="https://bdsfa.dribl.com/ladders?season=3vmZMMMdq5&ladder_type=regular&date_range=default&competition=1pN6pp80d0&timezone=Australia%2FSydney"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-gray-100 hover:border-primary hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <ListOrdered size={32} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-primary mb-3">LADDERS</h3>
                                <p className="text-gray-500 text-sm mb-6">See the current standings and league tables.</p>
                                <span className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:text-secondary">
                                    View on Dribl <ExternalLink size={16} className="ml-2" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
