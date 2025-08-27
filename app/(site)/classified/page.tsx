import React from "react";
import { Metadata } from "next";
import ClassifiedPage from "@/components/Classified";

export const metadata: Metadata = {
  title: "Classified - Agarwal Samaj",
  description: "Browse community classifieds, announcements, and local business listings within the Agarwal Samaj community.",
};

const Classified = () => {
  return (
    <>
      <ClassifiedPage />
    </>
  );
};

export default Classified;
