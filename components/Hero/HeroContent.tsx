"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import anime from "animejs";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || [];
      titleRef.current.textContent = "";
      const spans = chars.map((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(60px) rotateX(-40deg)";
        span.style.transition = "none";
        titleRef.current?.appendChild(span);
        return span;
      });

      anime({
        targets: spans,
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [-40, 0],
        delay: anime.stagger(40, { start: 800 }),
        duration: 800,
        easing: "easeOutExpo",
      });
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "+=0.2"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        y: 8,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col items-center text-center">
        <p
          ref={subtitleRef}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-luxury-gold/70 md:text-sm"
        >
          A Sanctuary of Timeless Elegance
        </p>

        <h1
          ref={titleRef}
          className="select-none font-serif text-[clamp(4rem,18vw,12rem)] font-black leading-none tracking-tight text-white"
        >
          SILVA
        </h1>

        <div className="mt-6 hidden h-px w-16 bg-luxury-gold/50 md:block" />
      </div>

      <div className="pointer-events-auto absolute bottom-0 flex flex-col items-center gap-6 pb-16">
        <a
          ref={ctaRef}
          href="#rooms"
          className="rounded-full border border-luxury-gold/40 bg-luxury-gold/10 px-8 py-3 text-xs uppercase tracking-[0.3em] text-luxury-gold backdrop-blur-md transition-all hover:bg-luxury-gold hover:text-black"
        >
          Explore Rooms
        </a>

        <div
          ref={scrollHintRef}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-luxury-gold/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
