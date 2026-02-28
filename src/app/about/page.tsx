import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export async function generateMetadata() {
    const supabase = await createClient();
    const { data } = await supabase.from('club_pages').select('title').eq('slug', 'about').single();

    return {
        title: `${data?.title || 'About Us'} | Eastern Creek SC`,
    }
}

export default async function AboutPage() {
    const supabase = await createClient();

    const { data: page } = await supabase
        .from('club_pages')
        .select('*')
        .eq('slug', 'about')
        .single();

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            {/* Simple Hero */}
            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-secondary mb-4">{page?.title || 'About Us'}</h1>
            </section>

            {/* Content */}
            <section className="flex-grow py-16 px-6 max-w-4xl mx-auto w-full">
                <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm">
                    {page?.content ? (
                        <div className="prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold">
                            {/* We split by line breaks and render paragraphs to preserve formatting purely via React */}
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
                </div>
            </section>

            <Footer />
        </main>
    );
}
