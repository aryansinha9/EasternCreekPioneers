import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import RegistrationForm from '../../RegistrationForm'

export const metadata = {
    title: 'Edit Section | Admin Dashboard',
}

export default async function EditRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params;

    const { data: section } = await supabase
        .from('registration_sections')
        .select('*')
        .eq('id', id)
        .single()

    if (!section) {
        notFound()
    }

    return <RegistrationForm initialData={section} />
}
