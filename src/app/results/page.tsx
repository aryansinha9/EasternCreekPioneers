import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MatchResultCard from "@/components/MatchResultCard"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0 // Opt out of static rendering for fresh results

export default async function ResultsPage() {
    const supabase = await createClient()

    // Fetch all results, ordered by date
    const { data: results } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 overflow-x-hidden">
            <Header />

            {/* Page Header */}
            <section className="bg-primary pt-32 pb-16 relative overflow-hidden text-center text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 uppercase tracking-wide">
                        Match Results
                    </h1>
                    <p className="text-xl text-gray-300">
                        All the latest scores from Eastern Creek SC
                    </p>
                </div>
            </section>

            {/* Results Grid */}
            <section className="py-24 bg-gray-50 flex-grow">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
                        {results && results.length > 0 ? (
                            results.map((result) => (
                                <div key={result.id} className="transform hover:scale-105 transition-transform duration-300">
                                    <MatchResultCard
                                        homeTeam={result.home_team}
                                        awayTeam={result.away_team}
                                        homeScore={result.home_score}
                                        awayScore={result.away_score}
                                        date={result.date}
                                        division={result.division}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-gray-500 font-medium">No match results available yet.</p>
                                <p className="text-gray-400 mt-2">Check back soon as the season progresses!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
