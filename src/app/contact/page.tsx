import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            <section className="bg-primary pt-32 pb-16 px-6 text-center text-white">
                <h1 className="heading-section text-white mb-4">CONTACT US</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-200">
                    Get in touch with Eastern Creek Soccer Club.
                </p>
            </section>

            <section className="flex-grow py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="heading-section text-primary text-3xl mb-8">GET IN TOUCH</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold mb-1">LOCATION</h3>
                                    <p className="text-gray-600">Eastern Creek Reserve<br />Rooty Hill Road South<br />Eastern Creek NSW 2766</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold mb-1">EMAIL</h3>
                                    <a href="mailto:sonialjohnston@hotmail.com" className="text-gray-600 hover:text-primary transition-colors">
                                        sonialjohnston@hotmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold mb-1">PHONE</h3>
                                    <a href="tel:0434672375" className="text-gray-600 hover:text-primary transition-colors">
                                        0434 672 375
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-full min-h-[400px] bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 font-bold">
                        GOOGLE MAP EMBED HERE
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
