import RoomCard3D from "./RoomCard3D";

const rooms = [
  {
    id: "1",
    name: "Grand Suite",
    price: "From $890/night",
    size: "85 m² · City View",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    description:
      "Panoramic windows, marble bath, and a private lounge for refined comfort.",
  },
  {
    id: "2",
    name: "Executive Room",
    price: "From $520/night",
    size: "48 m² · Garden View",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d5f331cb4?w=800&q=80",
    description:
      "Minimalist luxury with bespoke furnishings and ambient lighting.",
  },
  {
    id: "3",
    name: "Presidential Suite",
    price: "From $1,450/night",
    size: "120 m² · Skyline View",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    description:
      "An expansive retreat with dining area, spa bath, and butler service.",
  },
];

export default function RoomsSection() {
  return (
    <section id="rooms" className="relative overflow-hidden bg-luxury-bg px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-gold/5 via-transparent to-luxury-gold/5" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-luxury-gold">
            Accommodations
          </p>
          <h2 className="font-serif text-4xl text-luxury-cream md:text-5xl">
            Rooms &amp; Suites
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/40">
            Each space is a masterpiece of design, crafted for the discerning traveler.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard3D key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
