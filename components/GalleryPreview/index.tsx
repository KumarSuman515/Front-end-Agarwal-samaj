"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface GalleryAlbum {
  album_id: number;
  album_name: string;
  description: string;
  cover_image: string;
  created_at: string;
}

const GalleryPreview = () => {
  const [featuredImages, setFeaturedImages] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gallery albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:4005/api/albums');
        
        if (response.data && response.data.length > 0) {
          setFeaturedImages(response.data.slice(0, 4)); // Show first 4 albums
        } else {
          // Fallback to sample data if no albums exist
          setFeaturedImages([
            {
              album_id: 1,
              album_name: "Annual Gathering 2024",
              description: "Community annual gathering photos",
              cover_image: "/images/gallery/event-1.jpg",
              created_at: new Date().toISOString()
            },
            {
              album_id: 2,
              album_name: "Cultural Festival",
              description: "Cultural festival celebrations",
              cover_image: "/images/gallery/event-2.jpg",
              created_at: new Date().toISOString()
            },
            {
              album_id: 3,
              album_name: "Youth Meet",
              description: "Youth community meet photos",
              cover_image: "/images/gallery/event-3.jpg",
              created_at: new Date().toISOString()
            },
            {
              album_id: 4,
              album_name: "Charity Event",
              description: "Community charity events",
              cover_image: "/images/gallery/event-4.jpg",
              created_at: new Date().toISOString()
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching gallery albums:', err);
        setError('Failed to load gallery albums');
        
        // Fallback to sample data
        setFeaturedImages([
          {
            album_id: 1,
            album_name: "Annual Gathering 2024",
            description: "Community annual gathering photos",
            cover_image: "/images/gallery/event-1.jpg",
            created_at: new Date().toISOString()
          },
          {
            album_id: 2,
            album_name: "Cultural Festival",
            description: "Cultural festival celebrations",
            cover_image: "/images/gallery/event-2.jpg",
            created_at: new Date().toISOString()
          },
          {
            album_id: 3,
            album_name: "Youth Meet",
            description: "Youth community meet photos",
            cover_image: "/images/gallery/event-3.jpg",
            created_at: new Date().toISOString()
          },
          {
            album_id: 4,
            album_name: "Charity Event",
            description: "Community charity events",
            cover_image: "/images/gallery/event-4.jpg",
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <>
      <section id="gallery-preview" className="px-4 md:px-8 2xl:px-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-16 lg:px-15 lg:pt-20 xl:px-20 xl:pt-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Community Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the wonderful moments, celebrations, and events that bring our Agarwal Samaj community together. 
              Discover the beauty of our shared experiences and memories.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
                  <div className="mt-6 h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-3 h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="mt-4 flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Error loading gallery</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {featuredImages.map((album, index) => (
                <Link key={album.album_id} href={`/gallery/${album.album_id}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
                    {/* Main Image Container */}
                    <div className="relative h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="absolute top-8 right-6 w-6 h-6 bg-purple-400 rounded-full"></div>
                        <div className="absolute bottom-6 left-8 w-4 h-4 bg-pink-400 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-blue-300 rounded-full"></div>
                      </div>
                      
                      {/* Gallery Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm font-semibold bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                            {album.album_name}
                          </span>
                        </div>
                      </div>
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Hover Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="text-white text-center p-6">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">View Gallery</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Below Image */}
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {album.album_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                      
                      {/* Tags and Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            Gallery
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(album.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        
                        {/* Arrow Icon */}
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center pb-24">
            <div className="relative inline-block">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <Link
                href="/gallery"
                className="relative inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Full Gallery
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </div>
            
            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Discover more amazing moments from our community
              </p>
              <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span>High Quality Photos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span>Regular Updates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                  <span>Easy Sharing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPreview;
