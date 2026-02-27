import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SponsorEOITab from "@/components/SponsorEOITab";
import ContactForm from "@/components/ContactForm";
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
                                    <p className="text-gray-600">Morreau Reserve<br />Rooty Hill Road South<br />Eastern Creek NSW 2766</p>
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

                    {/* Contact Form */}
                    {/* Contact Form */}
                    <div className="w-full">
                        <ContactForm />
                    </div>
                </div>

                {/* Map Embed - Reinstated */}
                <div className="w-full mt-12 bg-gray-200 overflow-hidden shadow-md border border-gray-100 rounded-sm">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.831904564927!2d150.85269097570483!3d-33.77789247326152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129b00130d564f%3A0xf92d8bbb81b1aa95!2seastern%20creek%20pioneers%20soccer%20club!5e1!3m2!1sen!2sau!4v1772162385905!5m2!1sen!2sau"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full object-cover"
                    ></iframe>
                </div>
            </section>

            {/* Expression of Interest Sections */}
            <section className="bg-gray-100 py-16 px-6 w-full border-t border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="heading-section text-primary text-4xl mb-4">GET INVOLVED</h2>
                        <p className="font-body text-gray-600 max-w-2xl mx-auto text-lg">
                            Join the Eastern Creek SC family off the field. We are always looking for passionate sponsors and coaches.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SponsorEOITab />

                        {/* Coach EOI */}
                        <div className="bg-white p-10 border-t-4 border-secondary hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <h3 className="font-heading text-3xl font-bold text-primary mb-4">BECOME A COACH</h3>
                            <p className="font-body text-gray-600 mb-8 flex-grow">
                                Passionate about football? We are looking for dedicated individuals to join our coaching team. Apply for our Coach EOI.
                            </p>
                            <a
                                href="https://app.360player.com/registration/ecpsc/32dd46db-10b6-4305-bfec-5bdd3dd8156b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-secondary text-primary font-heading font-bold text-xl py-4 px-8 hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                            >
                                COACH EOI
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main >
    );
}
