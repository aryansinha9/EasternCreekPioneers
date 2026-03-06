import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export async function generateMetadata() {
    const supabase = await createClient();
    const { data } = await supabase.from('club_pages').select('title').eq('slug', 'policies').single();

    return {
        title: `${data?.title || 'Club Policies'} | Eastern Creek SC`,
    }
}

export default async function PoliciesPage() {
    const supabase = await createClient();

    const { data: page } = await supabase
        .from('club_pages')
        .select('*')
        .eq('slug', 'policies')
        .single();

    const sections: { heading: string; body: string }[] = page?.sections || [];

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            {/* Simple Hero */}
            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-secondary mb-4">{page?.title || 'Club Policies'}</h1>
            </section>

            {/* Content */}
            <section className="flex-grow py-16 px-6 max-w-4xl mx-auto w-full">
                <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm">
                    {page?.content ? (
                        <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6 prose-li:text-gray-700">
                            {/* Line break preservation */}
                            {page.content.split('\n').map((paragraph: string, index: number) => {
                                if (paragraph.trim() === '') return <br key={index} aria-hidden="true" />;
                                return (
                                    <p key={index} className="mb-6 leading-relaxed">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            Page content is currently being updated.
                        </div>
                    )}

                    {/* Structured Sections */}
                    {sections.length > 0 && (
                        <div className="mt-12 space-y-10 border-t border-gray-100 pt-10">
                            {sections.map((section, index) => (
                                <div key={index}>
                                    {section.heading && (
                                        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                                            {section.heading}
                                        </h2>
                                    )}
                                    {section.body && (
                                        <div className="prose prose-lg max-w-none prose-p:text-gray-700">
                                            {section.body.split('\n').map((paragraph: string, pIndex: number) => {
                                                if (paragraph.trim() === '') return <br key={pIndex} aria-hidden="true" />;
                                                return (
                                                    <p key={pIndex} className="mb-4 leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* BDSFA Resources Link */}
                <div className="mt-8 text-center">
                    <a
                        href="https://bdsfa.com/resources/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-white font-heading font-bold py-4 px-10 text-lg hover:bg-secondary hover:text-primary transition-all uppercase tracking-widest shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        BDSFA Resources
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
