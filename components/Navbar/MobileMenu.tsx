"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import anime from "animejs";

const links = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#book", label: "Contact" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!overlayRef.current || !menuRef.current) return;

    if (open) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at 95% 5%)" },
        { clipPath: "circle(150% at 95% 5%)", duration: 0.6, ease: "power3.inOut" }
      );

      anime({
        targets: linksRef.current.filter(Boolean),
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(80, { start: 200 }),
        easing: "easeOutCubic",
        duration: 600,
      });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 95% 5%)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-black/60 opacity-0 backdrop-blur-sm md:hidden"
      onClick={onClose}
    >
      <div
        ref={menuRef}
        className="fixed inset-0 flex flex-col items-center justify-center bg-luxury-surface/95 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              onClick={onClose}
              className="font-serif text-4xl text-luxury-cream opacity-0 transition-colors hover:text-luxury-gold md:text-5xl"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          onClick={onClose}
          className="mt-12 rounded-full border border-luxury-gold/50 bg-luxury-gold/10 px-10 py-4 text-sm uppercase tracking-widest text-luxury-gold opacity-0 transition hover:bg-luxury-gold hover:text-black"
          style={{ opacity: 0 }}
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
