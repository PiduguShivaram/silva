"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
type Room = {
  id: string;
  name: string;
  price: string;
  size: string;
  image: string;
  description: string;
};

type Props = { room: Room; index: number };

export default function RoomCard3D({ room, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 80, rotateX: 10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.6,
      ease: "power2.out",
    });
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: -x * 10,
        y: -y * 10,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-luxury-surface/60 backdrop-blur-sm will-change-transform"
      style={{ perspective: "1000px", opacity: 0 }}
    >
      <div
        ref={imageRef}
        className="relative h-64 overflow-hidden will-change-transform"
      >
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/90 via-luxury-bg/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span
            ref={priceRef}
            className="rounded-full bg-luxury-gold/20 px-4 py-1.5 text-xs font-medium text-luxury-gold backdrop-blur-sm"
          >
            {room.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl text-luxury-cream">{room.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
          {room.size}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          {room.description}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span>Discover</span>
          <span className="inline-block h-px w-8 bg-luxury-gold transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </article>
  );
}
