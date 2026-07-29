"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#book", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    tl.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, "-=0.6")
      .fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, stagger: 0.06 },
        "-=0.4"
      )
      .fromTo(ctaRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, "-=0.3");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 60;
      if (s !== scrolled) {
        setScrolled(s);
        gsap.to(headerRef.current, {
          backgroundColor: s ? "rgba(10, 10, 11, 0.85)" : "rgba(10, 10, 11, 0.3)",
          borderColor: s ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-black/30 opacity-0 backdrop-blur-xl"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            ref={logoRef}
            href="#"
            className="font-serif text-xl tracking-wide text-luxury-cream"
          >
            SILVA
          </a>

          <ul className="hidden items-center gap-8 text-sm uppercase tracking-widest text-white/70 md:flex">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                ref={(el) => { linksRef.current[i] = el; }}
              >
                <a
                  href={link.href}
                  className="relative transition-colors hover:text-luxury-gold"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-luxury-gold transition-all duration-500 group-hover:w-full hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              ref={ctaRef}
              href="#book"
              className="hidden rounded-full border border-luxury-gold/50 bg-luxury-gold/10 px-5 py-2 text-sm uppercase tracking-wider text-luxury-gold transition hover:bg-luxury-gold hover:text-black md:inline-block"
            >
              Book Now
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Open menu"
            >
              <span className="block h-px w-6 bg-luxury-cream transition" />
              <span className="block h-px w-6 bg-luxury-cream transition" />
              <span className="block h-px w-6 bg-luxury-cream transition" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
