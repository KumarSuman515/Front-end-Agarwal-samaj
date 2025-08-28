"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToastProvider from "../context/ToastContext";
import DonationButton from "@/components/DonationButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <ToastProvider>
            <Lines />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
            <DonationButton />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
