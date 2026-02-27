import { createClient } from '@/lib/supabase/server'
import { uploadImage } from './actions'
import GalleryList from './GalleryList'
import UploadForm from './UploadForm'
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

                <UploadForm />
            </div>

            <div>
                <h2 className="text-xl font-heading font-bold mb-6 uppercase tracking-wider text-gray-900">Current Gallery</h2>
                <GalleryList images={images || []} />
            </div>
        </div>
    )
}
