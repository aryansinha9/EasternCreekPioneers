import Link from 'next/link'
import { logout } from './login/actions'
import { Trophy, Image as ImageIcon, FileText, LayoutDashboard, LogOut } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-body">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="font-heading font-bold text-xl text-primary tracking-wider uppercase">ECSC Admin</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/results" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <Trophy size={20} />
                        Results
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <FileText size={20} />
                        News
                    </Link>
                    <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <ImageIcon size={20} />
                        Gallery
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <form action={logout}>
                        <button type="submit" className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 font-medium transition-colors">
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <span className="font-heading font-bold text-lg text-primary uppercase">ECSC Admin</span>
                    <form action={logout}>
                        <button type="submit" className="p-2 text-gray-500 hover:text-red-600">
                            <LogOut size={20} />
                        </button>
                    </form>
                </div>

                <div className="p-6 md:p-8 flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
