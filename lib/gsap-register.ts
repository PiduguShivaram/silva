"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPRegister() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  return null;
}
