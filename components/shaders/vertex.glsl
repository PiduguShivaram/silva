uniform float uTime;
uniform float uAmplitude;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave1 = sin(pos.x * 1.5 + pos.z * 1.2 + uTime * 0.4) * 0.04;
  float wave2 = sin(pos.x * 2.3 - pos.z * 1.8 + uTime * 0.6) * 0.03;
  float wave3 = sin(pos.x * 0.8 + pos.z * 0.9 + uTime * 0.2) * 0.05;

  float dist = distance(pos.xz, uMouse * 3.0);
  float mouseInfluence = exp(-dist * 1.5) * 0.15;

  float elevation = (wave1 + wave2 + wave3) * uAmplitude + mouseInfluence;
  pos.y += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
