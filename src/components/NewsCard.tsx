import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsCardProps {
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    slug: string;
}

export default function NewsCard({ title, excerpt, date, imageUrl, slug }: NewsCardProps) {
    return (
        <div className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Club News
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={14} className="mr-2" />
                    {date}
                </div>

                <h3 className="font-heading text-2xl text-primary font-bold mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 font-body text-sm flex-grow">
                    {excerpt}
                </p>

                <a
                    href={`/news/${slug}`}
                    className="inline-flex items-center text-primary font-bold text-sm tracking-wide group-hover:translate-x-1 transition-transform"
                >
                    READ MORE <ArrowRight size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
}
