import { useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import { delegateHover } from "@/lib/delegateHover";
import { CYBER } from "@/lib/palette";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import SceneLayer from "./SceneLayer";

const NEON = new THREE.Color(CYBER.neon);

type SkillNode = {
  skill: string;
  category: number;
  position: THREE.Vector3;
};

const tokensOf = (skill: string) =>
  skill.split("/").map((t) => t.toLowerCase().replace(/\.js$/, "").trim());

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph(clusterX: number) {
  const rand = mulberry32(20260703);
  const nodes: SkillNode[] = [];
  const hubs: THREE.Vector3[] = [];

  skillCategories.forEach((category, ci) => {
    const cx = ci % 2 === 0 ? -clusterX : clusterX;
    const cy = 4.6 - Math.floor(ci / 2) * 4.6;
    const center = new THREE.Vector3(cx, cy, (rand() - 0.5) * 3);
    hubs.push(center);
    category.skills.forEach((skill) => {
      const angle = rand() * Math.PI * 2;
      const radius = 0.9 + rand() * 1.4;
      nodes.push({
        skill,
        category: ci,
        position: new THREE.Vector3(
          center.x + Math.cos(angle) * radius,
          center.y + Math.sin(angle) * radius * 0.75,
          center.z + (rand() - 0.5) * 2.4,
        ),
      });
    });
  });

  const tokenToNode = new Map<string, number>();
  nodes.forEach((node, i) => {
    tokensOf(node.skill).forEach((token) => {
      if (!tokenToNode.has(token)) tokenToNode.set(token, i);
    });
  });

  const weights = new Map<string, number>();
  projects.forEach((project) => {
    const members = [
      ...new Set(
        project.tags
          .map((tag) => tokenToNode.get(tag.toLowerCase().replace(/\.js$/, "")))
          .filter((i): i is number => i !== undefined),
      ),
    ];
    for (let a = 0; a < members.length; a++) {
      for (let b = a + 1; b < members.length; b++) {
        const key = `${Math.min(members[a], members[b])}:${Math.max(members[a], members[b])}`;
        weights.set(key, (weights.get(key) ?? 0) + 1);
      }
    }
  });
  const edges = [...weights.entries()].map(([key, weight]) => {
    const [a, b] = key.split(":").map(Number);
    return { a, b, weight };
  });

  return { nodes, hubs, edges };
}

const starsVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.85 + 0.3 * sin(uTime * 1.5 + aPhase);
    gl_PointSize = aSize * uSizeScale * twinkle * uPixelRatio * (14.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const starsFragmentShader = `
  uniform float uStrength;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, alpha * uStrength);
  }
`;

const starsMaterialWith = (
  strength: { value: number },
  sizeScale: number,
  pixelRatio: number,
) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uSizeScale: { value: sizeScale },
      uStrength: strength,
    },
    vertexShader: starsVertexShader,
    fragmentShader: starsFragmentShader,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });

const linksVertexShader = `
  attribute vec3 aColor;
  attribute float aT;
  attribute float aOffset;
  varying vec3 vColor;
  varying float vT;
  varying float vOffset;
  void main() {
    vColor = aColor;
    vT = aT;
    vOffset = aOffset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const linksFragmentShader = `
  uniform float uTime;
  uniform float uPulse;
  varying vec3 vColor;
  varying float vT;
  varying float vOffset;
  void main() {
    float p = fract(vT - uTime * 0.1 - vOffset);
    float pulse = exp(-pow((p - 0.5) / 0.06, 2.0)) * uPulse;
    gl_FragColor = vec4(vColor * (1.0 + pulse * 1.6), 0.4);
  }
`;

type SkillConstellationProps = {
  targetRef: React.RefObject<HTMLElement>;
};

const SkillConstellation = ({ targetRef }: SkillConstellationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const ready = useThreeScene(
    containerRef,
    ({ renderer, container, reducedMotion }) => {
      const scene = new THREE.Scene();
      const aspect =
        container.clientWidth / Math.max(container.clientHeight, 1);
      const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
      camera.position.z = 16;

      const halfHeight = 16 * Math.tan((25 * Math.PI) / 180);
      const halfWidth = halfHeight * aspect;
      const clusterX = Math.min(Math.max(halfWidth * 0.5, 1.2), 3.8);
      const { nodes, hubs, edges } = buildGraph(clusterX);

      const group = new THREE.Group();
      scene.add(group);
      const pixelRatio = renderer.getPixelRatio();
      const disposables: { dispose: () => void }[] = [];

      const starCount = nodes.length + hubs.length;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const phases = new Float32Array(starCount);
      const rand = mulberry32(7);
      nodes.forEach((node, i) => {
        node.position.toArray(positions, i * 3);
        NEON.toArray(colors, i * 3);
        sizes[i] = 7;
        phases[i] = rand() * Math.PI * 2;
      });
      hubs.forEach((hub, h) => {
        const i = nodes.length + h;
        hub.toArray(positions, i * 3);
        NEON.clone()
          .lerp(new THREE.Color(1, 1, 1), 0.5)
          .toArray(colors, i * 3);
        sizes[i] = 11;
        phases[i] = rand() * Math.PI * 2;
      });
      const starsGeometry = new THREE.BufferGeometry();
      starsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      starsGeometry.setAttribute(
        "aColor",
        new THREE.BufferAttribute(colors, 3),
      );
      starsGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      starsGeometry.setAttribute(
        "aPhase",
        new THREE.BufferAttribute(phases, 1),
      );
      const coreMaterial = starsMaterialWith({ value: 1 }, 1, pixelRatio);
      const haloMaterial = starsMaterialWith({ value: 0.11 }, 2.6, pixelRatio);
      group.add(new THREE.Points(starsGeometry, coreMaterial));
      group.add(new THREE.Points(starsGeometry, haloMaterial));
      disposables.push(starsGeometry, coreMaterial, haloMaterial);

      const bgCount = 120;
      const bgPositions = new Float32Array(bgCount * 3);
      const bgColors = new Float32Array(bgCount * 3);
      const bgSizes = new Float32Array(bgCount);
      const bgPhases = new Float32Array(bgCount);
      const bgColor = NEON.clone();
      for (let i = 0; i < bgCount; i++) {
        bgPositions[i * 3] = (rand() * 2 - 1) * halfWidth * 1.3;
        bgPositions[i * 3 + 1] = (rand() * 2 - 1) * halfHeight * 1.15;
        bgPositions[i * 3 + 2] = -7 + rand() * 5;
        bgColor
          .clone()
          .multiplyScalar(0.25 + rand() * 0.45)
          .toArray(bgColors, i * 3);
        bgSizes[i] = 3 + rand() * 3;
        bgPhases[i] = rand() * Math.PI * 2;
      }
      const bgGeometry = new THREE.BufferGeometry();
      bgGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(bgPositions, 3),
      );
      bgGeometry.setAttribute("aColor", new THREE.BufferAttribute(bgColors, 3));
      bgGeometry.setAttribute("aSize", new THREE.BufferAttribute(bgSizes, 1));
      bgGeometry.setAttribute("aPhase", new THREE.BufferAttribute(bgPhases, 1));
      const bgMaterial = starsMaterialWith({ value: 0.8 }, 1, pixelRatio);
      group.add(new THREE.Points(bgGeometry, bgMaterial));
      disposables.push(bgGeometry, bgMaterial);

      const makeLinks = (
        segments: {
          from: THREE.Vector3;
          to: THREE.Vector3;
          fromColor: THREE.Color;
          toColor: THREE.Color;
        }[],
        pulse: number,
      ) => {
        const pos: number[] = [];
        const col: number[] = [];
        const ts: number[] = [];
        const offsets: number[] = [];
        segments.forEach(({ from, to, fromColor, toColor }) => {
          pos.push(from.x, from.y, from.z, to.x, to.y, to.z);
          col.push(
            fromColor.r,
            fromColor.g,
            fromColor.b,
            toColor.r,
            toColor.g,
            toColor.b,
          );
          ts.push(0, 1);
          const offset = rand();
          offsets.push(offset, offset);
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(pos, 3),
        );
        geometry.setAttribute(
          "aColor",
          new THREE.Float32BufferAttribute(col, 3),
        );
        geometry.setAttribute("aT", new THREE.Float32BufferAttribute(ts, 1));
        geometry.setAttribute(
          "aOffset",
          new THREE.Float32BufferAttribute(offsets, 1),
        );
        const material = new THREE.ShaderMaterial({
          uniforms: { uTime: { value: 0 }, uPulse: { value: pulse } },
          vertexShader: linksVertexShader,
          fragmentShader: linksFragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        });
        group.add(new THREE.LineSegments(geometry, material));
        disposables.push(geometry, material);
        return material;
      };

      const spokesMaterial = makeLinks(
        nodes.map((node) => ({
          from: hubs[node.category],
          to: node.position,
          fromColor: NEON.clone().multiplyScalar(0.2),
          toColor: NEON.clone().multiplyScalar(0.2),
        })),
        0,
      );
      const linksMaterial = makeLinks(
        edges.map(({ a, b, weight }) => {
          const brightness = 0.22 + 0.07 * Math.min(weight, 6);
          return {
            from: nodes[a].position,
            to: nodes[b].position,
            fromColor: NEON.clone().multiplyScalar(brightness),
            toColor: NEON.clone().multiplyScalar(brightness),
          };
        }),
        1,
      );

      const adjacency = new Map<number, number[]>();
      edges.forEach(({ a, b }) => {
        adjacency.set(a, [...(adjacency.get(a) ?? []), b]);
        adjacency.set(b, [...(adjacency.get(b) ?? []), a]);
      });
      const maxDegree =
        Math.max(0, ...[...adjacency.values()].map((n) => n.length)) + 1;

      const nodesByCategory = new Map<number, number[]>();
      nodes.forEach((node, i) => {
        nodesByCategory.set(node.category, [
          ...(nodesByCategory.get(node.category) ?? []),
          i,
        ]);
      });
      const maxCategorySize = Math.max(
        ...[...nodesByCategory.values()].map((n) => n.length),
      );
      const glowPointsMax = maxCategorySize + 1;
      const glowSegmentsMax = Math.max(maxDegree, maxCategorySize);

      const glowStrength = { value: 0 };
      const glowColors = new Float32Array(glowPointsMax * 3);
      glowColors.fill(1);
      const glowGeometry = new THREE.BufferGeometry();
      glowGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(glowPointsMax * 3), 3),
      );
      glowGeometry.setAttribute(
        "aColor",
        new THREE.BufferAttribute(glowColors, 3),
      );
      glowGeometry.setAttribute(
        "aSize",
        new THREE.BufferAttribute(new Float32Array(glowPointsMax), 1),
      );
      glowGeometry.setAttribute(
        "aPhase",
        new THREE.BufferAttribute(new Float32Array(glowPointsMax), 1),
      );
      glowGeometry.setDrawRange(0, 0);
      const glowMaterial = starsMaterialWith(glowStrength, 1, pixelRatio);
      group.add(new THREE.Points(glowGeometry, glowMaterial));
      disposables.push(glowGeometry, glowMaterial);

      const glowLinesGeometry = new THREE.BufferGeometry();
      glowLinesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(glowSegmentsMax * 6), 3),
      );
      glowLinesGeometry.setDrawRange(0, 0);
      const glowLinesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      group.add(new THREE.LineSegments(glowLinesGeometry, glowLinesMaterial));
      disposables.push(glowLinesGeometry, glowLinesMaterial);

      const skillToNode = new Map(nodes.map((node, i) => [node.skill, i]));
      const categoryIndexById = new Map(
        skillCategories.map((category, i) => [category.id, i]),
      );
      let glowTarget = 0;

      const glowPositionAttr = glowGeometry.attributes
        .position as THREE.BufferAttribute;
      const glowSizeAttr = glowGeometry.attributes
        .aSize as THREE.BufferAttribute;
      const glowLineAttr = glowLinesGeometry.attributes
        .position as THREE.BufferAttribute;

      const setGlowPoint = (i: number, pos: THREE.Vector3, size: number) => {
        pos.toArray(glowPositionAttr.array, i * 3);
        (glowSizeAttr.array as Float32Array)[i] = size;
      };
      const setGlowLine = (i: number, a: THREE.Vector3, b: THREE.Vector3) => {
        a.toArray(glowLineAttr.array, i * 6);
        b.toArray(glowLineAttr.array, i * 6 + 3);
      };
      const commitGlow = (points: number, segments: number) => {
        glowPositionAttr.needsUpdate = true;
        glowSizeAttr.needsUpdate = true;
        glowLineAttr.needsUpdate = true;
        glowGeometry.setDrawRange(0, points);
        glowLinesGeometry.setDrawRange(0, segments * 2);
        glowTarget = 1;
      };

      const highlightSkill = (skill: string) => {
        const index = skillToNode.get(skill);
        if (index === undefined) return;
        const node = nodes[index];
        setGlowPoint(0, node.position, 18);
        const neighbors = [
          ...(adjacency.get(index) ?? []).map((n) => nodes[n].position),
          hubs[node.category],
        ];
        neighbors.forEach((to, i) => setGlowLine(i, node.position, to));
        commitGlow(1, neighbors.length);
      };

      const highlightCategory = (id: string) => {
        const ci = categoryIndexById.get(id);
        if (ci === undefined) return;
        const members = nodesByCategory.get(ci) ?? [];
        setGlowPoint(0, hubs[ci], 16);
        members.forEach((n, i) => {
          setGlowPoint(i + 1, nodes[n].position, 12);
          setGlowLine(i, hubs[ci], nodes[n].position);
        });
        commitGlow(members.length + 1, members.length);
      };

      const target = targetRef.current;
      const unbindHover =
        target && !reducedMotion
          ? delegateHover(
              target,
              "[data-skill], [data-skill-category]",
              (el) => {
                if (el.dataset.skill) highlightSkill(el.dataset.skill);
                else if (el.dataset.skillCategory)
                  highlightCategory(el.dataset.skillCategory);
              },
              () => {
                glowTarget = 0;
              },
            )
          : undefined;

      return {
        scene,
        camera,
        update: (elapsed) => {
          coreMaterial.uniforms.uTime.value = elapsed;
          haloMaterial.uniforms.uTime.value = elapsed;
          bgMaterial.uniforms.uTime.value = elapsed;
          glowMaterial.uniforms.uTime.value = elapsed;
          spokesMaterial.uniforms.uTime.value = elapsed;
          linksMaterial.uniforms.uTime.value = elapsed;
          group.rotation.y = Math.sin(elapsed * 0.05) * 0.05;
          group.rotation.x = Math.cos(elapsed * 0.04) * 0.03;
          glowStrength.value += (glowTarget - glowStrength.value) * 0.1;
          glowLinesMaterial.opacity = glowStrength.value * 0.4;
        },
        dispose: () => {
          unbindHover?.();
          disposables.forEach((d) => d.dispose());
        },
      };
    },
  );

  return (
    <SceneLayer
      ref={containerRef}
      ready={ready}
      className="z-0 duration-1000 opacity-35"
    />
  );
};

export default SkillConstellation;
