"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const quickLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#book" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    anime({
      targets: [logoRef.current, ...linksRef.current.filter(Boolean)],
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(60, { start: 100 }),
      duration: 500,
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/5 bg-luxury-bg px-6 py-16 opacity-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-gold/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div ref={logoRef}>
            <span className="font-serif text-2xl text-luxury-cream">SILVA</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/30">
              A cinematic sanctuary where modern architecture meets timeless
              elegance.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-luxury-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div ref={(el) => { linksRef.current[0] = el; }}>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-luxury-gold/60">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 transition-colors hover:text-luxury-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div ref={(el) => { linksRef.current[1] = el; }}>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-luxury-gold/60">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-white/40">
              <li>Grand Avenue 1</li>
              <li>New York, NY 10001</li>
              <li>
                <a
                  href="tel:+12125551900"
                  className="transition-colors hover:text-luxury-gold"
                >
                  +1 (212) 555-1900
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservations@aureliagrand.com"
                  className="transition-colors hover:text-luxury-gold"
                >
                  reservations@aureliagrand.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Aurelia Grand Hotel. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
