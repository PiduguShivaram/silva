const amenities = [
  { title: "Infinity Pool", desc: "Rooftop oasis with skyline views" },
  { title: "Spa & Wellness", desc: "Holistic treatments and thermal suites" },
  { title: "Fine Dining", desc: "Michelin-inspired seasonal cuisine" },
  { title: "Private Concierge", desc: "Tailored experiences, anytime" },
  { title: "Fitness Studio", desc: "Premium equipment and personal training" },
  { title: "Executive Lounge", desc: "Quiet luxury for business travelers" },
];

export default function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="scroll-mt-24 border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
            Experience
          </p>
          <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
            Amenities
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="glass rounded-2xl p-8 transition hover:border-luxury-gold/30"
            >
              <h3 className="font-serif text-xl text-luxury-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
