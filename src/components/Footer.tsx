import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import GlareHover from "./GlareHover";

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-16 border-t-[6px] border-secondary">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1 flex flex-col items-start">
                    <div className="mb-8">
                        <GlareHover
                            width="auto"
                            height="auto"
                            background="transparent"
                            borderRadius="0"
                            borderColor="transparent"
                            glareColor="#ffffff"
                            glareOpacity={0.4}
                            glareAngle={-30}
                            glareSize={200}
                            transitionDuration={1000}
                            playOnce={false}
                            style={{
                                WebkitMaskImage: 'url(/ECFooterLogo.png)',
                                maskImage: 'url(/ECFooterLogo.png)',
                                WebkitMaskSize: 'contain',
                                maskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'left center',
                                maskPosition: 'left center'
                            }}
                        >
                            <div className="relative w-[32rem] h-32 md:w-[36rem] md:h-40">
                                <Image
                                    src="/ECFooterLogo.png"
                                    alt="Eastern Creek Soccer Club"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </GlareHover>
                    </div>
                    <p className="text-gray-300 mb-6 font-body text-sm leading-relaxed">
                        Eastern Creek is a Soccer Club in the Blacktown District Est 1974. Come and play the Creek Way.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/EasternCreekSC/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.instagram.com/easterncreekpioneersc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-heading text-xl mb-6 text-secondary tracking-wide">QUICK LINKS</h3>
                    <ul className="space-y-3 font-body text-gray-300">
                        <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="/teams" className="hover:text-white transition-colors">Our Teams</a></li>
                        <li><a href="/registration-info" className="hover:text-white transition-colors">Registration Info</a></li>
                        <li><a href="/fixtures" className="hover:text-white transition-colors">Fixtures & Results</a></li>
                        <li><a href="/policies" className="hover:text-white transition-colors">Club Policies</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-heading text-xl mb-6 text-secondary tracking-wide">CONTACT US</h3>
                    <ul className="space-y-4 font-body text-gray-300">
                        <li className="flex items-start gap-3">
                            <MapPin size={20} className="text-secondary shrink-0 mt-1" />
                            <span>
                                Morreau Reserve<br />
                                Rooty Hill Road South,<br />
                                Eastern Creek NSW 2766
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={20} className="text-secondary shrink-0" />
                            <a href="mailto:sonialjohnston@hotmail.com" className="hover:text-white transition-colors">
                                sonialjohnston@hotmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            {/* Phone Icon manually as MapPin/Mail are imported, need Phone */}
                            <span className="text-secondary font-bold">PH:</span>
                            <a href="tel:0434672375" className="hover:text-white transition-colors">
                                0434 672 375
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm font-body">
                &copy; {new Date().getFullYear()} Eastern Creek Soccer Club. All rights reserved.
            </div>
        </footer>
    );
}
