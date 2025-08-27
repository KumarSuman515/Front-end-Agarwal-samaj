"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider images (placeholders; replace src with actual images if available)
  const sliderImages = [
    {
      id: 1,
      src: "/images/hero/community-gathering.jpg",
      alt: "Community Gathering",
      title: "Community Gathering",
      description: "Annual Agarwal Samaj gathering",
    },
    {
      id: 2,
      src: "/images/hero/cultural-festival.jpg",
      alt: "Cultural Festival",
      title: "Cultural Festival",
      description: "Traditional celebrations",
    },
    {
      id: 3,
      src: "/images/hero/youth-meet.jpg",
      alt: "Youth Meet",
      title: "Youth Meet",
      description: "Young professionals networking",
    },
    {
      id: 4,
      src: "/images/hero/charity-event.jpg",
      alt: "Charity Event",
      title: "Charity Event",
      description: "Community service activities",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <>
      <section className="overflow-hidden">
        <div className="w-full">
          {/* Full-width slider with fixed responsive height */}
          <div className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[620px]">
            {sliderImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                {/* If you have real images, you can use next/image fill here. Using a stylized placeholder for now. */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center text-center px-6">
                    <div>
                      <div className="text-6xl md:text-7xl mb-4 select-none">📸</div>
                      <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 drop-shadow">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base drop-shadow">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
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
