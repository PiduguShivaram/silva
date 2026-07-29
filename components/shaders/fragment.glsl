uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;
varying float vElevation;

void main() {
  float noise = sin(vUv.x * 8.0 + uTime * 0.3) * cos(vUv.y * 8.0 + uTime * 0.2) * 0.5 + 0.5;
  float elevationFactor = vElevation * 2.0 + 0.5;

  vec3 mixed1 = mix(uColor1, uColor2, noise);
  vec3 mixed2 = mix(mixed1, uColor3, elevationFactor);

  float glow = 0.6 + 0.4 * abs(sin(vUv.x * 12.0 + vUv.y * 8.0 + uTime * 0.5));

  gl_FragColor = vec4(mixed2 * glow, 1.0);
}
