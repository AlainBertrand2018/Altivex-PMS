export interface SplashBrandConfig {
  title: string;
  subtitle: string;
}

export interface SplashTaglineConfig {
  line1: string;
  line2: string;
  line2Italic: boolean;
  noBreak?: boolean;
}

export interface SplashCTAConfig {
  label: string;
  action: string;
  variant: "primary" | "glass";
  showArrow: boolean;
}

export interface SplashStatusIndicator {
  label: string;
  color: "primary" | "secondary-container" | "tertiary";
  show: boolean;
  hideOnMobile?: boolean;
}

export interface SplashBackgroundConfig {
  imageUrl: string;
  overlayOpacity: number;
  enableZoom: boolean;
  enableParallax: boolean;
  enableScanner: boolean;
  enableGrid: boolean;
}

export interface SplashAnimationConfig {
  delays: {
    brand: number;
    tagline: number;
    ctas: number;
    status: number;
  };
}

export interface SplashScreenContent {
  brand: SplashBrandConfig;
  tagline: SplashTaglineConfig;
  description: string;
  ctas: SplashCTAConfig[];
  statusIndicators: SplashStatusIndicator[];
  background: SplashBackgroundConfig;
  animation: SplashAnimationConfig;
}
