'use client'

import { useTransition } from 'react'
import { uploadImage } from './actions'
import { Upload } from 'lucide-react'

export default function UploadForm() {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await uploadImage(formData)
                // If the action returned an error, show it
                if (result?.error) {
                    alert(result.error)
                }
                // If success, the form will just reset or the page will revalidate and show the new image
            } catch (err: any) {
                alert(`Unexpected error: ${err.message}`)
            }
        })
    }

    return (
        <form action={handleSubmit} className="max-w-2xl bg-gray-50 p-6 border border-gray-100 rounded">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary hover:file:text-primary file:cursor-pointer transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Alt Text / Description (Optional)</label>
                    <input
                        type="text"
                        name="alt_text"
                        placeholder="Describe the image for accessibility and tooltip"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="mt-8 bg-primary text-white font-bold py-3 px-8 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
                <Upload size={18} /> {isPending ? 'Uploading...' : 'Upload to Gallery'}
            </button>
        </form>
    )
}
