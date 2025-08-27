import React from "react";
import { Metadata } from "next";
import MatrimonyPage from "@/components/Matrimony";

export const metadata: Metadata = {
  title: "Matrimony - Agarwal Samaj",
  description: "Find your life partner within the Agarwal Samaj community. Browse profiles and connect with potential matches.",
};

const Matrimony = () => {
  return (
    <>
      <MatrimonyPage />
    </>
  );
};

export default Matrimony;
