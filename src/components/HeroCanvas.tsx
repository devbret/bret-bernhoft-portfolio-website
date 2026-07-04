import { useRef } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/hooks/useThreeScene";
import { CYBER } from "@/lib/palette";
import SceneLayer from "./SceneLayer";

const GRID_HALF_WIDTH = 80;
const GRID_DEPTH = 80;
const CELL_SIZE = 2;
const SCROLL_SPEED = 1.5;

const GRID_NEAR_Z = 6;

type HeroCanvasProps = {
  onReady?: () => void;
};

const HeroCanvas = ({ onReady }: HeroCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const ready = useThreeScene(
    containerRef,
    ({ container, reducedMotion }) => {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(CYBER.black, 5, 60);

      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        120,
      );
      camera.position.set(0, 1.8, 8);
      camera.lookAt(0, 0.4, -30);

      const depthPoints: number[] = [];
      for (let x = -GRID_HALF_WIDTH; x <= GRID_HALF_WIDTH; x += CELL_SIZE) {
        depthPoints.push(x, 0, GRID_NEAR_Z, x, 0, -GRID_DEPTH);
      }
      const depthGeometry = new THREE.BufferGeometry();
      depthGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(depthPoints, 3),
      );
      const depthMaterial = new THREE.LineBasicMaterial({
        color: CYBER.purple,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      scene.add(new THREE.LineSegments(depthGeometry, depthMaterial));

      const crossPoints: number[] = [];
      for (let z = -GRID_DEPTH; z <= GRID_NEAR_Z - CELL_SIZE; z += CELL_SIZE) {
        crossPoints.push(-GRID_HALF_WIDTH, 0, z, GRID_HALF_WIDTH, 0, z);
      }
      const crossGeometry = new THREE.BufferGeometry();
      crossGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(crossPoints, 3),
      );
      const crossMaterial = new THREE.LineBasicMaterial({
        color: CYBER.neon,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const crossLines = new THREE.LineSegments(crossGeometry, crossMaterial);
      scene.add(crossLines);

      const pointer = { x: 0, y: 0 };
      const handlePointerMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      if (!reducedMotion) {
        window.addEventListener("pointermove", handlePointerMove);
      }

      return {
        scene,
        camera,
        update: (elapsed) => {
          crossLines.position.z = (elapsed * SCROLL_SPEED) % CELL_SIZE;
          camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
          camera.position.y +=
            (1.8 - pointer.y * 0.3 - camera.position.y) * 0.03;
          camera.lookAt(0, 0.4, -30);
        },
        dispose: () => {
          window.removeEventListener("pointermove", handlePointerMove);
          depthGeometry.dispose();
          depthMaterial.dispose();
          crossGeometry.dispose();
          crossMaterial.dispose();
        },
      };
    },
    () => onReadyRef.current?.(),
  );

  return (
    <SceneLayer
      ref={containerRef}
      ready={ready}
      className="z-0 duration-1000"
    />
  );
};

export default HeroCanvas;
