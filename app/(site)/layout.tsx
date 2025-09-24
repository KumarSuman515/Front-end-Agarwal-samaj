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
import HeaderProvider from "../context/HeaderContext";
import DonationButton from "@/components/DonationButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <ToastProvider>
            <HeaderProvider>
              <Lines />
              <Header />
              <main className="flex-1 w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
              <DonationButton />
            </HeaderProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
