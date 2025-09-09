"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types/gallery";

interface ImageModalProps {
  image: GalleryImage;
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal = ({ image, images, currentIndex, isOpen, onClose, onNext, onPrevious }: ImageModalProps) => {
  const getImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl || imageUrl.trim() === '') return null;
    try {
      // Normalize path separators for cross-platform compatibility
      const normalizedPath = imageUrl.replace(/\\/g, '/');
      const fullUrl = `http://localhost:4005/${normalizedPath}`;
      new URL(fullUrl); // Validate URL format
      return fullUrl;
    } catch {
      return null;
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-6xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Fixed positioning */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-20 text-white hover:text-primary transition-colors bg-black/80 hover:bg-black/90 rounded-full p-3 backdrop-blur-sm shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={onPrevious}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-30 text-white transition-all duration-300 bg-black/90 hover:bg-primary rounded-full p-4 backdrop-blur-sm shadow-2xl border-2 border-white/20 hover:border-primary/50 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={currentIndex === 0}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={onNext}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-30 text-white transition-all duration-300 bg-black/90 hover:bg-primary rounded-full p-4 backdrop-blur-sm shadow-2xl border-2 border-white/20 hover:border-primary/50 ${
                currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={currentIndex === images.length - 1}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Container - Responsive sizing */}
        <div className="relative w-full h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {getImageUrl(image.image_url) ? (
            <Image
              src={getImageUrl(image.image_url)!}
              alt={image.caption || 'Gallery Image'}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📸</div>
                <span className="text-white text-lg">No Image Available</span>
              </div>
            </div>
          )}

          {/* Image Caption Overlay */}
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-lg leading-relaxed">
                {image.caption}
              </p>
            </div>
          )}

          {/* Instructions and Image Counter Overlay */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
            <p className="text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Press ESC or click outside to close
            </p>
            {images.length > 1 && (
              <p className="text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {currentIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
