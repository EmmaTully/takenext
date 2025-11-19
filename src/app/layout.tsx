import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://takenext.com"),
  title: "TakeNext — Open for AI",
  description:
    "Shoppers use AI. You TakeNext. The last-mile platform that connects real-world businesses to consumer, marketplace, and OEM AIs.",
  alternates: {
    canonical: "/",
  },
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
    site: "@takenext",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TakeNext",
    url: "https://takenext.com",
    description:
      "TakeNext connects real-world businesses with consumer, marketplace, and OEM AIs so every knock gets an answer.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://takenext.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TakeNext Platform",
    url: "https://takenext.com",
    description:
      "Seat-based A2A platform that lets your AI talk to other AIs, coordinate responses, and escalate to humans when needed.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "89",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        price: 89,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "EACH",
        },
      },
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Script id="product-schema" type="application/ld+json">
          {JSON.stringify(productSchema)}
        </Script>
        {children}
      </body>
    </html>
  );
}
