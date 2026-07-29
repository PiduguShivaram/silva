"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=1200&q=80",
    alt: "Hotel lobby",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    alt: "Infinity pool",
  },
  {
    src: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=1200&q=80",
    alt: "Restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
    alt: "Spa",
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d5f331cb4?w=1200&q=80",
    alt: "Suite interior",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const content = track.querySelector<HTMLDivElement>(".gallery-track");
    if (!content) return;

    const ctx = gsap.context(() => {
      const totalWidth = content.scrollWidth;
      const viewWidth = window.innerWidth;
      const maxScroll = -(totalWidth - viewWidth);

      gsap.to(content, {
        x: maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: () => `+=${totalWidth - viewWidth}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.round(progress * (images.length - 1));
            setActiveIndex(Math.min(idx, images.length - 1));
          },
        },
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-luxury-bg"
    >
      <div className="px-6 pt-24 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
          Visual Journey
        </p>
        <h2 className="mb-16 font-serif text-4xl text-luxury-cream md:text-5xl">
          Gallery
        </h2>
      </div>

      <div ref={trackRef} className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        <div
          ref={containerRef}
          className="gallery-track flex h-full gap-6 px-6 will-change-transform"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative h-full w-[70vw] flex-shrink-0 overflow-hidden rounded-2xl transition-opacity duration-500 md:w-[45vw] lg:w-[35vw] ${
                i === activeIndex ? "opacity-100" : "opacity-60"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs uppercase tracking-widest text-white/60">
                  0{i + 1}
                </p>
                <p className="font-serif text-lg text-white">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const track = trackRef.current?.querySelector<HTMLDivElement>(".gallery-track");
                if (track) {
                  const totalWidth = track.scrollWidth;
                  const viewWidth = window.innerWidth;
                  const maxScroll = totalWidth - viewWidth;
                  gsap.to(track, {
                    x: -(maxScroll * (i / (images.length - 1))),
                    duration: 0.8,
                    ease: "power3.out",
                  });
                  setActiveIndex(i);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 bg-luxury-gold"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
