import { login } from './actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const resolvedSearchParams = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-none border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-heading font-bold text-gray-900 uppercase tracking-wider">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage club content
                    </p>
                </div>
                <form className="mt-8 space-y-6" action={login}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {resolvedSearchParams?.error && (
                        <div className="text-red-500 text-sm font-medium text-center">
                            {resolvedSearchParams.error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider text-white bg-primary hover:bg-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
