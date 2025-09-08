import React from "react";
import { Metadata } from "next";
import GalleryPage from "@/components/Gallery/GalleryPage";

export const metadata: Metadata = {
  title: "Gallery - Agarwal Samaj",
  description: "Explore our photo gallery showcasing events, activities, and community gatherings of Agarwal Samaj.",
};

const Gallery = () => {
  return (
    <>
      <GalleryPage />
    </>
  );
};

export default Gallery;
