"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryAlbum } from "@/types/gallery";
import { API_ENDPOINTS, getImageUrl as getFullImageUrl } from "@/lib/api/config";

const AlbumList = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_ENDPOINTS.albums);
        if (!response.ok) {
          throw new Error(`Failed to fetch albums: ${response.status}`);
        }
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch albums');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl || imageUrl.trim() === '') return null;
    try {
      const fullUrl = getFullImageUrl(imageUrl);
      new URL(fullUrl); // Validate URL format
      return fullUrl;
    } catch {
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
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading albums</div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Albums Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">Check back later for community photos!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {albums.map((album) => (
        <Link
          key={album.album_id}
          href={`/gallery/${album.album_id}`}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
        >
          <div className="w-full h-64 relative">
            {getImageUrl(album.cover_image_url) ? (
              <Image
                src={getImageUrl(album.cover_image_url)!}
                alt={album.album_title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                  <span className="text-waterloo dark:text-manatee text-base font-medium">
                    {album.album_title}
                  </span>
                </div>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
              <div className="text-center">
                <h3 className="text-white text-xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {album.album_title}
                </h3>
                <p className="text-white/90 text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {formatDate(album.event_date)}
                </p>
                <span className="inline-block bg-gradient-to-r from-primary to-meta text-white text-sm px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  {album.GalleryImages?.length || 0} Photos
                </span>
              </div>
            </div>

            {/* Click indicator */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Album Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
              {album.album_title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {album.album_description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{formatDate(album.event_date)}</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {album.GalleryImages?.length || 0}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AlbumList;
