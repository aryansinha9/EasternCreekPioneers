import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";

export default function NewsPage() {
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

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-white mb-4">LATEST NEWS</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    Keep up with the latest updates from Eastern Creek SC.
                </p>
            </section>

            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((news, index) => (
                        <NewsCard key={index} {...news} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
