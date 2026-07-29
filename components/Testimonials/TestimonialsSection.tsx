"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuoteCard3D from "./QuoteCard3D";

const testimonials = [
  {
    quote:
      "An extraordinary experience from the moment we arrived. The architecture alone is worth the journey, but the service elevates it to something truly timeless.",
    author: "Eleanor V.",
    title: "Grand Suite Guest",
  },
  {
    quote:
      "The Presidential Suite redefines what luxury means. Every detail, from the linens to the ambient lighting, has been considered with impeccable taste.",
    author: "James K.",
    title: "Presidential Suite Guest",
  },
  {
    quote:
      "SILVA is not just a hotel; it is a destination. The rooftop infinity pool at sunset is nothing short of magical. We will return every year.",
    author: "Amara & David",
    title: "Executive Room Guests",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-luxury-bg px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div ref={titleRef} className="mb-16 text-center opacity-0">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
            Voices of Our Guests
          </h2>
        </div>

        <div className="relative min-h-[300px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ${
                i === activeIndex
                  ? "relative opacity-100"
                  : "absolute opacity-0"
              }`}
            >
              <QuoteCard3D
                quote={t.quote}
                author={t.author}
                title={t.title}
                active={i === activeIndex}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "h-2 w-8 bg-luxury-gold"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
