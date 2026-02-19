import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TeamsPage() {
    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            {/* Simple Hero */}
            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-white mb-4">OUR TEAMS</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    From Under 6s to All Age - check out our squads for the 2026 season.
                </p>
            </section>

            {/* Content */}
            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="bg-white p-12 text-center border border-gray-100 shadow-sm">
                    <h2 className="font-heading text-3xl mb-4 text-primary">Team Information Coming Soon</h2>
                    <p className="text-gray-600">We are currently finalizing the team lists and schedules for 2026. Please check back shortly.</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
