"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs";

export default function AnimatedForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    gsap.fromTo(
      form,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    anime({
      targets: fieldsRef.current.filter(Boolean),
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80, { start: 200 }),
      duration: 600,
      easing: "easeOutCubic",
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    if (dist < 100) {
      gsap.to(buttonRef.current, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <form
      ref={formRef}
      className="mx-auto max-w-lg space-y-6 opacity-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        ref={(el) => { fieldsRef.current[0] = el; }}
        className="group relative opacity-0"
      >
        <input
          type="text"
          id="name"
          placeholder=" "
          className="peer w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-luxury-cream outline-none transition-all duration-300 focus:border-luxury-gold"
        />
        <label
          htmlFor="name"
          className="absolute left-0 top-3 text-sm text-white/30 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-luxury-gold"
        >
          Full Name
        </label>
      </div>

      <div
        ref={(el) => { fieldsRef.current[1] = el; }}
        className="group relative opacity-0"
      >
        <input
          type="email"
          id="email"
          placeholder=" "
          className="peer w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-luxury-cream outline-none transition-all duration-300 focus:border-luxury-gold"
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-3 text-sm text-white/30 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-luxury-gold"
        >
          Email Address
        </label>
      </div>

      <div
        ref={(el) => { fieldsRef.current[2] = el; }}
        className="group relative opacity-0"
      >
        <select
          id="room"
          className="peer w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white/50 outline-none transition-all duration-300 focus:border-luxury-gold"
          defaultValue=""
        >
          <option value="" disabled>
            Select a room
          </option>
          <option value="grand">Grand Suite</option>
          <option value="executive">Executive Room</option>
          <option value="presidential">Presidential Suite</option>
        </select>
      </div>

      <div
        ref={(el) => { fieldsRef.current[3] = el; }}
        className="flex gap-4 opacity-0"
      >
        <div className="group relative flex-1">
          <input
            type="date"
            id="checkin"
            className="peer w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-luxury-cream outline-none transition-all duration-300 focus:border-luxury-gold [color-scheme:dark]"
          />
          <label
            htmlFor="checkin"
            className="absolute left-0 -top-4 text-xs text-luxury-gold/60"
          >
            Check In
          </label>
        </div>
        <div className="group relative flex-1">
          <input
            type="date"
            id="checkout"
            className="peer w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-luxury-cream outline-none transition-all duration-300 focus:border-luxury-gold [color-scheme:dark]"
          />
          <label
            htmlFor="checkout"
            className="absolute left-0 -top-4 text-xs text-luxury-gold/60"
          >
            Check Out
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button
          ref={buttonRef}
          type="submit"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full rounded-full bg-luxury-gold px-8 py-4 text-sm uppercase tracking-widest text-black transition-all hover:bg-white"
        >
          Confirm Reservation
        </button>
      </div>
    </form>
  );
}
