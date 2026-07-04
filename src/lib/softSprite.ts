import * as THREE from "three";

const vertexShader = `
  uniform float uSize;
  void main() {
    gl_PointSize = uSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

export const softPointMaterial = (
  hex: number,
  sizePx: number,
  pixelRatio: number,
  opacity = 1,
) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(hex) },
      uSize: { value: sizePx * pixelRatio },
      uOpacity: { value: opacity },
    },
    vertexShader,
    fragmentShader,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
