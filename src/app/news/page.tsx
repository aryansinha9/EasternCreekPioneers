import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function NewsPage() {
    const supabase = await createClient();
    const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    const newsItems = newsData || [];


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
                        <div className="col-span-full py-20 text-center text-gray-500 bg-white border border-gray-100 text-lg">
                            Check back soon for the latest club news!
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
