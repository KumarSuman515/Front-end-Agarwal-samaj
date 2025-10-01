"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getImageUrl } from "@/lib/api/config";

interface SliderImage {
  id: number;
  image_path: string;
  alt_text: string;
  created_at?: string;
  updated_at?: string;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch slider images from API
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        console.log("Fetching sliders from API...");
        setLoading(true);
        setError(null);
              
        const response = await axios.get(API_ENDPOINTS.sliders);
        console.log("API Response:", response.data);
        
        const data = response.data;
        
        if (data && data.length > 0) {
          setSliderImages(data);
        } else {
          setSliderImages([]);
          setError("No slider images available");
        }
      } catch (err) {
        console.error("API Error:", err.message);
        setError(`Failed to load slider images: ${err.message}`);
        setSliderImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // Auto-slide effect (only if there are images)
  useEffect(() => {
    if (sliderImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Show loading state
  if (loading) {
    return (
      <section className="overflow-hidden relative">
        <div className="w-full">
          <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[680px] 2xl:h-[720px]">
            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-primary-400/20 to-primary-600/30 relative overflow-hidden flex items-center justify-center">
              <div className="text-center px-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-white mx-auto mb-3 sm:mb-4"></div>
                <p className="text-white text-sm sm:text-base lg:text-lg">Loading slider images...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no images from API
  if (sliderImages.length === 0) {
    return (
      <section className="overflow-hidden relative">
        <div className="w-full">
          <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[680px] 2xl:h-[720px]">
            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-primary-400/20 to-primary-600/30 relative overflow-hidden flex items-center justify-center">
              <div className="text-center px-4">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 select-none">📸</div>
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                  No Slider Images
                </h3>
                <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl drop-shadow max-w-2xl mx-auto leading-relaxed">
                  Please add slider images through the admin panel
                </p>
                <div className="mt-6 sm:mt-8">
                  <button 
                    onClick={() => window.location.reload()}
                    className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 hover-lift"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden relative">
        <div className="w-full">
          {/* Full-width slider with fixed responsive height */}
          <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[580px] xl:h-[680px] 2xl:h-[720px]">
            {sliderImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                {/* Real image from API or fallback */}
                <div className="w-full h-full relative overflow-hidden">
                  {image.image_path ? (
                    <Image
                      src={getImageUrl(image.image_path)}
                      alt={image.alt_text || "Slider Image"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  ) : (
                    // Fallback gradient background
                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-primary-400/20 to-primary-600/30 relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
                        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-white rounded-full animate-pulse delay-500"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center text-center px-3 sm:px-4 md:px-6">
                    <div className="max-w-4xl">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 md:mb-6 select-none animate-bounce">📸</div>
                      <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
                        {image.alt_text || "Community Event"}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl drop-shadow max-w-2xl mx-auto leading-relaxed">
                        Join our vibrant community and be part of something special
                      </p>
                      <div className="mt-4 sm:mt-6 md:mt-8">
                        <button className="btn-primary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 hover-lift">
                          Explore Community
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Error message */}
            {error && (
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 bg-red-500/90 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm">{error}</span>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs bg-white/20 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-white/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full glass-effect hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full glass-effect hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;