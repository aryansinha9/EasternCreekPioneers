import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Edit2 } from 'lucide-react'

export const metadata = {
    title: 'Content Pages | Admin Dashboard',
}

export default async function AdminPagesList() {
    const supabase = await createClient()

    const { data: pages, error } = await supabase
        .from('club_pages')
        .select('*')
        .order('slug', { ascending: true })

    if (error) {
        console.error('Error fetching pages:', error)
    }

    const pagesList = pages || []

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-200 border-l-4 border-l-primary shadow-sm">
                <div>
                    <h1 className="text-3xl font-heading font-black text-primary uppercase tracking-wider mb-2 flex items-center gap-3">
                        <FileText size={28} /> Manage Static Pages
                    </h1>
                    <p className="text-gray-600 font-body">Edit text content for the Club Policies, About, and other static pages.</p>
                </div>
            </div>

            {pagesList.length === 0 ? (
                <div className="bg-white p-12 text-center border border-gray-200 shadow-sm">
                    <p className="text-gray-500 font-body text-lg">No static pages found. Please ensure the database has been initialized.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pagesList.map((page) => (
                        <div key={page.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-heading font-bold text-gray-900 border-b-2 border-secondary pb-1 inline-block">
                                        {page.title}
                                    </h2>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
                                        /{page.slug}
                                    </span>
                                </div>
                                <p className="text-gray-600 font-body text-sm line-clamp-4 mb-6">
                                    {page.content}
                                </p>
                            </div>
                            <div className="border-t border-gray-100 pt-4 mt-auto">
                                <Link
                                    href={`/admin/pages/${page.slug}`}
                                    className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-primary hover:text-white text-primary transition-colors font-bold py-3 rounded-sm uppercase tracking-wide text-sm"
                                >
                                    <Edit2 size={16} /> Edit Content
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
