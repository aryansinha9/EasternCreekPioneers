'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function savePageContent(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string
    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!id || !slug) {
        return { error: 'Missing document identity' }
    }

    const { error: dbError } = await supabase
        .from('club_pages')
        .update({
            title,
            content,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (dbError) {
        return { error: `Database Error: ${dbError.message}` }
    }

    // Attempt to revalidate the specific public page path so changes show instantly
    revalidatePath(`/${slug}`)
    revalidatePath('/admin/pages')

    return { success: true }
}
