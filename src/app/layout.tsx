import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Background from "@/components/Background";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EduLab - Virtual Science Lab",
  description:
    "Interactive science experiments and AI tutoring in a premium virtual lab.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const satelliteDomain = process.env.NEXT_PUBLIC_CLERK_SATELLITE_DOMAIN;
  return (
    <ClerkProvider
      {...(satelliteDomain
        ? { satellite: true, domain: satelliteDomain, signInUrl: "/" }
        : {})}
    >
      <html lang="en" className="dark">
        <body className={`${inter.variable} bg-space font-sans text-gray-200 antialiased`}>
          <Background />
          <CursorGlow />
          <Navbar />
          <main className="relative z-10 pt-28">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
