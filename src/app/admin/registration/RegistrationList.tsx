'use client'

import { useState } from 'react'
import { Edit2, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteRegistrationSection } from './actions'

type Section = {
    id: string
    title: string
    description: string
    button_label: string
    button_link: string
    order_index: number
    created_at: string
}

export default function RegistrationList({ sections }: { sections: Section[] }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete the "${title}" section?`)) {
            return
        }

        setIsDeleting(id)
        try {
            const result = await deleteRegistrationSection(id)
            if (result.error) {
                alert(result.error)
            } else {
                router.refresh()
            }
        } catch (error) {
            console.error('Failed to delete section', error)
            alert('An unexpected error occurred.')
        } finally {
            setIsDeleting(null)
        }
    }

    if (sections.length === 0) {
        return (
            <div className="bg-white p-12 text-center border border-gray-200 shadow-sm">
                <p className="text-gray-500 font-body text-lg">No registration sections found. Create one to get started.</p>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left font-body">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-heading text-sm font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Link Settings</th>
                            <th className="px-6 py-4">Order Index</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sections.map((section) => (
                            <tr key={section.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 line-clamp-1">{section.title}</div>
                                    <div className="text-sm text-gray-500 line-clamp-2 mt-1 max-w-md">{section.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded inline-block w-fit">
                                            LABEL: {section.button_label}
                                        </span>
                                        <a href={section.button_link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 line-clamp-1 max-w-xs">
                                            Link <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-bold">
                                    {section.order_index}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <Link
                                            href={`/admin/registration/edit/${section.id}`}
                                            className="text-gray-500 hover:text-primary transition-colors p-2 bg-gray-100 hover:bg-gray-200 rounded"
                                            title="Edit Section"
                                        >
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(section.id, section.title)}
                                            disabled={isDeleting === section.id}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2 bg-gray-100 hover:bg-red-50 hover:bg-gray-200 rounded disabled:opacity-50"
                                            title="Delete Section"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
