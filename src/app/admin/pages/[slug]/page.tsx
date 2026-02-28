import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PageEditForm from '../PageEditForm'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return {
        title: `Edit ${slug} | Admin Dashboard`,
    }
}

export default async function EditPageContent({ params }: { params: Promise<{ slug: string }> }) {
    const supabase = await createClient()
    const { slug } = await params;

    const { data: page } = await supabase
        .from('club_pages')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!page) {
        notFound()
    }

    return <PageEditForm initialData={page} />
}
