'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveRegistrationSection(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string | null
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const button_label = formData.get('button_label') as string
    const button_link = formData.get('button_link') as string
    const order_index = parseInt(formData.get('order_index') as string || '0', 10)

    const sectionData = {
        title,
        description,
        button_label,
        button_link,
        order_index
    }

    if (id) {
        // Update existing
        const { error: dbError } = await supabase.from('registration_sections').update(sectionData).eq('id', id)
        if (dbError) return { error: `DB Update Error: ${dbError.message}` }
    } else {
        // Insert new
        const { error: dbError } = await supabase.from('registration_sections').insert(sectionData)
        if (dbError) return { error: `DB Insert Error: ${dbError.message}` }
    }

    revalidatePath('/admin/registration')
    revalidatePath('/teams') // The frontend page is /teams

    return { success: true }
}

export async function deleteRegistrationSection(id: string) {
    const supabase = await createClient()

    // Delete from database
    const { error } = await supabase.from('registration_sections').delete().eq('id', id)
    if (error) {
        return { error: `DB Delete Error: ${error.message}` }
    }

    revalidatePath('/admin/registration')
    revalidatePath('/teams')

    return { success: true }
}
