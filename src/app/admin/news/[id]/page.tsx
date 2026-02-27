import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import NewsForm from '../NewsForm'

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params
    const supabase = await createClient()

    const { data: article } = await supabase
        .from('news')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

    if (!article) {
        notFound()
    }

    return <NewsForm initialData={article} />
}
