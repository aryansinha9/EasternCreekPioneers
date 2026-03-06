'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const MAX_SECTIONS = 20

export async function savePageContent(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string
    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const sectionsRaw = formData.get('sections') as string | null

    if (!id || !slug) {
        return { error: 'Missing document identity' }
    }

    // Parse and validate sections
    let sections: { heading: string; body: string }[] = []
    if (sectionsRaw) {
        try {
            const parsed = JSON.parse(sectionsRaw)
            if (!Array.isArray(parsed)) {
                return { error: 'Sections data is invalid.' }
            }
            if (parsed.length > MAX_SECTIONS) {
                return { error: `Maximum of ${MAX_SECTIONS} sections allowed.` }
            }
            sections = parsed
                .slice(0, MAX_SECTIONS)
                .map((s: any) => ({
                    heading: typeof s.heading === 'string' ? s.heading.trim() : '',
                    body: typeof s.body === 'string' ? s.body.trim() : '',
                }))
                .filter((s: { heading: string; body: string }) => s.heading || s.body)
        } catch {
            return { error: 'Failed to parse sections data.' }
        }
    }

    const { error: dbError } = await supabase
        .from('club_pages')
        .update({
            title,
            content,
            sections,
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
