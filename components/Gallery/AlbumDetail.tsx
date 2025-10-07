"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryAlbum, GalleryImage } from "@/types/gallery";
import ImageModal from "@/components/Gallery/ImageModal";
import { API_ENDPOINTS, getImageUrl as getFullImageUrl } from "@/lib/api/config";
import api, { ApiError } from "@/lib/api/client";

interface AlbumDetailProps {
  albumId: number;
}

const AlbumDetail = ({ albumId }: AlbumDetailProps) => {
  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [albumData, imagesData] = await Promise.all([
          api.get<GalleryAlbum>(API_ENDPOINTS.albumDetail(String(albumId)), { timeout: 15000 }),
          api.get<GalleryImage[]>(API_ENDPOINTS.albumImages(String(albumId)), { timeout: 15000 })
        ]);
        
        console.log('Album Data:', albumData);
        console.log('Images Data:', imagesData);
        console.log('First image URL:', imagesData[0]?.image_url);
        
        setAlbum(albumData);
        setImages(imagesData);
      } catch (err) {
        console.error('Error fetching album data:', err);
        if (err instanceof ApiError) {
          setError(err.userMessage || err.message);
        } else {
          setError('Failed to fetch album data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handleImageClick = (image: GalleryImage) => {
    const imageIndex = images.findIndex(img => img.image_id === image.image_id);
    setSelectedImage(image);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedImageIndex < images.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setSelectedImageIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (imageUrl: string | null | undefined) => {
    console.log('getImageUrl called with:', imageUrl);
    if (!imageUrl || imageUrl.trim() === '') {
      console.log('Image URL is empty or null');
      return null;
    }
    try {
      // Normalize path separators for cross-platform compatibility
      const normalizedPath = imageUrl.replace(/\\/g, '/');
      const fullUrl = getFullImageUrl(normalizedPath);
      new URL(fullUrl); // Validate URL format
      console.log('Valid URL created:', fullUrl);
      return fullUrl;
    } catch (error) {
      console.log('Invalid URL format:', error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 ">
        <div className="text-red-500 text-lg mb-4">Error loading album</div>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <Link
          href="/gallery"
          className="inline-flex items-center mt-4 btn-primary"
        >
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Album Not Found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The album you're looking for doesn't exist.</p>
        <Link
          href="/gallery"
          className="inline-flex items-center btn-primary"
        >
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/gallery"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>
      </div>

      {/* Album Header */}
      <div className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {album.album_title}
          </h1>
          <p className="text-xl text-waterloo dark:text-manatee max-w-3xl mx-auto leading-relaxed mb-6">
            {album.album_description}
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(album.event_date)}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {images.length} Photos
            </span>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Photos Yet</h3>
          <p className="text-gray-600 dark:text-gray-400">Photos will be added to this album soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={image.image_id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="w-full h-64 relative">
                {getImageUrl(image.image_url) ? (
                  <Image
                    src={getImageUrl(image.image_url)!}
                    alt={image.caption || `Photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <span className="text-waterloo dark:text-manatee text-sm">No Image</span>
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Caption */}
              {image.caption && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <ImageModal
          image={selectedImage}
          images={images}
          currentIndex={selectedImageIndex}
          isOpen={isModalOpen}
          onClose={closeModal}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default AlbumDetail;
