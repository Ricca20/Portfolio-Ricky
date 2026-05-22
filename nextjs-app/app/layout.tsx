import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ricky Perera - Full Stack Developer",
  description:
    "Ricky Perera - Full Stack Developer specializing in MERN Stack, JavaScript, TypeScript, Spring Boot, AI applications, and scalable solutions. Available for freelance and full-time opportunities.",
  keywords: [
    "Ricky Perera",
    "Ricca",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript",
    "MongoDB",
    "Express.js",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Freelance Developer",
    "Sri Lanka Developer",
  ],
  authors: [{ name: "Ricky Perera" }],
  robots: "index, follow",
  metadataBase: new URL("https://www.ricca.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.ricca.dev",
    title: "Ricky Perera - Full Stack Developer",
    description:
      "Ricky Perera - Full Stack Developer specializing in MERN Stack, Portfolio showcasing web development projects and scalable solutions.",
    images: [
      {
        url: "https://www.ricca.dev/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ricky Perera - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricky Perera - Full Stack Developer",
    description:
      "Ricky Perera - Full Stack Developer specializing in MERN Stack, Portfolio showcasing web development projects and scalable solutions.",
    images: ["https://www.ricca.dev/profile.jpg"],
  },
  other: {
    "theme-color": "#06b6d4",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ricky Perera",
  alternateName: "Ricca",
  url: "https://www.ricca.dev",
  image: "https://www.ricca.dev/profile.jpg",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in MERN Stack (MongoDB, Express, React, Node.js), JavaScript, and TypeScript. Building scalable web applications and AI-powered solutions.",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Sri Lanka Institute of Information Technology",
  },
  knowsAbout: [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "TypeScript",
    "Full Stack Development",
    "MERN Stack",
    "Web Development",
    "Software Engineering",
    "REST API",
    "Git",
    "Docker",
  ],
  sameAs: [
    "https://github.com/Ricca20",
    "https://www.linkedin.com/in/ricky-perera-355678340/",
    "mailto:pereraricky20@gmail.com",
  ],
  knowsLanguage: ["English", "Sinhala"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "LK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
