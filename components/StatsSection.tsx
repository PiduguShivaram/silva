"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 127, suffix: "", label: "Years of Excellence" },
  { value: 84, suffix: "", label: "Luxury Suites" },
  { value: 12, suffix: "", label: "Michelin Stars" },
  { value: 5000, suffix: "+", label: "Staff Devoted to You" },
];

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => {
            if (numRef.current) {
              const obj = { val: 0 };
              anime({
                targets: obj,
                val: value,
                duration: 2000,
                delay: index * 120,
                easing: "easeOutCubic",
                update: () => {
                  if (numRef.current) {
                    numRef.current.textContent = Math.round(obj.val).toLocaleString();
                  }
                },
              });
            }
          },
        },
      }
    );
  }, [value, index]);

  return (
    <div ref={ref} className="text-center opacity-0" style={{ opacity: 0 }}>
      <span
        ref={numRef}
        className="font-serif text-5xl text-luxury-gold md:text-6xl"
      >
        0
      </span>
      <span className="font-serif text-5xl text-luxury-gold md:text-6xl">
        {suffix}
      </span>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="border-t border-white/5 bg-luxury-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
