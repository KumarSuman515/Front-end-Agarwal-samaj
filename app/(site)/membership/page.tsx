import React from "react";
import { Metadata } from "next";
import MembershipPage from "@/components/Membership";

export const metadata: Metadata = {
  title: "Membership - Agarwal Samaj",
  description: "Join the Agarwal Samaj community. Learn about membership benefits, registration process, and community involvement opportunities.",
};

const Membership = () => {
  return (
    <>
      <MembershipPage />
    </>
  );
};

export default Membership;
