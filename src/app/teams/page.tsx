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
            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full space-y-16">

                {/* 2026 Premiere League */}
                <div className="bg-white p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="heading-section text-primary text-4xl mb-4">2026 PREMIERE LEAGUE</h2>
                        <p className="font-body text-gray-600 mb-6 text-lg">
                            Represent Eastern Creek at the highest local level. We are building a competitive and dedicated squad for the upcoming season.
                        </p>
                        <a
                            href="https://app.360player.com/registration/ecpsc/ede1b5e3-33b9-4b61-a299-0656575508e8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-secondary text-primary font-heading font-bold py-4 px-8 hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                        >
                            PREMIERE LEAGUE EOI
                        </a>
                    </div>
                </div>

                {/* Youth Teams */}
                <div className="bg-primary text-white p-10 border-l-8 border-secondary flex flex-col md:flex-row items-center gap-10 shadow-md">
                    <div className="flex-1">
                        <h2 className="heading-section text-secondary text-4xl mb-4">YOUTH TEAMS</h2>
                        <p className="font-body text-gray-200 mb-6 text-lg">
                            Elite Youth program overseen by Joga Bonito Football Academy director Carlos Ribeiro. We are seeking EOIs for positions in Division 1 teams for 2026.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 font-heading text-xl mb-8">
                            <li className="flex items-center gap-2">• U5 - U6</li>
                            <li className="flex items-center gap-2">• U7 - U11</li>
                            <li className="flex items-center gap-2">• U12 - U14</li>
                            <li className="flex items-center gap-2">• U15 - U18</li>
                        </ul>
                        <a
                            href="https://app.360player.com/registration/ecpsc/6d593602-518a-4192-8582-52f81ce93cef"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-primary font-heading font-bold py-4 px-8 hover:bg-secondary hover:text-primary transition-all uppercase tracking-widest"
                        >
                            YOUTH TEAM EOI
                        </a>
                    </div>
                </div>

                {/* Elite Squad */}
                <div className="bg-white p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="heading-section text-primary text-4xl mb-4">ELITE SQUAD (U13's - U14's)</h2>
                        <p className="font-body text-gray-600 mb-6 text-lg">
                            Elite Youth program overseen by Joga Bonito Football Academy director Carlos Ribeiro. We are seeking EOIs for positions in Division 1 teams for 2026.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 font-heading text-xl text-primary mb-8">
                            <li className="flex items-center gap-2">• U5 - U6</li>
                            <li className="flex items-center gap-2">• U7 - U11</li>
                            <li className="flex items-center gap-2">• U12 - U14</li>
                            <li className="flex items-center gap-2">• U15 - U18</li>
                        </ul>
                        <a
                            href="https://app.360player.com/registration/ecpsc/6d593602-518a-4192-8582-52f81ce93cef"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-secondary text-primary font-heading font-bold py-4 px-8 hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                        >
                            ELITE SQUAD EOI
                        </a>
                    </div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
