'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveSponsor(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string | null
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File | null

    let image_url = formData.get('existing_image_url') as string

    // Handle new image upload if provided
    if (imageFile && imageFile.size > 0) {
        // Basic slugification for the filename prefix
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('public_assets')
            .upload(`sponsors/${fileName}`, imageFile, {
                cacheControl: '3600',
                upsert: false,
            })

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from('public_assets')
                .getPublicUrl(`sponsors/${fileName}`)

            image_url = publicUrl
        } else {
            console.error('Supabase Storage Error:', uploadError)
            return { error: `Storage Error: ${uploadError.message}. Did you create the public_assets bucket?` }
        }
    }

    if (!image_url && !id) {
        return { error: 'Please select an image for the sponsor.' }
    }

    const sponsorData = {
        title,
        description: description || null,
        image_url: image_url || '',
    }

    if (id) {
        // Update existing
        const { error: dbError } = await supabase.from('sponsors').update(sponsorData).eq('id', id)
        if (dbError) return { error: `DB Update Error: ${dbError.message}` }
    } else {
        // Insert new
        const { error: dbError } = await supabase.from('sponsors').insert(sponsorData)
        if (dbError) return { error: `DB Insert Error: ${dbError.message}` }
    }

    revalidatePath('/admin/sponsors')
    revalidatePath('/sponsors')

    return { success: true }
}

export async function deleteSponsor(id: string, imageUrl: string) {
    const supabase = await createClient()

    // Attempt to delete image from storage if it exists
    if (imageUrl) {
        const urlParts = imageUrl.split('public_assets/')
        if (urlParts.length === 2) {
            const filePath = urlParts[1]
            await supabase.storage.from('public_assets').remove([filePath])
        }
    }

    // Delete from database
    const { error } = await supabase.from('sponsors').delete().eq('id', id)
    if (error) {
        return { error: `DB Delete Error: ${error.message}` }
    }

    revalidatePath('/admin/sponsors')
    revalidatePath('/sponsors')

    return { success: true }
}
