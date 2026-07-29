export default function BookSection() {
  return (
    <section
      id="book"
      className="scroll-mt-24 border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
          Reservations
        </p>
        <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
          Book Your Stay
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/60">
          Experience unparalleled luxury at Aurelia Grand Hotel. Our concierge
          team is ready to craft your perfect escape.
        </p>
        <a
          href="mailto:reservations@aureliagrand.com"
          className="mt-10 inline-block rounded-full bg-luxury-gold px-10 py-4 text-sm uppercase tracking-wider text-black transition hover:bg-white"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
