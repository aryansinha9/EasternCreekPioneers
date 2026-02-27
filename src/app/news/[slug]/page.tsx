import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

export const revalidate = 0

export default async function NewsArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('news')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .single()

    if (!article) {
        notFound()
    }

    return (
        <main className="min-h-screen flex flex-col font-body text-neutral-900 bg-gray-50">
            <Header />

            <section className="pt-32 pb-12 px-6 max-w-4xl mx-auto w-full">
                <Link href="/news" className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors mb-8">
                    <ArrowLeft size={18} className="mr-2" /> BACK TO NEWS
                </Link>

                {article.image_url && (
                    <div className="relative w-full aspect-[21/9] rounded overflow-hidden shadow-sm mb-10">
                        <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="flex items-center text-gray-500 font-medium mb-4">
                    <Calendar size={18} className="mr-2" /> {article.date}
                </div>

                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="prose prose-lg max-w-none text-gray-700">
                    {article.content.split('\n').map((paragraph: string, index: number) => (
                        paragraph.trim() ? <p key={index} className="mb-6">{paragraph}</p> : null
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}
