import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/hooks/useLoading";
import { GlobalLoadingManager } from "@/components/GlobalLoadingManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apilage AI — Sri Lanka's Sinhala-first AI Agent",
  description:
    "Sri Lanka's first Sinhala-first multi-task AI agent for students and professionals. Learn, research, and create with Apilage AI.",
  keywords: [
    "Apilage AI",
    "Sri Lanka AI",
    "Sinhala AI",
    "Education",
    "A/L",
    "O/L",
  ],
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
  openGraph: {
    title: "Apilage AI — Sri Lanka's Sinhala-first AI Agent",
    description:
      "Learn, research, and create in Sinhala with Sri Lanka's first multi-task AI agent.",
    url: "https://apilageai.lk",
    siteName: "Apilage AI",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "/images/icon.png",
        width: 1200,
        height: 630,
        alt: "Apilage AI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apilage AI — Sinhala-first AI Agent",
    description:
      "Learn, research, and create with Sri Lanka's Sinhala-first AI agent.",
    creator: "@apilageai",
    images: ["/images/icon.png"],
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
        <LoadingProvider>
          <GlobalLoadingManager />
          <Header />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
