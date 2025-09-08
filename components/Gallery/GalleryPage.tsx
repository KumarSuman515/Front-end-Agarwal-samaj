import React from "react";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/images/gallery/event-1.jpg",
      alt: "Community Event 1",
      title: "Annual Gathering 2024",
      category: "Events",
    },
    {
      id: 2,
      src: "/images/gallery/event-2.jpg",
      alt: "Community Event 2",
      title: "Cultural Festival",
      category: "Cultural",
    },
    {
      id: 3,
      src: "/images/gallery/event-3.jpg",
      alt: "Community Event 3",
      title: "Youth Meet",
      category: "Youth",
    },
    {
      id: 4,
      src: "/images/gallery/event-4.jpg",
      alt: "Community Event 4",
      title: "Charity Event",
      category: "Charity",
    },
    {
      id: 5,
      src: "/images/gallery/event-5.jpg",
      alt: "Community Event 5",
      title: "Business Meet",
      category: "Business",
    },
    {
      id: 6,
      src: "/images/gallery/event-6.jpg",
      alt: "Community Event 6",
      title: "Family Day",
      category: "Family",
    },
  ];

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-alabaster to-white dark:from-blacksection dark:to-black">
      <div className="relative mx-auto max-w-c-1390 container-padding">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Community Gallery
          </h2>
          <p className="text-xl text-waterloo dark:text-manatee max-w-3xl mx-auto leading-relaxed">
            Explore the wonderful moments, celebrations, and events that bring
            our Agarwal Samaj community together.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
            >
              <div className="w-full h-64 bg-gradient-to-br from-primary/10 via-meta/10 to-primary/20 flex items-center justify-center relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-meta rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary/30 rounded-full"></div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                  <span className="text-waterloo dark:text-manatee text-base font-medium">
                    {image.title}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                <div className="text-center">
                  <h3 className="text-white text-xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                  <span className="inline-block bg-gradient-to-r from-primary to-meta text-white text-sm px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center btn-primary text-lg px-10 py-4 hover-lift group"
          >
            View Full Gallery
            <svg
              className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 
                010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 
                11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 
                0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
