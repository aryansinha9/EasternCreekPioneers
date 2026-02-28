import Link from 'next/link'
import { logout } from './login/actions'
import { Trophy, Image as ImageIcon, FileText, LayoutDashboard, LogOut, Home, Briefcase } from 'lucide-react'

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Results', href: '/admin/results', icon: Trophy },
    { name: 'News', href: '/admin/news', icon: FileText },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Sponsors', href: '/admin/sponsors', icon: Briefcase },
];

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

                <div className="p-4 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-3 w-full px-3 py-2 bg-primary text-white hover:bg-secondary hover:text-primary font-bold transition-colors rounded-sm shadow-sm justify-center">
                        <Home size={18} />
                        Return to Website
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <FileText size={20} />
                        News
                    </Link>
                    <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <ImageIcon size={20} />
                        Gallery
                    </Link>
                    <Link href="/admin/sponsors" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors">
                        <Briefcase size={20} />
                        Sponsors
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
                <div className="h-auto md:hidden bg-white border-b border-gray-200 flex flex-col">
                    <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100">
                        <span className="font-heading font-bold text-lg text-primary uppercase">ECSC Admin</span>
                        <form action={logout}>
                            <button type="submit" className="p-2 text-gray-500 hover:text-red-600">
                                <LogOut size={20} />
                            </button>
                        </form>
                    </div>
                    <div className="p-3 bg-gray-50 flex gap-2 overflow-x-auto shadow-inner">
                        <Link href="/" className="flex whitespace-nowrap items-center gap-2 px-3 py-1.5 bg-primary text-white hover:bg-secondary hover:text-primary font-bold text-sm transition-colors rounded-sm flex-shrink-0">
                            <Home size={14} /> Website
                        </Link>
                        <Link href="/admin" className="flex whitespace-nowrap items-center gap-2 px-3 py-1.5 text-gray-700 bg-white border border-gray-200 hover:text-primary font-medium text-sm transition-colors rounded-sm flex-shrink-0">
                            <LayoutDashboard size={14} /> Dashboard
                        </Link>
                        <Link href="/admin/news" className="flex whitespace-nowrap items-center gap-2 px-3 py-1.5 text-gray-700 bg-white border border-gray-200 hover:text-primary font-medium text-sm transition-colors rounded-sm flex-shrink-0">
                            <FileText size={14} /> News
                        </Link>
                        <Link href="/admin/gallery" className="flex whitespace-nowrap items-center gap-2 px-3 py-1.5 text-gray-700 bg-white border border-gray-200 hover:text-primary font-medium text-sm transition-colors rounded-sm flex-shrink-0">
                            <ImageIcon size={14} /> Gallery
                        </Link>
                        <Link href="/admin/sponsors" className="flex whitespace-nowrap items-center gap-2 px-3 py-1.5 text-gray-700 bg-white border border-gray-200 hover:text-primary font-medium text-sm transition-colors rounded-sm flex-shrink-0">
                            <Briefcase size={14} /> Sponsors
                        </Link>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
