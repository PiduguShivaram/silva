"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";

const landmarks = [
  { label: "Central Park", dist: "5 min", icon: "🌳" },
  { label: "Art District", dist: "8 min", icon: "🎨" },
  { label: "Financial Hub", dist: "12 min", icon: "🏛" },
  { label: "Botanical Gardens", dist: "15 min", icon: "🌸" },
  { label: "Marina Bay", dist: "20 min", icon: "⛵" },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: pinsRef.current.filter(Boolean),
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.8, 1],
              delay: anime.stagger(120, { start: 300 }),
              duration: 600,
              easing: "easeOutCubic",
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative overflow-hidden bg-luxury-surface/10 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={titleRef} className="mb-16 text-center opacity-0">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
            Prime Location
          </p>
          <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
            In the Heart of the City
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/40">
            Situated where culture, commerce, and nature converge.
          </p>
        </div>

        <div
          ref={mapRef}
          className="relative mx-auto h-[400px] max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-luxury-surface to-luxury-bg p-8 opacity-0 shadow-2xl shadow-luxury-gold/5 md:h-[500px]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,98,0.08),transparent_70%)]" />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-luxury-gold shadow-lg shadow-luxury-gold/30">
              <span className="text-2xl">★</span>
            </div>
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-center">
              <p className="font-serif text-sm text-luxury-gold">SILVA</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30">
                Hotel
              </p>
            </div>
          </div>

          {landmarks.map((lm, i) => {
            const angle = (i / landmarks.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 120 + i * 15;
            const x = 50 + (Math.cos(angle) * radius) / 5;
            const y = 50 + (Math.sin(angle) * radius) / 5;
            return (
              <div
                key={lm.label}
                ref={(el) => { pinsRef.current[i] = el; }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 opacity-0 backdrop-blur-md"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <span className="text-sm">{lm.icon}</span>
                <div>
                  <p className="text-xs font-medium text-white/80">{lm.label}</p>
                  <p className="text-[10px] text-luxury-gold">{lm.dist}</p>
                </div>
              </div>
            );
          })}

          {landmarks.map((_, i) => {
            const angle = (i / landmarks.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 120 + i * 15;
            const x = 50 + (Math.cos(angle) * radius) / 5;
            const y = 50 + (Math.sin(angle) * radius) / 5;
            return (
              <div
                key={`line-${i}`}
                className="absolute left-1/2 top-1/2 h-px -translate-y-1/2"
                style={{
                  width: `${radius / 5}%`,
                  transform: `translateY(-50%) rotate(${angle}rad)`,
                  transformOrigin: "left center",
                  background:
                    "linear-gradient(90deg, rgba(201,169,98,0.3), transparent)",
                }}
              />
            );
          })}

          <div className="absolute bottom-4 left-4 rounded-lg bg-black/40 px-3 py-2 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-widest text-white/40">
              Grand Avenue at Central Park
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
