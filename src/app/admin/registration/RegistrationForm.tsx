'use client'

import { useTransition } from 'react'
import { saveRegistrationSection } from './actions'
import { ArrowLeft, Save, ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Section = {
    id?: string
    title: string
    description: string
    button_label: string
    button_link: string
    order_index: number
}

export default function RegistrationForm({ initialData }: { initialData?: Section }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await saveRegistrationSection(formData)
                if (result?.error) {
                    alert(result.error)
                } else {
                    router.push('/admin/registration')
                }
            } catch (err: any) {
                alert(`Unexpected error: ${err.message}`)
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex flex-col gap-4">
                <Link href="/admin/registration" className="text-gray-500 hover:text-primary transition-colors w-fit flex items-center gap-2 font-medium">
                    <ArrowLeft size={18} /> Back to Registration
                </Link>
                <h1 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-wider pl-4 border-l-2 border-primary flex items-center gap-2">
                    <ClipboardList size={24} className="text-primary" /> {initialData ? 'Edit Section' : 'Add New Section'}
                </h1>
            </div>

            <form action={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
                <input type="hidden" name="id" value={initialData?.id || ''} />

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Section Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                placeholder="e.g. 2026 PREMIERE LEAGUE"
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Display Order *</label>
                            <input
                                type="number"
                                name="order_index"
                                required
                                defaultValue={initialData?.order_index || 0}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                            />
                            <p className="mt-1 text-xs text-gray-500">Lower numbers appear first on the page.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            defaultValue={initialData?.description}
                            placeholder="Enter the section details here..."
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                        ></textarea>
                    </div>

                    <div className="border border-gray-200 p-6 rounded bg-gray-50 flex flex-col gap-6">
                        <h3 className="font-heading font-bold text-primary tracking-wide">BUTTON SETTINGS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Button Label *</label>
                                <input
                                    type="text"
                                    name="button_label"
                                    required
                                    defaultValue={initialData?.button_label}
                                    placeholder="e.g. APPLY NOW"
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Button Link (URL) *</label>
                                <input
                                    type="url"
                                    name="button_link"
                                    required
                                    defaultValue={initialData?.button_link}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium text-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary text-white font-bold py-3 px-8 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : <><Save size={18} /> Save Section</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
