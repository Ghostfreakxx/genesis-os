import type { Metadata } from "next";
import { Geist, Geist_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tacticalMono = Share_Tech_Mono({
  variable: "--font-tactical",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GENESIS // Command Interface",
  description: "Tactical situation room for global signal monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${tacticalMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
