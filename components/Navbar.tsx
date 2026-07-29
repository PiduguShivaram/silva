"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-serif text-xl tracking-wide text-luxury-cream"
        >
          SILVA
        </a>

        <ul className="hidden items-center gap-8 text-sm uppercase tracking-widest text-white/70 md:flex">
          <li>
            <a
              href="#rooms"
              className="transition-colors hover:text-luxury-gold"
            >
              Rooms
            </a>
          </li>
          <li>
            <a
              href="#amenities"
              className="transition-colors hover:text-luxury-gold"
            >
              Amenities
            </a>
          </li>
          <li>
            <a
              href="#book"
              className="transition-colors hover:text-luxury-gold"
            >
              Contact
            </a>
          </li>
        </ul>

        <a
          href="#book"
          className="rounded-full border border-luxury-gold/50 bg-luxury-gold/10 px-5 py-2 text-sm uppercase tracking-wider text-luxury-gold transition hover:bg-luxury-gold hover:text-black"
        >
          Book Now
        </a>
      </nav>
    </header>
  );
}
