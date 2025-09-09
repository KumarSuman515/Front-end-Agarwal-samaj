"use client";

import React from "react";
import AlbumList from "./AlbumList";

const Gallery = () => {
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

        {/* Albums Grid */}
        <AlbumList />
      </div>
    </section>
  );
};

export default Gallery;