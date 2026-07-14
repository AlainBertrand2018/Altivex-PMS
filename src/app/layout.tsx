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
    default: "Altivex — Project Intelligence Operating System",
    template: "%s | Altivex",
  },
  description:
    "An AI-powered Project Intelligence Operating System designed for committee-governed projects. From Meeting Minutes to Concrete Outcomes.",
  keywords: [
    "project management",
    "committee governance",
    "AI-powered",
    "meeting intelligence",
    "decision tracking",
    "stakeholder management",
    "culinary events",
    "Mauritius",
    "Altivex",
  ],
  authors: [{ name: "Altivex Projects" }],
  creator: "Altivex",
  publisher: "Altivex",
  metadataBase: new URL("https://altivex.pms"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://altivex.pms",
    siteName: "Altivex PMS",
    title: "Altivex — Project Intelligence Operating System",
    description:
      "An AI-powered Project Intelligence Operating System designed for committee-governed projects. From Meeting Minutes to Concrete Outcomes.",
    images: [
      {
        url: "/images/altivex_PMS_ogimage.webp",
        width: 1200,
        height: 630,
        alt: "Altivex — Project Intelligence Operating System",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altivex — Project Intelligence Operating System",
    description:
      "An AI-powered Project Intelligence Operating System designed for committee-governed projects. From Meeting Minutes to Concrete Outcomes.",
    images: ["/images/altivex_PMS_ogimage.webp"],
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
