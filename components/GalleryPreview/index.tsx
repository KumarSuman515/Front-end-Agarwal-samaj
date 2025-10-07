"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_ENDPOINTS, getImageUrl } from "@/lib/api/config";
import api, { ApiError } from "@/lib/api/client";

interface GalleryAlbum {
  album_id: number;
  album_title: string;
  album_description: string;
  cover_image_url: string | null;
  event_date: string;
  createdAt: string;
  updatedAt: string;
  GalleryImages?: any[];
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
        
        const data = await api.get<any>(API_ENDPOINTS.albums);
        console.log("Gallery API Response:", data);
        
        // Handle different response structures
        let albumData: GalleryAlbum[] = [];
        if (Array.isArray(data)) {
          albumData = data;
        } else if (data && data.data && Array.isArray(data.data)) {  
          albumData = data.data;
        } else if (data && data.albums && Array.isArray(data.albums)) {
          albumData = data.albums;
        } else if (data && data.results && Array.isArray(data.results)) {
          albumData = data.results;
        }
        
        console.log("Processed album data:", albumData);
        
        if (albumData && albumData.length > 0) {
          setFeaturedImages(albumData.slice(0, 3)); // Show first 3 albums
        } else {
           // Fallback to sample data if no albums exist
           setFeaturedImages([
             {
               album_id: 1,
               album_title: "Annual Gathering 2024",
               album_description: "Community annual gathering photos",
               cover_image_url: null, // Will show gradient background
               event_date: new Date().toISOString(),
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
             },
             {
               album_id: 2,
               album_title: "Cultural Festival",
               album_description: "Cultural festival celebrations",
               cover_image_url: null, // Will show gradient background
               event_date: new Date().toISOString(),
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
             },
             {
               album_id: 3,
               album_title: "Youth Meet",
               album_description: "Youth community meet photos",
               cover_image_url: null, // Will show gradient background
               event_date: new Date().toISOString(),
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString()
             }
           ]);
        }
      } catch (err) {
        console.error('Error fetching gallery albums:', err);
        if (err instanceof ApiError) {
          setError(err.userMessage || 'Failed to load gallery albums');
        } else {
          setError('Failed to load gallery albums');
        }
        
         // Fallback to sample data
         setFeaturedImages([
           {
             album_id: 1,
             album_title: "Annual Gathering 2024",
             album_description: "Community annual gathering photos",
             cover_image_url: null, // Will show gradient background
             event_date: new Date().toISOString(),
             createdAt: new Date().toISOString(),
             updatedAt: new Date().toISOString()
           },
           {
             album_id: 2,
             album_title: "Cultural Festival",
             album_description: "Cultural festival celebrations",
             cover_image_url: null, // Will show gradient background
             event_date: new Date().toISOString(),
             createdAt: new Date().toISOString(),
             updatedAt: new Date().toISOString()
           },
           {
             album_id: 3,
             album_title: "Youth Meet",
             album_description: "Youth community meet photos",
             cover_image_url: null, // Will show gradient background
             event_date: new Date().toISOString(),
             createdAt: new Date().toISOString(),
             updatedAt: new Date().toISOString()
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
      <section id="gallery-preview" className="section-padding bg-gradient-to-b from-alabaster to-white dark:from-blacksection dark:to-black">
        <div className="relative mx-auto max-w-c-1390 container-padding">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
              Community Gallery
            </h2>
            <p className="text-xl text-waterloo dark:text-manatee max-w-3xl mx-auto leading-relaxed">
              Explore the wonderful moments, celebrations, and events that bring our Agarwal Samaj community together. 
              Discover the beauty of our shared experiences and memories.
            </p>
          </div>

          {/* Debug info - only show in development */}
          {/* {process.env.NODE_ENV === 'development' && featuredImages.length > 0 && (
            <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Debug Info:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {featuredImages.map((album, index) => (
                  <div key={album.album_id} className="p-2 bg-white dark:bg-gray-700 rounded">
                    <div><strong>Album {index + 1}:</strong> {album.album_title}</div>
                    <div><strong>Image URL:</strong> {album.cover_image_url || 'No image'}</div>
                    <div><strong>Constructed URL:</strong> {album.cover_image_url ? getImageUrl(album.cover_image_url) : 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredImages.map((album, index) => (
                <Link key={album.album_id} href={`/gallery/${album.album_id}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover">
                     {/* Main Image Container */}
                     <div className="relative h-64 overflow-hidden">
                       {/* Background Image */}
                       {album.cover_image_url && album.cover_image_url.trim() !== "" ? (
                         <div className="absolute inset-0">
                           <Image
                            src={getImageUrl(album.cover_image_url)}
                             alt={album.album_title}
                             fill
                             className="object-cover"
                             onError={(e) => {
                               console.error('Gallery image failed to load:', album.cover_image_url);
                               const target = e.target as HTMLImageElement;
                               target.style.display = 'none';
                               const fallback = target.nextElementSibling as HTMLElement;
                               if (fallback) fallback.style.display = 'block';
                             }}
                             onLoad={() => {
                               console.log('Gallery image loaded successfully:', album.cover_image_url);
                             }}
                           />
                           {/* Fallback gradient background */}
                           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 hidden">
                             <div className="absolute inset-0 opacity-20">
                               <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full"></div>
                               <div className="absolute top-8 right-6 w-6 h-6 bg-meta rounded-full"></div>
                               <div className="absolute bottom-6 left-8 w-4 h-4 bg-primary rounded-full"></div>
                               <div className="absolute bottom-4 right-4 w-10 h-10 bg-meta rounded-full"></div>
                             </div>
                             <div className="flex items-center justify-center h-full">
                               <div className="text-center">
                                 <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                                 <span className="text-waterloo dark:text-manatee text-base font-medium">
                                   {album.album_title}
                                 </span>
                               </div>
                             </div>
                           </div>
                         </div>
                       ) : (
                         /* Fallback gradient background when no image */
                         <div className="w-full h-full bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 flex items-center justify-center">
                           <div className="text-center">
                             <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                             <span className="text-waterloo dark:text-manatee text-base font-medium">
                               {album.album_title}
                             </span>
                           </div>
                         </div>
                       )}
                       
                       {/* Album name overlay for images */}
                       {album.cover_image_url && album.cover_image_url.trim() !== "" && (
                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                           <h3 className="text-white font-semibold text-lg">{album.album_title}</h3>
                         </div>
                       )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                        <div className="text-center">
                          <h3 className="text-white text-xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {album.album_title}
                          </h3>
                          <p className="text-white/90 text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100" suppressHydrationWarning>
                            {new Date(album.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                          </p>
                          <span className="inline-block bg-gradient-to-r from-primary to-meta text-white text-sm px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                            Gallery
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
                    
                    {/* Content Below Image */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {album.album_title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {album.album_description}
                      </p>
                      
                      {/* Tags and Date */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span suppressHydrationWarning>{new Date(album.event_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Gallery
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center pb-24">
            <Link
              href="/gallery"
              className="btn-primary inline-flex items-center justify-center px-10 py-4 rounded-2xl font-bold text-lg group"
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
            
            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Discover more amazing moments from our community
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPreview;
