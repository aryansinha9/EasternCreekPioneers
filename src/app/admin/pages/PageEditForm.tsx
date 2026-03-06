'use client'

import { useState, useTransition } from 'react'
import { savePageContent } from './actions'
import { ArrowLeft, Save, LayoutTemplate, Plus, Trash2, GripVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Section = {
    heading: string
    body: string
}

type PageData = {
    id: string
    slug: string
    title: string
    content: string
    sections: Section[]
}

const MAX_SECTIONS = 20

export default function PageEditForm({ initialData }: { initialData: PageData }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [sections, setSections] = useState<Section[]>(initialData.sections || [])

    const addSection = () => {
        if (sections.length >= MAX_SECTIONS) return
        setSections([...sections, { heading: '', body: '' }])
    }

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index))
    }

    const updateSection = (index: number, field: keyof Section, value: string) => {
        const updated = [...sections]
        updated[index] = { ...updated[index], [field]: value }
        setSections(updated)
    }

    const handleSubmit = (formData: FormData) => {
        // Inject sections as JSON into formData
        formData.set('sections', JSON.stringify(sections))

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

                    {/* Content Sections */}
                    <div className="border-t border-gray-200 pt-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-heading font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <GripVertical size={20} className="text-primary" /> Content Sections
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Add structured sections with headings and body text. These appear below the main content.
                                </p>
                            </div>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded">
                                {sections.length} / {MAX_SECTIONS}
                            </span>
                        </div>

                        {sections.length === 0 && (
                            <div className="border-2 border-dashed border-gray-200 rounded p-8 text-center text-gray-400 mb-6">
                                <p className="font-medium">No sections added yet.</p>
                                <p className="text-sm mt-1">Click &ldquo;Add Section&rdquo; below to create structured content blocks.</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <div key={index} className="border border-gray-200 rounded bg-gray-50 p-5 relative group">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">
                                            Section {index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded"
                                            title="Remove section"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Section Heading</label>
                                            <input
                                                type="text"
                                                value={section.heading}
                                                onChange={(e) => updateSection(index, 'heading', e.target.value)}
                                                placeholder="Enter section heading..."
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-heading text-lg tracking-wide bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Section Body</label>
                                            <textarea
                                                value={section.body}
                                                onChange={(e) => updateSection(index, 'body', e.target.value)}
                                                rows={6}
                                                placeholder="Enter section body text..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body text-base leading-relaxed resize-y bg-white"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addSection}
                            disabled={sections.length >= MAX_SECTIONS}
                            className="mt-6 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-primary hover:text-primary transition-colors font-bold uppercase tracking-wider text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-500"
                        >
                            <Plus size={18} />
                            {sections.length >= MAX_SECTIONS ? 'Maximum Sections Reached' : 'Add Section'}
                        </button>
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
