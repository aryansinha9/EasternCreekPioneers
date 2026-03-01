import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function TeamsPage() {
    const supabase = await createClient();

    const { data: sectionsData } = await supabase
        .from('registration_sections')
        .select('*')
        .order('order_index', { ascending: true });

    const sections = sectionsData || [];

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            {/* Simple Hero */}
            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section !text-white mb-4">OUR TEAMS</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    From Under 6s to All Age - check out our squads for the 2026 season.
                </p>
            </section>

            {/* Content */}
            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full space-y-16">

                {sections.length > 0 ? (
                    sections.map((section, index) => {
                        // Alternate styling between odd and even sections 
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={section.id}
                                className={`p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm ${isEven
                                    ? "bg-white border border-gray-100"
                                    : "bg-primary text-white border-l-8 border-secondary shadow-md"
                                    }`}
                            >
                                <div className="flex-1">
                                    <h2 className={`heading-section text-4xl mb-4 ${isEven ? 'text-primary' : '!text-white'}`}>
                                        {section.title}
                                    </h2>
                                    <p className={`font-body mb-8 text-lg ${isEven ? 'text-gray-600' : 'text-gray-200'}`}>
                                        {section.description}
                                    </p>

                                    <a
                                        href={section.button_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-block font-heading font-bold py-4 px-8 transition-all uppercase tracking-widest ${isEven
                                            ? "bg-secondary text-primary hover:bg-primary hover:text-white"
                                            : "bg-white text-primary hover:bg-secondary hover:text-primary"
                                            }`}
                                    >
                                        {section.button_label}
                                    </a>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white p-10 text-center text-gray-500 border border-gray-100">
                        No registration sections currently available. Please check back later.
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
