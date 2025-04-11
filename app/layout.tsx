import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  // You can fetch data here to generate dynamic metadata
  return {
    title: "Chef Margaret Alvis | Oak Cliff, Texas",
    description:
      "Experience the culinary artistry of Chef Margaret Alvis. Private dinners, cooking classes, and catering services in Oak Cliff, Texas.",
    keywords: "chef, Margaret Alvis, Oak Cliff, Texas, private chef, cooking classes, catering",
    openGraph: {
      title: "Chef Margaret Alvis | Oak Cliff, Texas",
      description:
        "Experience the culinary artistry of Chef Margaret Alvis. Private dinners, cooking classes, and catering services in Oak Cliff, Texas.",
      images: [
        {
          url: "https://chefmargaretalvis.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Chef Margaret Alvis",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chef Margaret Alvis | Oak Cliff, Texas",
      description:
        "Experience the culinary artistry of Chef Margaret Alvis. Private dinners, cooking classes, and catering services in Oak Cliff, Texas.",
      images: ["https://chefmargaretalvis.com/twitter-image.jpg"],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
