'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addResult(formData: FormData) {
    const supabase = await createClient()

    const home_team = formData.get('home_team') as string
    const away_team = formData.get('away_team') as string
    const home_score = parseInt(formData.get('home_score') as string)
    const away_score = parseInt(formData.get('away_score') as string)
    const date = formData.get('date') as string
    const division = formData.get('division') as string
    const is_featured = formData.get('is_featured') === 'on'

    await supabase.from('results').insert({
        home_team,
        away_team,
        home_score,
        away_score,
        date,
        division,
        is_featured,
    })

    revalidatePath('/admin/results')
    revalidatePath('/')
    revalidatePath('/results')
}

export async function deleteResult(id: string) {
    const supabase = await createClient()
    await supabase.from('results').delete().eq('id', id)

    revalidatePath('/admin/results')
    revalidatePath('/')
    revalidatePath('/results')
}

export async function toggleFeatured(id: string, is_featured: boolean) {
    const supabase = await createClient()
    await supabase.from('results').update({ is_featured }).eq('id', id)

    revalidatePath('/admin/results')
    revalidatePath('/')
}
