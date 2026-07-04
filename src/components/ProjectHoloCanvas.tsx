import { useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import { delegateHover } from "@/lib/delegateHover";
import { CYBER, glslColor } from "@/lib/palette";

const SWEEP_SECONDS = 0.9;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uTime;
  uniform float uSweepStart;
  uniform float uHover;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  varying vec2 vUv;

  void main() {
    float t = uTime - uSweepStart;
    float sweepPos = 1.15 - clamp(t / ${SWEEP_SECONDS.toFixed(2)}, 0.0, 1.0) * 1.3;
    float band = exp(-pow((vUv.y - sweepPos) / 0.07, 2.0));

    vec3 light = vec3(0.0);

    light += ${glslColor(CYBER.neon)} * band * 0.15;

    if (uHasMap > 0.5) {
      vec2 uv = uUvOffset + vUv * uUvScale;
      float split = 0.012 * band;
      vec3 ghost;
      ghost.r = texture2D(uMap, uv + vec2(split, 0.0)).r;
      ghost.g = texture2D(uMap, uv).g;
      ghost.b = texture2D(uMap, uv - vec2(split, 0.0)).b;
      light += ghost * band * 0.4;
    }

    light += ${glslColor(CYBER.neon)} * (0.015 + 0.015 * sin(vUv.y * 500.0 + uTime * 2.0));

    gl_FragColor = vec4(light * uHover, 1.0);
  }
`;

type ProjectHoloCanvasProps = {
  targetRef: React.RefObject<HTMLElement>;
};

const ProjectHoloCanvas = ({ targetRef }: ProjectHoloCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useThreeScene(containerRef, ({ container, reducedMotion }) => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uMap: { value: null as THREE.Texture | null },
      uHasMap: { value: 0 },
      uTime: { value: 0 },
      uSweepStart: { value: -10 },
      uHover: { value: 0 },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const textures = new Map<string, THREE.Texture>();
    const loader = new THREE.TextureLoader();
    let currentCard: HTMLElement | null = null;
    let currentSrc = "";
    let hoverTarget = 0;
    let restartSweep = false;

    const applyTexture = (texture: THREE.Texture, card: HTMLElement) => {
      const { width, height } = texture.image as HTMLImageElement;
      const rect = card.getBoundingClientRect();
      const cardAspect = rect.width / rect.height;
      const imageAspect = width / height;
      if (imageAspect > cardAspect) {
        const w = cardAspect / imageAspect;
        uniforms.uUvScale.value.set(w, 1);
        uniforms.uUvOffset.value.set((1 - w) / 2, 0);
      } else {
        const h = imageAspect / cardAspect;
        uniforms.uUvScale.value.set(1, h);
        uniforms.uUvOffset.value.set(0, (1 - h) / 2);
      }
      uniforms.uMap.value = texture;
      uniforms.uHasMap.value = 1;
    };

    const activate = (card: HTMLElement) => {
      const src = card.dataset.holoSrc ?? "";
      const target = targetRef.current;
      if (!src || !target) return;
      const rect = card.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      Object.assign(container.style, {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transform: `translate(${rect.left - targetRect.left}px, ${rect.top - targetRect.top}px)`,
        opacity: "1",
      });
      currentSrc = src;
      hoverTarget = 1;
      restartSweep = true;
      const cached = textures.get(src);
      if (cached) {
        applyTexture(cached, card);
      } else {
        uniforms.uHasMap.value = 0;
        loader.load(src, (texture) => {
          textures.set(src, texture);
          if (currentSrc === src && currentCard) {
            applyTexture(texture, currentCard);
          }
        });
      }
    };

    const deactivate = () => {
      hoverTarget = 0;
      container.style.opacity = "0";
    };

    const target = targetRef.current;
    const unbindHover =
      target && !reducedMotion
        ? delegateHover(
            target,
            "[data-holo-src]",
            (card) => {
              if (card === currentCard) return;
              currentCard = card;
              activate(card);
            },
            () => {
              currentCard = null;
              currentSrc = "";
              deactivate();
            },
          )
        : undefined;

    return {
      scene,
      camera,
      update: (elapsed) => {
        if (restartSweep) {
          uniforms.uSweepStart.value = elapsed;
          restartSweep = false;
        }
        uniforms.uTime.value = elapsed;
        uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.12;
      },
      dispose: () => {
        unbindHover?.();
        textures.forEach((texture) => texture.dispose());
        geometry.dispose();
        material.dispose();
      },
    };
  });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ width: 1, height: 1 }}
      className="pointer-events-none absolute left-0 top-0 z-20 mix-blend-screen rounded-lg overflow-hidden opacity-0 transition-opacity duration-300"
    />
  );
};

export default ProjectHoloCanvas;
