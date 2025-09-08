"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

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
              
        const response = await axios.get('http://localhost:4005/api/sliders');
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
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[620px] xl:h-[720px]">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-meta/20 to-primary/30 relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading slider images...</p>
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
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[620px] xl:h-[720px]">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-meta/20 to-primary/30 relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl md:text-7xl mb-6 select-none">📸</div>
                <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                  No Slider Images
                </h3>
                <p className="text-white/90 text-lg md:text-xl drop-shadow max-w-2xl mx-auto leading-relaxed">
                  Please add slider images through the admin panel
                </p>
                <div className="mt-8">
                  <button 
                    onClick={() => window.location.reload()}
                    className="btn-primary text-lg px-8 py-4 hover-lift"
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
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[620px] xl:h-[720px]">
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
                      src={image.image_path.startsWith('http') ? image.image_path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005'}${image.image_path}`}
                      alt={image.alt_text || "Slider Image"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  ) : (
                    // Fallback gradient background
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-meta/20 to-primary/30 relative overflow-hidden">
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
                  <div className="relative z-10 flex h-full w-full items-center justify-center text-center px-6">
                    <div className="max-w-4xl">
                      <div className="text-6xl md:text-7xl mb-6 select-none animate-bounce">📸</div>
                      <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                        {image.alt_text || "Community Event"}
                      </h3>
                      <p className="text-white/90 text-lg md:text-xl drop-shadow max-w-2xl mx-auto leading-relaxed">
                        Join our vibrant community and be part of something special
                      </p>
                      <div className="mt-8">
                        <button className="btn-primary text-lg px-8 py-4 hover-lift">
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
              <div className="absolute top-4 right-4 z-30 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <span className="text-sm">{error}</span>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
              aria-label="Previous slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-effect hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-6 h-6 text-primary group-hover:text-primaryho transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
              aria-label="Next slide"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-effect hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              <svg className="w-6 h-6 text-primary group-hover:text-primaryho transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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
