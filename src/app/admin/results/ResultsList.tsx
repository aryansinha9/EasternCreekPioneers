'use client'

import { useTransition } from 'react'
import { deleteResult, toggleFeatured } from './actions'
import { Trash2, Star, StarOff } from 'lucide-react'

type Result = {
    id: string
    home_team: string
    away_team: string
    home_score: number
    away_score: number
    date: string
    division: string
    is_featured: boolean
}

export default function ResultsList({ results }: { results: Result[] }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-heading tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4 font-bold">Date & Div</th>
                            <th className="px-6 py-4 font-bold">Match</th>
                            <th className="px-6 py-4 font-bold">Score</th>
                            <th className="px-6 py-4 font-bold">Featured</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {results.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold">{result.date}</div>
                                    <div className="text-gray-500 text-xs">{result.division}</div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {result.home_team} vs {result.away_team}
                                </td>
                                <td className="px-6 py-4 font-bold font-heading">
                                    {result.home_score} - {result.away_score}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => startTransition(() => toggleFeatured(result.id, !result.is_featured))}
                                        disabled={isPending}
                                        className={`p-2 rounded-full transition-colors ${result.is_featured
                                                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                                                : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        title={result.is_featured ? "Remove from homepage" : "Feature on homepage"}
                                    >
                                        {result.is_featured ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => startTransition(() => deleteResult(result.id))}
                                        disabled={isPending}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                        title="Delete Result"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {results.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No match results found. Add one above!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
