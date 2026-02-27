import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import NewsList from './NewsList'
import { FileText, Plus } from 'lucide-react'

export default async function NewsAdminPage() {
    const supabase = await createClient()
    const { data: news } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wider flex items-center gap-3">
                    <FileText className="text-primary" /> Manage News
                </h1>
                <Link
                    href="/admin/news/new"
                    className="bg-primary text-white font-bold py-2 px-6 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2"
                >
                    <Plus size={20} /> Create Post
                </Link>
            </div>

            <NewsList news={news || []} />
        </div>
    )
}
