import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO: React.FC = () => {
  const siteData = {
    title: "Estifanos Ameha - Full-Stack Developer & ML Enthusiast",
    description: "Full-stack developer and machine learning enthusiast building intelligent, scalable digital products. Specializing in Next.js, NestJS, and AI-powered applications.",
    url: "https://yourdomain.com",
    image: "https://yourdomain.com/og-image.jpg",
    author: "Estifanos Ameha",
    keywords: "full-stack developer, machine learning, Next.js, NestJS, TypeScript, React, Python, AI"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Estifanos Ameha",
    "jobTitle": "Full-Stack Developer & ML Enthusiast",
    "description": siteData.description,
    "url": siteData.url,
    "image": siteData.image,
    "sameAs": [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername"
    ],
    "knowsAbout": [
      "Full-Stack Development",
      "Machine Learning",
      "Next.js",
      "NestJS",
      "TypeScript",
      "React",
      "Python",
      "Artificial Intelligence"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteData.title}</title>
      <meta name="description" content={siteData.description} />
      <meta name="keywords" content={siteData.keywords} />
      <meta name="author" content={siteData.author} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteData.title} />
      <meta property="og:description" content={siteData.description} />
      <meta property="og:url" content={siteData.url} />
      <meta property="og:image" content={siteData.image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Estifanos Ameha Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteData.title} />
      <meta name="twitter:description" content={siteData.description} />
      <meta name="twitter:image" content={siteData.image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
}; 