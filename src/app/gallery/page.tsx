import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import GalleryGrid from "./GalleryGrid";

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
                <GalleryGrid images={images || []} />
            </section>

            <Footer />
        </main>
    );
}
