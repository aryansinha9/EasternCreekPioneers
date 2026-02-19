import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GalleryPage() {
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
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="aspect-square bg-gray-200 flex items-center justify-center text-gray-400 font-bold border border-gray-300">
                            PHOTO {item}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
