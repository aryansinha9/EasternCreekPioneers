'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { deleteImage } from './actions'
import { Trash2 } from 'lucide-react'

type GalleryImage = {
    id: string
    image_url: string
    alt_text: string
    created_at: string
}

export default function GalleryList({ images }: { images: GalleryImage[] }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <div key={image.id} className="relative group bg-gray-100 rounded overflow-hidden aspect-square border border-gray-200 shadow-sm hover:border-primary transition-colors cursor-pointer">
                    <Image
                        src={image.image_url}
                        alt={image.alt_text}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate max-w-[70%] drop-shadow-md">
                            {image.alt_text}
                        </p>
                        <button
                            onClick={() => startTransition(() => deleteImage(image.id, image.image_url))}
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors drop-shadow-md"
                            title="Delete Image"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {images.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-200">
                    No images in the gallery yet. Upload one above!
                </div>
            )}
        </div>
    )
}
