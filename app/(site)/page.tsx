import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import MatrimonyPreview from "@/components/MatrimonyPreview";
import ClassifiedPreview from "@/components/ClassifiedPreview";
import MembershipPreview from "@/components/MembershipPreview";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import LatestNews from "@/components/LatestNews";

export const metadata: Metadata = {
  title: "Agarwal Samaj - Community Platform",
  description: "Welcome to Agarwal Samaj - A comprehensive community platform for Agarwal community members. Connect, share, and grow together through matrimony, classifieds, events, and more.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestNews />
      {/* <About /> */}
      <Services />
      <GalleryPreview />
      <MatrimonyPreview />
      <ClassifiedPreview />
      <MembershipPreview />
      <Testimonial />
      <CTA />
      <Contact />
    </main>
  );
}
