import { useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import { delegateHover } from "@/lib/delegateHover";
import { CYBER, TOPIC_COLORS } from "@/lib/palette";
import { softPointMaterial } from "@/lib/softSprite";
import SceneLayer from "./SceneLayer";

const hashString = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

type Emblem = {
  element: HTMLElement;
  group: THREE.Group;
  material: THREE.LineBasicMaterial;
  speed: number;
  phase: number;
  angle: number;
  boost: number;
  boostTarget: number;
};

type EndorsementEmblemsProps = {
  targetRef: React.RefObject<HTMLElement>;
};

const EndorsementEmblems = ({ targetRef }: EndorsementEmblemsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const ready = useThreeScene(
    containerRef,
    ({ renderer, container, reducedMotion }) => {
      const scene = new THREE.Scene();

      const camera = new THREE.OrthographicCamera(
        0,
        container.clientWidth,
        0,
        container.clientHeight,
        -50,
        50,
      );
      const pixelRatio = renderer.getPixelRatio();

      const edgeGeometries = [
        new THREE.TetrahedronGeometry(1),
        new THREE.OctahedronGeometry(1),
        new THREE.IcosahedronGeometry(1),
        new THREE.DodecahedronGeometry(1),
      ].map((source) => {
        const edges = new THREE.EdgesGeometry(source);
        source.dispose();
        return edges;
      });
      const coreGeometry = new THREE.BufferGeometry();
      coreGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([0, 0, 0], 3),
      );

      const emblems: Emblem[] = [];
      const materials: THREE.Material[] = [];
      const chips = [
        ...(targetRef.current?.querySelectorAll("[data-emblem]") ?? []),
      ] as HTMLElement[];
      chips.forEach((element) => {
        const name = element.dataset.emblem ?? "";
        const seed = hashString(name);
        const color = TOPIC_COLORS[element.dataset.tag ?? ""] ?? CYBER.neon;
        const material = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const group = new THREE.Group();
        group.add(new THREE.LineSegments(edgeGeometries[seed % 4], material));
        const coreMaterial = softPointMaterial(color, 3, pixelRatio, 0.9);
        group.add(new THREE.Points(coreGeometry, coreMaterial));
        materials.push(material, coreMaterial);
        scene.add(group);
        emblems.push({
          element,
          group,
          material,
          speed: 0.35 + ((seed >>> 3) % 100) * 0.004,
          phase: ((seed >>> 9) % 628) / 100,
          angle: 0,
          boost: 0,
          boostTarget: 0,
        });
      });

      const measureAll = () => {
        const wrapperRect = container.getBoundingClientRect();
        emblems.forEach(({ element, group }) => {
          const rect = element.getBoundingClientRect();
          group.position.set(
            rect.left - wrapperRect.left + rect.width / 2,
            rect.top - wrapperRect.top + rect.height / 2,
            0,
          );
          group.scale.setScalar(rect.width * 0.34);
        });
      };
      measureAll();

      const byName = new Map(
        emblems.map((emblem) => [emblem.element.dataset.emblem, emblem]),
      );
      const target = targetRef.current;
      const unbindHover =
        target && !reducedMotion
          ? delegateHover(
              target,
              "[data-endorsement]",
              (el) => {
                const emblem = byName.get(el.dataset.endorsement);
                if (emblem) emblem.boostTarget = 1;
              },
              (el) => {
                const emblem = byName.get(el.dataset.endorsement);
                if (emblem) emblem.boostTarget = 0;
              },
            )
          : undefined;

      let lastElapsed = 0;
      let frame = 0;

      return {
        scene,
        camera,
        onResize: (width, height) => {
          camera.right = width;
          camera.bottom = height;
          camera.updateProjectionMatrix();
          measureAll();
        },
        update: (elapsed) => {
          const dt = Math.min(Math.max(elapsed - lastElapsed, 0), 0.1);
          lastElapsed = elapsed;

          if (frame++ % 60 === 0) measureAll();
          emblems.forEach((emblem) => {
            emblem.boost += (emblem.boostTarget - emblem.boost) * 0.08;
            emblem.angle += dt * emblem.speed * (1 + emblem.boost * 2.2);
            emblem.group.rotation.y = emblem.angle + emblem.phase;
            emblem.group.rotation.x = emblem.angle * 0.6 + emblem.phase;
            emblem.material.opacity = 0.75 + emblem.boost * 0.25;
          });
        },
        dispose: () => {
          unbindHover?.();
          edgeGeometries.forEach((g) => g.dispose());
          coreGeometry.dispose();
          materials.forEach((m) => m.dispose());
        },
      };
    },
  );

  return (
    <SceneLayer
      ref={containerRef}
      ready={ready}
      className="z-20 duration-700"
    />
  );
};

export default EndorsementEmblems;
