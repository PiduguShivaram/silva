"use client";

import Image from "next/image";
import { useState } from "react";

export type Room = {
  id: string;
  name: string;
  price: string;
  size: string;
  image: string;
  description: string;
};

export default function RoomCard({ room }: { room: Room }) {
  const [active, setActive] = useState(false);

  return (
    <article
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      className={`glass group cursor-pointer overflow-hidden rounded-2xl transition duration-500 ${
        active ? "scale-[1.02] border-luxury-gold/40" : ""
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h3 className="font-serif text-2xl text-luxury-cream">{room.name}</h3>
          <span className="shrink-0 text-sm text-luxury-gold">{room.price}</span>
        </div>
        <p className="text-sm text-white/60">{room.size}</p>
        <p
          className={`mt-3 text-sm leading-relaxed text-white/70 transition-all duration-500 ${
            active ? "opacity-100" : "opacity-70"
          }`}
        >
          {room.description}
        </p>
      </div>
    </article>
  );
}
