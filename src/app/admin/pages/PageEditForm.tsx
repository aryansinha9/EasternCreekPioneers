'use client'

import { useTransition } from 'react'
import { savePageContent } from './actions'
import { ArrowLeft, Save, LayoutTemplate } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PageData = {
    id: string
    slug: string
    title: string
    content: string
}

export default function PageEditForm({ initialData }: { initialData: PageData }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await savePageContent(formData)
                if (result?.error) {
                    alert(result.error)
                } else {
                    router.push('/admin/pages')
                }
            } catch (err: any) {
                alert(`Unexpected error: ${err.message}`)
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col gap-4">
                <Link href="/admin/pages" className="text-gray-500 hover:text-primary transition-colors w-fit flex items-center gap-2 font-medium">
                    <ArrowLeft size={18} /> Back to Pages
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-wider pl-4 border-l-2 border-primary flex items-center gap-2">
                        <LayoutTemplate size={24} className="text-primary" /> Edit /{initialData.slug}
                    </h1>
                </div>
            </div>

            <form action={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
                <input type="hidden" name="id" value={initialData.id} />
                <input type="hidden" name="slug" value={initialData.slug} />

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Page Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={initialData.title}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-heading text-xl md:text-2xl tracking-wide"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-gray-700">Main Content *</label>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Line breaks are preserved beautifully</span>
                        </div>
                        <textarea
                            name="content"
                            required
                            rows={20}
                            defaultValue={initialData.content}
                            placeholder="Type or paste your page content here..."
                            className="w-full px-4 py-4 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body text-base md:text-lg leading-relaxed resize-y"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-bold py-4 px-10 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center gap-2 shadow-sm disabled:opacity-50 text-lg"
                    >
                        {isPending ? 'Saving...' : <><Save size={20} /> Publish Updates</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
