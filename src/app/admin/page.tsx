import { Trophy, Image as ImageIcon, FileText } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch some quick stats
    const { count: resultsCount } = await supabase.from('results').select('*', { count: 'exact', head: true })
    const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true })
    const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true })

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8 uppercase tracking-wider">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Total Results</p>
                        <p className="text-3xl font-heading font-bold text-primary">{resultsCount || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-3 text-primary">
                        <Trophy size={28} />
                    </div>
                </div>

                <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">News Articles</p>
                        <p className="text-3xl font-heading font-bold text-primary">{newsCount || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-3 text-primary">
                        <FileText size={28} />
                    </div>
                </div>

                <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Gallery Images</p>
                        <p className="text-3xl font-heading font-bold text-primary">{galleryCount || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-3 text-primary">
                        <ImageIcon size={28} />
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-heading font-bold text-gray-900 mb-6 uppercase tracking-wider">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/results" className="group bg-white p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors flex flex-col items-center text-center">
                    <Trophy size={32} className="text-gray-400 group-hover:text-primary mb-4 transition-colors" />
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Manage Results</h3>
                    <p className="text-sm text-gray-500 mt-2">Add or edit match results and select featured matches.</p>
                </Link>

                <Link href="/admin/news" className="group bg-white p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors flex flex-col items-center text-center">
                    <FileText size={32} className="text-gray-400 group-hover:text-primary mb-4 transition-colors" />
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Manage News</h3>
                    <p className="text-sm text-gray-500 mt-2">Publish new articles, edit existing ones, and manage images.</p>
                </Link>

                <Link href="/admin/gallery" className="group bg-white p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors flex flex-col items-center text-center">
                    <ImageIcon size={32} className="text-gray-400 group-hover:text-primary mb-4 transition-colors" />
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">Manage Gallery</h3>
                    <p className="text-sm text-gray-500 mt-2">Upload new images to the public gallery.</p>
                </Link>
            </div>
        </div>
    )
}
