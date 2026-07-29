import AmenityCard3D from "./AmenityCard3D";

const amenities = [
  { title: "Infinity Pool", desc: "Rooftop oasis with skyline views", icon: "🏊" },
  { title: "Spa & Wellness", desc: "Holistic treatments and thermal suites", icon: "🧖" },
  { title: "Fine Dining", desc: "Michelin-inspired seasonal cuisine", icon: "🍽" },
  { title: "Private Concierge", desc: "Tailored experiences, anytime", icon: "✨" },
  { title: "Fitness Studio", desc: "Premium equipment and personal training", icon: "🏋" },
  { title: "Executive Lounge", desc: "Quiet luxury for business travelers", icon: "🥂" },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-luxury-surface/20 px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxury-gold/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
            Experience
          </p>
          <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
            Amenities
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/40">
            Every detail considered for your comfort and delight.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item, i) => (
            <AmenityCard3D
              key={item.title}
              title={item.title}
              desc={item.desc}
              index={i}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
