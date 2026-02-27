import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export const revalidate = 0;

export default async function GalleryPage() {
    const supabase = await createClient();
    const { data: images } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-white mb-4">PHOTO GALLERY</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    Capturing the spirit of the game.
                </p>
            </section>

            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images && images.length > 0 ? (
                        images.map((img) => (
                            <div key={img.id} className="relative aspect-square bg-gray-200 group overflow-hidden border border-gray-200 shadow-sm">
                                <Image
                                    src={img.image_url}
                                    alt={img.alt_text || 'Eastern Creek SC Gallery Image'}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center text-gray-500 border border-gray-200 bg-white">
                            <p className="text-xl font-medium">Gallery is currently empty.</p>
                            <p className="mt-2 text-sm text-gray-400">Check back later for new photos!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
