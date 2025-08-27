import React from "react";
import Link from "next/link";

const GalleryPreview = () => {
  const featuredImages = [
    {
      id: 1,
      title: "Annual Gathering 2024",
      category: "Events",
      image: "/images/gallery/event-1.jpg"
    },
    {
      id: 2,
      title: "Cultural Festival",
      category: "Cultural",
      image: "/images/gallery/event-2.jpg"
    },
    {
      id: 3,
      title: "Youth Meet",
      category: "Youth",
      image: "/images/gallery/event-3.jpg"
    },
    {
      id: 4,
      title: "Charity Event",
      category: "Charity",
      image: "/images/gallery/event-4.jpg"
    }
  ];

  return (
    <>
      <section id="gallery-preview" className="px-4 md:px-8 2xl:px-0 bg-gray-50">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Community Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the wonderful moments, celebrations, and events that bring our Agarwal Samaj community together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <span className="text-gray-600 text-sm font-medium">
                        {image.title}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-20">
            <Link
              href="/gallery"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View Full Gallery
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPreview;
