import { useRef, useState } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import SceneLayer from "./SceneLayer";

const CAMERA_Z = 1.6;
const FOV = 35;

const PLANE_SIZE = 2 * CAMERA_Z * Math.tan((FOV / 2) * (Math.PI / 180)) * 1.06;
const MAX_TILT_X = 0.2;
const MAX_TILT_Y = 0.26;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uGlitch;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  varying vec2 vUv;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    vec2 uv = uUvOffset + vUv * uUvScale;

    float row = floor(vUv.y * 56.0);
    uv.x += (hash(row + floor(uTime * 14.0)) - 0.5) * 0.03 * uGlitch;

    float split = (0.0012 + 0.006 * uGlitch) * uUvScale.x;
    vec3 col;
    col.r = texture2D(uMap, uv + vec2(split, 0.0)).r;
    col.g = texture2D(uMap, uv).g;
    col.b = texture2D(uMap, uv - vec2(split, 0.0)).b;

    col *= 0.94 + 0.06 * sin(vUv.y * 640.0 + uTime * 3.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

type HoloPortraitProps = {
  src: string;
  onReady?: () => void;
};

const HoloPortrait = ({ src, onReady }: HoloPortraitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const [faded, setFaded] = useState(false);

  useThreeScene(containerRef, ({ container, reducedMotion, invalidate }) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      FOV,
      container.clientWidth / container.clientHeight || 1,
      0.1,
      10,
    );
    camera.position.z = CAMERA_Z;

    const uniforms = {
      uMap: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uGlitch: { value: 0 },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = false;
    scene.add(mesh);

    let texture: THREE.Texture | undefined;
    new THREE.TextureLoader().load(src, (loaded) => {
      texture = loaded;
      const { width, height } = loaded.image as HTMLImageElement;

      if (width > height) {
        uniforms.uUvScale.value.set(height / width, 1);
        uniforms.uUvOffset.value.set((1 - height / width) / 2, 0);
      } else {
        uniforms.uUvScale.value.set(1, width / height);
        uniforms.uUvOffset.value.set(0, (1 - width / height) / 2);
      }
      uniforms.uMap.value = loaded;
      mesh.visible = true;
      invalidate();
      setFaded(true);
      onReadyRef.current?.();
    });

    const tiltTarget = { x: 0, y: 0 };
    let hovered = false;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      tiltTarget.y = px * MAX_TILT_Y;
      tiltTarget.x = -py * MAX_TILT_X;
    };
    const handlePointerEnter = () => {
      hovered = true;
    };
    const handlePointerLeave = () => {
      hovered = false;
      tiltTarget.x = 0;
      tiltTarget.y = 0;
    };
    if (!reducedMotion) {
      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerenter", handlePointerEnter);
      container.addEventListener("pointerleave", handlePointerLeave);
    }

    return {
      scene,
      camera,
      update: (elapsed) => {
        uniforms.uTime.value = elapsed;

        const idlePulse = elapsed % 7 < 0.18 ? 0.55 : 0;
        const target = hovered ? 0.35 : idlePulse;
        uniforms.uGlitch.value += (target - uniforms.uGlitch.value) * 0.2;
        mesh.rotation.x += (tiltTarget.x - mesh.rotation.x) * 0.1;
        mesh.rotation.y += (tiltTarget.y - mesh.rotation.y) * 0.1;
      },
      dispose: () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerenter", handlePointerEnter);
        container.removeEventListener("pointerleave", handlePointerLeave);
        geometry.dispose();
        material.dispose();
        texture?.dispose();
      },
    };
  });

  return (
    <SceneLayer
      ref={containerRef}
      ready={faded}
      className="pointer-events-auto duration-700"
    />
  );
};

export default HoloPortrait;
