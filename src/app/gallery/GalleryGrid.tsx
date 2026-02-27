'use client'

import { useState } from 'react'
import Image from "next/image"
import { X, Search } from 'lucide-react'

type GalleryImage = {
    id: string
    image_url: string
    alt_text: string
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images && images.length > 0 ? (
                    images.map((img) => (
                        <div
                            key={img.id}
                            onClick={() => setSelectedImage(img)}
                            className="relative aspect-square bg-gray-200 group overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                        >
                            <Image
                                src={img.image_url}
                                alt={img.alt_text || 'Eastern Creek SC Gallery Image'}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Search className="text-white" size={32} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center text-gray-500 border border-gray-200 bg-white">
                        <p className="text-xl font-medium">Gallery is currently empty.</p>
                        <p className="mt-2 text-sm text-gray-400">Check back later for new photos!</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8" onClick={() => setSelectedImage(null)}>
                    <button
                        className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={40} />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage.image_url}
                            alt={selectedImage.alt_text || 'Full size gallery image'}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                        {selectedImage.alt_text && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center pb-8 md:pb-4 border-t border-white/20 font-body">
                                {selectedImage.alt_text}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
