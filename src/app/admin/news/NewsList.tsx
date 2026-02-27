'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { deleteNews } from './actions'
import { Edit, Trash2 } from 'lucide-react'

type NewsItem = {
    id: string
    title: string
    date: string
    image_url: string
    slug: string
}

export default function NewsList({ news }: { news: NewsItem[] }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-heading tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4 font-bold">Image</th>
                            <th className="px-6 py-4 font-bold">Details</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 w-32">
                                    {item.image_url ? (
                                        <div className="relative w-24 h-16 rounded overflow-hidden">
                                            <Image
                                                src={item.image_url}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs text-center px-2">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-lg mb-1">{item.title}</div>
                                    <div className="text-gray-500 text-xs">Published: {item.date} &bull; /{item.slug}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/news/${item.id}`}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit Article"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this news article?')) {
                                                    startTransition(() => deleteNews(item.id, item.image_url))
                                                }
                                            }}
                                            disabled={isPending}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Delete Article"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {news.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    No news articles found. Create one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
