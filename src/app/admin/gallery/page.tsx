import { createClient } from '@/lib/supabase/server'
import { uploadImage } from './actions'
import GalleryList from './GalleryList'
import { Image as ImageIcon, Upload } from 'lucide-react'

export default async function GalleryAdminPage() {
    const supabase = await createClient()
    const { data: images } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wider flex items-center gap-3">
                    <ImageIcon className="text-primary" /> Manage Gallery
                </h1>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-200 mb-10">
                <h2 className="text-xl font-heading font-bold mb-6 uppercase tracking-wider text-primary flex items-center gap-2">
                    <Upload size={20} /> Upload New Image
                </h2>

                <form action={uploadImage} className="max-w-2xl bg-gray-50 p-6 border border-gray-100 rounded">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Select Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary hover:file:text-primary file:cursor-pointer transition-colors"
                            // Ensure form processes multipart correctly via the browser API
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

                    <button type="submit" className="mt-8 bg-primary text-white font-bold py-3 px-8 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm flex items-center gap-2">
                        <Upload size={18} /> Upload to Gallery
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-heading font-bold mb-6 uppercase tracking-wider text-gray-900">Current Gallery</h2>
                <GalleryList images={images || []} />
            </div>
        </div>
    )
}
