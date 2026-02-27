'use client'

import { useTransition, useState } from 'react'
import { saveNews } from './actions'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

type NewsItem = {
    id?: string
    title: string
    excerpt: string
    content: string
    date: string
    image_url: string
}

export default function NewsForm({ initialData }: { initialData?: NewsItem }) {
    const [isPending, startTransition] = useTransition()
    const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewImage(url)
        }
    }

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await saveNews(formData)
                if (result?.error) {
                    alert(result.error)
                }
            } catch (err: any) {
                alert(`Unexpected error: ${err.message}`)
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/news" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                    <ArrowLeft size={18} /> Back to News
                </Link>
                <h1 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-wider pl-4 border-l-2 border-primary">
                    {initialData ? 'Edit News Article' : 'Create New Article'}
                </h1>
            </div>

            <form action={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
                <input type="hidden" name="id" value={initialData?.id || ''} />
                <input type="hidden" name="existing_image_url" value={initialData?.image_url || ''} />

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                placeholder="Article Title"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-lg font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Published Date</label>
                            <input
                                type="text"
                                name="date"
                                required
                                defaultValue={initialData?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                placeholder="e.g. Feb 15, 2026"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Short Excerpt</label>
                        <textarea
                            name="excerpt"
                            required
                            rows={2}
                            defaultValue={initialData?.excerpt}
                            placeholder="Will appear on the preview cards"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Content</label>
                        <textarea
                            name="content"
                            required
                            rows={12}
                            defaultValue={initialData?.content}
                            placeholder="Write your full article here..."
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body"
                        />
                    </div>

                    <div className="border border-gray-200 p-6 rounded bg-gray-50 flex items-start gap-8">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary hover:file:text-primary file:cursor-pointer transition-colors"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Leave blank to keep the existing image when editing. Upload an image for best results.
                            </p>
                        </div>

                        {previewImage && (
                            <div className="w-48 h-32 relative border border-gray-300 rounded overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                <img src={previewImage} alt="Preview" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-bold py-3 px-8 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : <><Save size={18} /> Save Article</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
