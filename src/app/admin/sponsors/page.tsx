import { createClient } from '@/lib/supabase/server'
import SponsorsList from './SponsorsList'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const metadata = {
    title: 'Manage Sponsors | Admin Dashboard',
}

export default async function AdminSponsorsPage() {
    const supabase = await createClient()

    const { data: sponsors, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching sponsors:', error)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-200 border-l-4 border-l-primary shadow-sm">
                <div>
                    <h1 className="text-3xl font-heading font-black text-primary uppercase tracking-wider mb-2">Manage Sponsors</h1>
                    <p className="text-gray-600 font-body">Add, edit, or remove club sponsors and their logos.</p>
                </div>
                <Link
                    href="/admin/sponsors/new"
                    className="bg-secondary text-primary hover:bg-primary hover:text-white transition-colors font-heading font-bold py-3 px-6 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
                >
                    <Plus size={20} /> Add New Sponsor
                </Link>
            </div>

            <SponsorsList sponsors={sponsors || []} />
        </div>
    )
}
