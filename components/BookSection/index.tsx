import AnimatedForm from "./AnimatedForm";

export default function BookSection() {
  return (
    <section
      id="book"
      className="relative overflow-hidden border-t border-white/5 px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-luxury-gold/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
          Reservations
        </p>
        <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
          Book Your Stay
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/40">
          Experience unparalleled luxury at Aurelia Grand Hotel. Our concierge
          team is ready to craft your perfect escape.
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl">
        <div className="pointer-events-none absolute -inset-20 rounded-[100px] bg-luxury-gold/5 blur-[100px]" />
        <AnimatedForm />
      </div>
    </section>
  );
}
