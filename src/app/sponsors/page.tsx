import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SponsorEOITab from "@/components/SponsorEOITab"
import { createClient } from '@/lib/supabase/server'
import Image from "next/image"

export const metadata = {
    title: 'Sponsors | Eastern Creek Soccer Club',
    description: 'We are incredibly grateful for the generous support of our sponsors. Discover the businesses that make Eastern Creek Soccer Club possible.',
}

export default async function SponsorsPage() {
    const supabase = await createClient()

    const { data: sponsors, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching sponsors:', error)
    }

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            {/* Page Header */}
            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-white mb-4">OUR SPONSORS</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    We are incredibly grateful for the generous support of our sponsors.
                </p>
            </section>

            {/* Sponsors Grid */}
            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full">
                {(!sponsors || sponsors.length === 0) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">New sponsors will be displayed here soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {sponsors.map((sponsor) => (
                            <div key={sponsor.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center group">
                                <div className="relative w-full aspect-square mb-6 bg-gray-50 rounded-sm p-4 border border-gray-100 group-hover:border-secondary transition-colors overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={sponsor.image_url}
                                        alt={sponsor.title}
                                        fill
                                        className="object-contain p-4 mix-blend-multiply"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className="font-heading font-bold text-xl text-primary mb-2 uppercase tracking-wider">{sponsor.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sponsor EOI Section */}
            <section className="bg-gray-100 py-16 px-6 w-full border-t border-gray-200">
                <div className="max-w-3xl mx-auto">
                    <SponsorEOITab />
                </div>
            </section>

            <Footer />
        </main>
    )
}
