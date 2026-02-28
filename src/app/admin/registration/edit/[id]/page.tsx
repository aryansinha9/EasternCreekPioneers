import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import RegistrationForm from '../../RegistrationForm'

export const metadata = {
    title: 'Edit Section | Admin Dashboard',
}

export default async function EditRegistrationPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: section } = await supabase
        .from('registration_sections')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!section) {
        notFound()
    }

    return <RegistrationForm initialData={section} />
}
