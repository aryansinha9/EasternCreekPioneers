'use client'

import { deleteSponsor } from './actions'
import { Pencil, Trash2, Building } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Sponsor = {
    id: string
    title: string
    description: string | null
    image_url: string
    created_at: string
}

export default function SponsorsList({ sponsors }: { sponsors: Sponsor[] }) {
    const handleDelete = async (id: string, imageUrl: string) => {
        if (confirm('Are you sure you want to remove this sponsor? This action cannot be undone.')) {
            const result = await deleteSponsor(id, imageUrl)
            if (result?.error) {
                alert(result.error)
            }
        }
    }

    if (sponsors.length === 0) {
        return (
            <div className="bg-white p-12 text-center border border-gray-200 shadow-sm rounded">
                <Building className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium text-lg">No sponsors found.</p>
                <p className="text-gray-400 mt-2">Click "Add Sponsor" to create your first one.</p>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 shadow-sm rounded overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 font-heading font-bold text-gray-700 uppercase tracking-wider text-sm">Logo</th>
                            <th className="p-4 font-heading font-bold text-gray-700 uppercase tracking-wider text-sm">Sponsor Name</th>
                            <th className="p-4 font-heading font-bold text-gray-700 uppercase tracking-wider text-sm">Description</th>
                            <th className="p-4 font-heading font-bold text-gray-700 uppercase tracking-wider text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sponsors.map((sponsor) => (
                            <tr key={sponsor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 align-middle">
                                    <div className="relative w-24 h-16 bg-white border border-gray-200 rounded overflow-hidden flex items-center justify-center p-2">
                                        <Image
                                            src={sponsor.image_url}
                                            alt={sponsor.title}
                                            fill
                                            className="object-contain p-1"
                                            sizes="96px"
                                        />
                                    </div>
                                </td>
                                <td className="p-4 align-middle font-bold text-gray-900">{sponsor.title}</td>
                                <td className="p-4 align-middle text-gray-500 text-sm max-w-xs truncate">
                                    {sponsor.description || <span className="text-gray-300 italic">No description</span>}
                                </td>
                                <td className="p-4 align-middle text-right space-x-2">
                                    <Link
                                        href={`/admin/sponsors/edit/${sponsor.id}`}
                                        className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                    >
                                        <Pencil size={14} /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(sponsor.id, sponsor.image_url)}
                                        className="inline-flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
