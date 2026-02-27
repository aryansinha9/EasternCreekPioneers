'use client'

import { useTransition, useState } from 'react'
import { saveSponsor } from './actions'
import { ArrowLeft, Save, Building } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Sponsor = {
    id?: string
    title: string
    image_url: string
}

export default function SponsorForm({ initialData }: { initialData?: Sponsor }) {
    const router = useRouter()
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
                const result = await saveSponsor(formData)
                if (result?.error) {
                    alert(result.error)
                } else {
                    router.push('/admin/sponsors')
                }
            } catch (err: any) {
                alert(`Unexpected error: ${err.message}`)
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/sponsors" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                    <ArrowLeft size={18} /> Back to Sponsors
                </Link>
                <h1 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-wider pl-4 border-l-2 border-primary flex items-center gap-2">
                    <Building size={24} className="text-primary" /> {initialData ? 'Edit Sponsor' : 'Add New Sponsor'}
                </h1>
            </div>

            <form action={handleSubmit} className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
                <input type="hidden" name="id" value={initialData?.id || ''} />
                <input type="hidden" name="existing_image_url" value={initialData?.image_url || ''} />

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Sponsor Name / Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={initialData?.title}
                            placeholder="e.g. Acme Corporation"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-lg font-medium"
                        />
                    </div>

                    <div className="border border-gray-200 p-6 rounded bg-gray-50 flex items-start flex-col md:flex-row gap-8">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Sponsor Logo *</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                required={!initialData?.id} // Require image only for new sponsors
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary hover:file:text-primary file:cursor-pointer transition-colors"
                            />
                            <p className="mt-2 text-xs text-gray-500 max-w-sm">
                                Upload a high-quality logo. Transparent PNGs work best. Leave blank when editing to keep the existing logo.
                            </p>
                        </div>

                        {previewImage && (
                            <div className="w-full md:w-64 aspect-video relative border border-gray-300 rounded overflow-hidden shadow-sm flex-shrink-0 bg-white flex items-center justify-center p-4">
                                <img src={previewImage} alt="Sponsor Logo Preview" className="max-w-full max-h-full object-contain" />
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
                        {isPending ? 'Saving...' : <><Save size={18} /> Save Sponsor</>}
                    </button>
                </div>
            </form>
        </div>
    )
}
