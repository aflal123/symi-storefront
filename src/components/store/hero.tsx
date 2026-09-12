"use client";

import { useState, useEffect, useRef } from "react";
import { BRAND } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Film } from "lucide-react";

export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setVideoLoaded(true)).catch(() => {
          // Retry playback on user interaction if blocked by browser policy
        });
      }
    }
  }, []);

  return (
    <section
      id="top"
      aria-label="Hero Section"
      className="dark relative flex min-h-[92vh] items-end overflow-hidden bg-black text-foreground select-none"
    >
      {/* 1. Underlying SVG Backdrop / Fallback Layer */}
      <HeroBackdrop />

      {/* 2. Full-Screen High-Quality Ambient Video Background Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={BRAND.heroVideo?.mp4 || "/videos/hero.mp4"}
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        className={`pointer-events-none absolute inset-0 size-full object-cover object-center transition-opacity duration-1000 ${
          videoLoaded ? "opacity-80" : "opacity-60"
        }`}
      >
        <source src={BRAND.heroVideo?.mp4 || "/videos/hero.mp4"} type="video/mp4" />
      </video>

      {/* 3. Cinematic Film Overlay & Contrast Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-black/25 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/20 to-black/80" />

      {/* Subtle Scanline / Film Grain Texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

     

      {/* 5. Main Full-Screen Hero Content & Headlines (Above Video) */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-24 lg:px-16">

        <BlurFade inView delay={0.08}>
          <h1 className="display-tight mt-4 sm:mt-6 text-[clamp(2.5rem,10.5vw,10.5rem)] font-extrabold tracking-tighter text-white drop-shadow-sm leading-[0.95]">
            Define
            <br />
            your
            <br />
            style
          </h1>
        </BlurFade>

        <BlurFade inView delay={0.16}>
          <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-sm md:text-base text-white/80 drop-shadow-sm leading-relaxed">
            Everyday household items, lifestyle goods, accessories, and apparel at Sri Lanka&apos;s finest prices.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.24}>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              id="hero-explore-collection"
              href="#category"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-sm border border-[#F8F5EE] bg-[#F8F5EE] px-8 py-3.5 sm:py-4 text-[10px] font-bold tracking-[0.2em] text-[#1A1714] uppercase shadow-lg transition-all duration-300 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white hover:shadow-[#52735B]/20 active:scale-98"
            >
              Explore Collection
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E231D" />
          <stop offset="0.55" stopColor="#151813" />
          <stop offset="1" stopColor="#0E100D" />
        </linearGradient>
        <pattern id="hero-p" width="54" height="54" patternUnits="userSpaceOnUse">
          <path d="M54 0H0v54" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#hero-g)" />
      <rect width="1600" height="900" fill="url(#hero-p)" />
      <g fill="#fff" opacity="0.04">
        <rect x="120" y="120" width="220" height="700" />
        <rect x="1180" y="60" width="300" height="840" />
      </g>
      <g fill="#000" opacity="0.34">
        <circle cx="720" cy="300" r="70" />
        <path d="M620 430h200l30 320c0 0-20 150-130 150s-130-150-130-150z" />
        <circle cx="920" cy="330" r="64" />
        <path d="M832 450h176l26 300c0 0-18 130-114 130s-114-130-114-130z" />
      </g>
      <g stroke="#fff" strokeWidth="1.5" opacity="0.08">
        <path d="M0 620h1600M0 300h1600" />
      </g>
    </svg>
  );
}
