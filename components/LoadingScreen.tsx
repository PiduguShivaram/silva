"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    )
      .to(barRef.current, {
        width: "100%",
        duration: 1.2,
        ease: "power3.inOut",
      })
      .to(
        textRef.current,
        { opacity: 0, y: -20, scale: 0.95, duration: 0.4 },
        "-=0.2"
      )
      .to(
        containerRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.3"
      );
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-luxury-bg"
    >
      <h1
        ref={textRef}
        className="font-serif text-6xl text-luxury-gold md:text-8xl"
      >
        SILVA
      </h1>
      <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full w-0 bg-luxury-gold"
          style={{ width: "0%" }}
        />
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/20">
        Loading
      </p>
    </div>
  );
}
