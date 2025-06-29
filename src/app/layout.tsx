import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name - Full-Stack Developer & ML Engineer",
  description: "Building intelligent, accessible, and user-focused digital products that improve lives. Specializing in Next.js, NestJS, FastAPI, and Machine Learning.",
  keywords: ["Full-Stack Developer", "Machine Learning", "Next.js", "NestJS", "FastAPI", "TypeScript", "Python"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourname.dev",
    title: "Your Name - Full-Stack Developer & ML Engineer",
    description: "Building intelligent, accessible, and user-focused digital products that improve lives.",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Full-Stack Developer & ML Engineer",
    description: "Building intelligent, accessible, and user-focused digital products that improve lives.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
