import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TakeNext — Open for AI",
  description:
    "Shoppers use AI. You TakeNext. The last-mile platform that connects real-world businesses to consumer, marketplace, and OEM AIs.",
  openGraph: {
    title: "TakeNext — Open for AI",
    description:
      "TakeNext is the AI-to-AI connector that routes every knock, coordinates responses, and calls in people only when judgment matters.",
    url: "https://takenext.com",
    siteName: "TakeNext",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TakeNext — Open for AI",
    description:
      "Seat-based A2A platform that lets your AI talk to consumer AIs, run coordination, and log receipts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
