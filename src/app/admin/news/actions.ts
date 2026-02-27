'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveNews(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string | null
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const date = formData.get('date') as string
    const imageFile = formData.get('image') as File | null

    // Generate a basic slug if it's new
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    let image_url = formData.get('existing_image_url') as string

    // Handle new image upload if provided
    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('public_assets')
            .upload(`news/${fileName}`, imageFile, {
                cacheControl: '3600',
                upsert: false,
            })

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from('public_assets')
                .getPublicUrl(`news/${fileName}`)

            image_url = publicUrl
        } else {
            console.error('Supabase Storage Error:', uploadError)
            return { error: `Storage Error: ${uploadError.message}. Did you create the public_assets bucket?` }
        }
    }

    const newsData = {
        title,
        excerpt,
        content,
        date,
        image_url: image_url || '',
        slug,
    }

    if (id) {
        // Update existing
        const { error: dbError } = await supabase.from('news').update(newsData).eq('id', id)
        if (dbError) return { error: `DB Update Error: ${dbError.message}` }
    } else {
        // Insert new
        const { error: dbError } = await supabase.from('news').insert(newsData)
        if (dbError) return { error: `DB Insert Error: ${dbError.message}` }
    }

    revalidatePath('/admin/news')
    revalidatePath('/')
    revalidatePath('/news')

    return { success: true }
}

export async function deleteNews(id: string, imageUrl: string) {
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
    await supabase.from('news').delete().eq('id', id)

    revalidatePath('/admin/news')
    revalidatePath('/')
    revalidatePath('/news')
}
