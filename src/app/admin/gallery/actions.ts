'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
    const supabase = await createClient()

    const file = formData.get('image') as File
    const alt_text = formData.get('alt_text') as string

    if (!file || file.size === 0) {
        return { error: 'Please select an image to upload.' }
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
        .from('public_assets')
        .upload(`gallery/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (uploadError) {
        console.error('Supabase Storage Error:', uploadError)
        return { error: `Storage Error: ${uploadError.message}. Did you create the public_assets bucket?` }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('public_assets')
        .getPublicUrl(`gallery/${fileName}`)

    // Insert into gallery table
    const { error: dbError } = await supabase.from('gallery').insert({
        image_url: publicUrl,
        alt_text: alt_text || 'Gallery Image',
    })

    if (dbError) {
        return { error: `DB Insert Error: ${dbError.message}` }
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')

    return { success: true }
}

export async function deleteImage(id: string, imageUrl: string) {
    const supabase = await createClient()

    // Extract file path from public URL
    // Typically looks like: https://.../storage/v1/object/public/public_assets/gallery/filename.jpg
    // So we split by `public_assets/` and take the second part
    const urlParts = imageUrl.split('public_assets/')
    if (urlParts.length === 2) {
        const filePath = urlParts[1]

        // Delete from Storage
        await supabase.storage.from('public_assets').remove([filePath])
    }

    // Delete from DB
    await supabase.from('gallery').delete().eq('id', id)

    revalidatePath('/admin/gallery')
    revalidatePath('/gallery')
}
