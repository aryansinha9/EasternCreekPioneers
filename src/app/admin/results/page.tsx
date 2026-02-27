import { createClient } from '@/lib/supabase/server'
import { addResult } from './actions'
import ResultsList from './ResultsList'

export default async function ResultsAdminPage() {
    const supabase = await createClient()
    const { data: results } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase tracking-wider">Manage Results</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 shadow-sm border border-gray-200 sticky top-6">
                        <h2 className="text-xl font-heading font-bold mb-6 uppercase tracking-wider text-primary">Add New Result</h2>
                        <form action={addResult} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input type="text" name="date" required placeholder="e.g. Aug 24" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                    <input type="text" name="division" required placeholder="e.g. U16 Div 1" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
                                <input type="text" name="home_team" required defaultValue="Eastern Creek" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-3" />

                                <label className="block text-sm font-medium text-gray-700 mb-1">Home Score</label>
                                <input type="number" name="home_score" required min="0" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
                                <input type="text" name="away_team" required placeholder="Opponent Name" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-3" />

                                <label className="block text-sm font-medium text-gray-700 mb-1">Away Score</label>
                                <input type="number" name="away_score" required min="0" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center">
                                <input type="checkbox" name="is_featured" id="is_featured" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                                    Feature on Homepage
                                </label>
                            </div>

                            <button type="submit" className="w-full mt-4 bg-primary text-white font-bold py-3 px-4 uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Save Result
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2">
                    <ResultsList results={results || []} />

                    <div className="bg-blue-50 border-l-4 border-primary p-4 mt-6">
                        <p className="text-sm text-blue-900">
                            <strong>Tip:</strong> Ensure exactly 3 results are starred as "Featured" at any time. These 3 will display on the Homepage Match Center. All results will display on the dedicated Results page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
