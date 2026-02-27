import SponsorForm from '../../SponsorForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Edit Sponsor | Admin Dashboard',
}

export default async function EditSponsorPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { id } = await params

    const { data: sponsor, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !sponsor) {
        notFound()
    }

    return <SponsorForm initialData={sponsor} />
}
