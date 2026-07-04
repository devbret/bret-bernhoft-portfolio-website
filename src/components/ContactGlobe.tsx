import { useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import { delegateHover } from "@/lib/delegateHover";
import { CYBER } from "@/lib/palette";
import { softPointMaterial } from "@/lib/softSprite";
import SceneLayer from "./SceneLayer";

const GLOBE_RADIUS = 8;
const SPIN_SPEED = 0.06;
const PULSE_SECONDS = 2.4;
const PULSE_POOL = 3;
const RING_PLANE = GLOBE_RADIUS * 1.6;

const MARKER_LAT = 45.63;
const MARKER_LON = -122.66;

const latLonToVector = (lat: number, lon: number) => {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    GLOBE_RADIUS * Math.cos(latR) * Math.sin(lonR),
    GLOBE_RADIUS * Math.sin(latR),
    GLOBE_RADIUS * Math.cos(latR) * Math.cos(lonR),
  );
};

const buildGraticule = () => {
  const positions: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) =>
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  const STEPS = 48;
  for (let lat = -75; lat <= 75; lat += 15) {
    for (let i = 0; i < STEPS; i++) {
      push(
        latLonToVector(lat, (i / STEPS) * 360),
        latLonToVector(lat, ((i + 1) / STEPS) * 360),
      );
    }
  }
  for (let lon = 0; lon < 360; lon += 15) {
    for (let i = 0; i < STEPS; i++) {
      push(
        latLonToVector(-90 + (i / STEPS) * 180, lon),
        latLonToVector(-90 + ((i + 1) / STEPS) * 180, lon),
      );
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
};

const ringVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * ${RING_PLANE.toFixed(1)};
    float ring = exp(-pow((d - uRadius) / 0.22, 2.0));
    gl_FragColor = vec4(uColor, ring * uAlpha);
  }
`;

type Pulse = { start: number; strong: boolean; mesh: THREE.Mesh };

type ContactGlobeProps = {
  targetRef: React.RefObject<HTMLElement>;
};

const ContactGlobe = ({ targetRef }: ContactGlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const ready = useThreeScene(
    containerRef,
    ({ renderer, container, reducedMotion }) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.1,
        100,
      );
      camera.position.z = 30;

      const tiltGroup = new THREE.Group();
      tiltGroup.rotation.z = 0.2;
      scene.add(tiltGroup);
      const spinGroup = new THREE.Group();
      spinGroup.rotation.y = (-MARKER_LON * Math.PI) / 180;
      tiltGroup.add(spinGroup);

      const graticuleGeometry = buildGraticule();
      const graticuleMaterial = new THREE.LineBasicMaterial({
        color: CYBER.neon,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      spinGroup.add(
        new THREE.LineSegments(graticuleGeometry, graticuleMaterial),
      );

      const markerPosition = latLonToVector(MARKER_LAT, MARKER_LON);
      const markerNormal = markerPosition.clone().normalize();

      const markerGeometry = new THREE.BufferGeometry();
      markerGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(markerPosition.toArray(), 3),
      );
      const pixelRatio = renderer.getPixelRatio();
      const markerMaterial = softPointMaterial(
        CYBER.orange,
        9,
        pixelRatio,
        0.95,
      );
      spinGroup.add(new THREE.Points(markerGeometry, markerMaterial));

      const ringGeometry = new THREE.PlaneGeometry(RING_PLANE, RING_PLANE);
      const ringOrientation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        markerNormal,
      );
      const ringMaterials: THREE.ShaderMaterial[] = [];
      const ringPool: THREE.Mesh[] = [];
      for (let i = 0; i < PULSE_POOL; i++) {
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color(CYBER.orange) },
            uRadius: { value: 0 },
            uAlpha: { value: 0 },
          },
          vertexShader: ringVertexShader,
          fragmentShader: ringFragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(ringGeometry, material);
        mesh.position.copy(markerPosition);
        mesh.quaternion.copy(ringOrientation);
        mesh.visible = false;
        spinGroup.add(mesh);
        ringMaterials.push(material);
        ringPool.push(mesh);
      }

      const pulses: Pulse[] = [];
      let nextAmbientAt = 1;
      let flare = 0;
      let flareTarget = 0;
      let lastElapsed = 0;

      const firePulse = (elapsed: number, strong: boolean) => {
        const mesh = ringPool.find((m) => !pulses.some((p) => p.mesh === m));
        if (!mesh) return;
        mesh.visible = true;
        pulses.push({ start: elapsed, strong, mesh });
      };

      const target = targetRef.current;
      const unbindHover =
        target && !reducedMotion
          ? delegateHover(
              target,
              "[data-contact]",
              (el) => {
                if (el.dataset.contact === "Location") flareTarget = 1;
                else firePulse(lastElapsed, true);
              },
              (el) => {
                if (el.dataset.contact === "Location") flareTarget = 0;
              },
            )
          : undefined;

      const markerWorld = new THREE.Vector3();

      return {
        scene,
        camera,
        update: (elapsed) => {
          lastElapsed = elapsed;
          spinGroup.rotation.y =
            (-MARKER_LON * Math.PI) / 180 + elapsed * SPIN_SPEED;

          markerWorld.copy(markerPosition);
          spinGroup.localToWorld(markerWorld).normalize();
          const facing = THREE.MathUtils.smoothstep(markerWorld.z, -0.2, 0.35);

          flare += (flareTarget - flare) * 0.1;
          markerMaterial.uniforms.uSize.value = (9 + flare * 5) * pixelRatio;
          markerMaterial.uniforms.uOpacity.value = (0.7 + flare * 0.3) * facing;

          if (elapsed > nextAmbientAt) {
            firePulse(elapsed, false);
            nextAmbientAt = elapsed + 3.5 + Math.random() * 2;
          }
          for (let i = pulses.length - 1; i >= 0; i--) {
            const pulse = pulses[i];
            const t = (elapsed - pulse.start) / PULSE_SECONDS;
            const material = pulse.mesh.material as THREE.ShaderMaterial;
            if (t >= 1) {
              pulse.mesh.visible = false;
              material.uniforms.uAlpha.value = 0;
              pulses.splice(i, 1);
              continue;
            }
            material.uniforms.uRadius.value = t * RING_PLANE * 0.45;
            material.uniforms.uAlpha.value =
              (pulse.strong ? 0.8 : 0.45) * (1 - t) * facing;
          }
        },
        dispose: () => {
          unbindHover?.();
          graticuleGeometry.dispose();
          graticuleMaterial.dispose();
          markerGeometry.dispose();
          markerMaterial.dispose();
          ringGeometry.dispose();
          ringMaterials.forEach((m) => m.dispose());
        },
      };
    },
  );

  return (
    <SceneLayer
      ref={containerRef}
      ready={ready}
      className="z-0 duration-1000 opacity-40"
    />
  );
};

export default ContactGlobe;
