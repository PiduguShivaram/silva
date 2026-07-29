"use client";

import { useEffect, useState } from "react";

export type GPUTier = "low" | "medium" | "high";

export default function useDetectedGPU(): GPUTier {
  const [tier, setTier] = useState<GPUTier>("medium");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setTier("low");
      return;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ""
      : "";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isLowEnd = /Adreno 5|Adreno 6[0-2]|Mali-4|Mali-3/i.test(renderer);

    if (isMobile || isLowEnd) {
      setTier("low");
    } else if (/Adreno 6[3-9]|Mali-G|Apple GPU|GeForce|RTX/i.test(renderer)) {
      setTier("high");
    } else {
      setTier("medium");
    }
  }, []);

  return tier;
}
