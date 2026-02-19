interface MatchResultCardProps {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    date: string;
    division: string;
}

export default function MatchResultCard({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date,
    division,
}: MatchResultCardProps) {
    const isHomeWinner = homeScore > awayScore;
    const isDraw = homeScore === awayScore;

    return (
        <div className="bg-white shadow-none border border-gray-100 p-6 flex flex-col items-center hover:border-primary transition-colors">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {division} &bull; {date}
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                {/* Home Team */}
                <div className="flex-1 text-right">
                    <div className={`font-heading font-bold text-xl ${isHomeWinner ? 'text-primary' : 'text-gray-800'}`}>
                        {homeTeam}
                    </div>
                </div>

                {/* Score */}
                <div className="bg-gray-100 px-4 py-2 rounded-lg font-heading font-bold text-2xl text-gray-900 tracking-widest">
                    {homeScore} - {awayScore}
                </div>

                {/* Away Team */}
                <div className="flex-1 text-left">
                    <div className={`font-heading font-bold text-xl ${!isHomeWinner && !isDraw ? 'text-primary' : 'text-gray-800'}`}>
                        {awayTeam}
                    </div>
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 font-medium">
                Full Time
            </div>
        </div>
    );
}
