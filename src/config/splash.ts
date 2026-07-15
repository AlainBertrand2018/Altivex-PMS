import { SplashScreenContent } from "@/types/splash";

export const splashContent: SplashScreenContent = {
  brand: {
    title: "ALTIVEX PMS",
    subtitle: "Intelligent Project Management Platform",
  },
  tagline: {
    line1: "From Conversation",
    line2: "to Completion.",
    line2Italic: false,
    noBreak: true,
  },
  description: "",
  ctas: [
    {
      label: "ACCESS PROJECT MANAGEMENT",
      action: "/auth",
      variant: "primary",
      showArrow: false,
    },
  ],
  statusIndicators: [
    { label: "Network Secure", color: "secondary-container", show: true },
    { label: "Nodes Active: 1,402", color: "primary", show: true },
    {
      label: "v2.0.26 Stable",
      color: "tertiary",
      show: true,
      hideOnMobile: true,
    },
  ],
  background: {
    imageUrl: "/images/og_image.webp",
    overlayOpacity: 0.6,
    enableZoom: true,
    enableParallax: true,
    enableScanner: true,
    enableGrid: true,
  },
  animation: {
    delays: {
      brand: 0,
      tagline: 100,
      ctas: 300,
      status: 500,
    },
  },
};
