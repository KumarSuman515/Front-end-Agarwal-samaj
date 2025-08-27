import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader";

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/images/gallery/event-1.jpg",
      alt: "Community Event 1",
      title: "Annual Gathering 2024",
      category: "Events"
    },
    {
      id: 2,
      src: "/images/gallery/event-2.jpg",
      alt: "Community Event 2",
      title: "Cultural Festival",
      category: "Cultural"
    },
    {
      id: 3,
      src: "/images/gallery/event-3.jpg",
      alt: "Community Event 3",
      title: "Youth Meet",
      category: "Youth"
    },
    {
      id: 4,
      src: "/images/gallery/event-4.jpg",
      alt: "Community Event 4",
      title: "Charity Event",
      category: "Charity"
    },
    {
      id: 5,
      src: "/images/gallery/event-5.jpg",
      alt: "Community Event 5",
      title: "Business Meet",
      category: "Business"
    },
    {
      id: 6,
      src: "/images/gallery/event-6.jpg",
      alt: "Community Event 6",
      title: "Family Day",
      category: "Family"
    }
  ];

  return (
    <>
      <section id="gallery" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <SectionHeader
            headerInfo={{
              title: "Our Gallery",
              subtitle: "Explore Our Community Moments",
              description: "Take a look at the wonderful moments, events, and activities that bring our Agarwal Samaj community together.",
            }}
          />

          <div className="mt-10 grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group rounded-lg bg-white p-3 shadow-solid-8 transition-shadow hover:shadow-solid-9 dark:bg-blacksection"
              >
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-md bg-gray-200">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                    {image.category}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-base font-semibold text-black group-hover:text-primary dark:text-white">
                  {image.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="pb-20 pt-10 text-center">
            <p className="mb-6 text-waterloo dark:text-manatee">
              More photos coming soon! We're constantly updating our gallery with new community events.
            </p>
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700">
              Upload Your Photos
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
