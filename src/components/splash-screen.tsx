"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { splashContent } from "@/config/splash";
import ThemeToggle from "./layout/theme-toggle";

const c = splashContent;

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!c.background.enableParallax) return;
    const handleMouse = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      bgRef.current.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    };
    document.addEventListener("mousemove", handleMouse);
    return () => document.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleCTAClick = (action: string) => {
    setShowFlash(true);
    setTimeout(() => {
      router.push(action);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="animate-pulse-glow text-primary text-2xl font-light tracking-widest">
          ALTIVEX
        </div>
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Ambient Underglow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full animate-pulse-glow"
          style={{ background: "rgba(192,193,255,0.05)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full animate-pulse-glow"
          style={{ background: "rgba(0,165,114,0.05)", animationDelay: "-4s" }}
        />
      </div>

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10" />
        <div
          ref={bgRef}
          className={`w-full h-full bg-cover bg-center ${c.background.enableZoom ? "animate-subtle-zoom" : ""}`}
          style={{ backgroundImage: `url('${c.background.imageUrl}')` }}
        />
        {c.background.enableScanner && (
          <div className="absolute inset-0 z-20 overflow-hidden opacity-20 pointer-events-none">
            <div className="splash-scanner-line" />
          </div>
        )}
      </div>

      {/* Grid Pattern */}
      {c.background.enableGrid && (
        <div className="fixed inset-0 z-10 pointer-events-none opacity-20 splash-grid-overlay" />
      )}

      {/* Flash overlay */}
      {showFlash && (
        <div
          className="fixed inset-0 z-[100] bg-white pointer-events-none"
          style={{ animation: "flash-in 0.5s ease-out forwards" }}
        />
      )}

      {/* Main Content */}
      <main className="relative z-30 flex flex-col items-center justify-center px-6 max-w-4xl text-center">
        {/* Brand: Logo + Title + Subtitle */}
        <div
          className="mb-6 opacity-0 animate-content-fade"
          style={{ animationDelay: `${c.animation.delays.brand}ms` }}
        >
          <div className="flex flex-col items-center gap-4 mb-4">
            <img
              src="/images/golden_heavy_logo.webp"
              alt="Altivex Logo"
              className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.25)]"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {c.brand.title}
            </h1>
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary/60 font-bold" style={{ fontFamily: "var(--font-geist-mono)" }}>
            {c.brand.subtitle}
          </p>
        </div>

        {/* Tagline — single line */}
        <div
          className="mb-12 opacity-0 animate-content-fade"
          style={{ animationDelay: `${c.animation.delays.tagline}ms` }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-geist-sans)" }}>
            {c.tagline.noBreak ? (
              <>{c.tagline.line1} {c.tagline.line2}</>
            ) : (
              <>{c.tagline.line1}<br /><span className={c.tagline.line2Italic ? "text-primary italic font-light opacity-90" : ""}>{c.tagline.line2}</span></>
            )}
          </h2>
        </div>

        {/* CTA Button */}
        <div
          className="opacity-0 animate-content-fade"
          style={{ animationDelay: `${c.animation.delays.ctas}ms` }}
        >
          <button
            onClick={() => handleCTAClick(c.ctas[0].action)}
            className="group relative px-12 py-5 bg-primary text-on-primary font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(192,193,255,0.3)]"
          >
            <span className="relative z-10">{c.ctas[0].label}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </main>

      {/* Bottom Status Indicators */}
      <div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-0 animate-content-fade z-30"
        style={{ animationDelay: `${c.animation.delays.status}ms` }}
      >
        {c.statusIndicators
          .filter((s) => s.show)
          .map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 ${s.hideOnMobile ? "hidden md:flex" : ""}`}
            >
              <div
                className={`w-2 h-2 rounded-full animate-pulse-dot ${
                  s.color === "primary"
                    ? "bg-primary shadow-[0_0_8px_var(--primary)]"
                    : s.color === "secondary-container"
                      ? "bg-secondary shadow-[0_0_8px_var(--secondary)]"
                      : "bg-[#ffb95f] shadow-[0_0_8px_#ffb95f]"
                }`}
              />
              <span className="text-xs uppercase tracking-wider text-muted-foreground/60 font-medium" style={{ fontFamily: "var(--font-geist-mono)" }}>
                {s.label}
              </span>
            </div>
          ))}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-40">
        <ThemeToggle />
      </div>
    </div>
  );
}
