import type { Metadata, Viewport } from "next";
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
  title: {
    default: "ALTIVEX PMS — Intelligent Project Management Platform",
    template: "%s | ALTIVEX PMS",
  },
  description:
    "ALTIVEX PMS is an AI-powered project management platform for committee-governed organizations. Track projects, tasks, meetings, decisions, stakeholders, and KPIs in one intelligent workspace.",
  keywords: [
    "project management",
    "AI project management",
    "committee governance",
    "project intelligence",
    "decision tracking",
    "stakeholder management",
    "task management",
    "meeting management",
    "KPI tracking",
    "Altivex",
    "PMS",
    "project operating system",
  ],
  authors: [{ name: "Altivex" }],
  creator: "Altivex",
  publisher: "Altivex",
  metadataBase: new URL("https://altivex.pms"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://altivex.pms",
    siteName: "ALTIVEX PMS",
    title: "ALTIVEX PMS — Intelligent Project Management Platform",
    description:
      "An AI-powered project intelligence platform designed for committee-governed projects. From meeting minutes to concrete outcomes — track every decision, task, milestone, and stakeholder in one unified workspace.",
    images: [
      {
        url: "/images/og_image.webp",
        width: 1200,
        height: 630,
        alt: "ALTIVEX PMS — Intelligent Project Management Platform",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALTIVEX PMS — Intelligent Project Management Platform",
    description:
      "An AI-powered project intelligence platform for committee-governed projects. Track decisions, tasks, milestones, and KPIs in one workspace.",
    images: ["/images/og_image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
