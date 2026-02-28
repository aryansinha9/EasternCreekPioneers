import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PageEditForm from '../PageEditForm'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: `Edit ${params.slug} | Admin Dashboard`,
    }
}

export default async function EditPageContent({ params }: { params: { slug: string } }) {
    const supabase = await createClient()

    const { data: page } = await supabase
        .from('club_pages')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!page) {
        notFound()
    }

    return <PageEditForm initialData={page} />
}
