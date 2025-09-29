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
  title: "Take‑Next — AI BDC in a Box",
  description:
    "Flip a switch and your BDC goes live. Take‑Next handles every lead instantly, follows up automatically, and escalates to your team when needed.",
  openGraph: {
    title: "Take‑Next — AI BDC in a Box",
    description:
      "Flip a switch and your BDC goes live. Take‑Next handles every lead instantly, follows up automatically, and escalates to your team when needed.",
    url: "https://example.com",
    siteName: "Take‑Next",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take‑Next — AI BDC in a Box",
    description:
      "Flip a switch and your BDC goes live. Take‑Next handles every lead instantly, follows up automatically, and escalates to your team when needed.",
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
