'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Prevent default submission and stimulate a mock network request
        // since the backend implementation is specifically requested to be excluded currently
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)

            // Revert success message after 5 seconds
            setTimeout(() => {
                setIsSuccess(false)
                const form = document.getElementById('contact-form') as HTMLFormElement
                if (form) form.reset()
            }, 5000)
        }, 1500)
    }

    return (
        <div className="bg-white p-8 border hover:border-primary border-gray-200 shadow-sm transition-colors duration-300 h-full flex flex-col">
            <h2 className="heading-section text-primary text-3xl mb-8">SEND A MESSAGE</h2>

            {isSuccess ? (
                <div className="bg-green-50 text-green-800 border-l-4 border-green-500 p-6 flex flex-col items-center justify-center flex-grow text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2">Message Sent!</h3>
                    <p>Thank you for reaching out. We will get back to you shortly.</p>
                </div>
            ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col flex-grow">
                    <div className="space-y-6 flex-grow">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body transition-colors"
                                placeholder="0400 000 000"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body transition-colors resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full bg-primary text-white font-bold font-heading py-4 px-8 uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors disabled:opacity-70 flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </span>
                        ) : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    )
}
