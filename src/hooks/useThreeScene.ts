import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ThreeSceneHandle = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  update?: (elapsed: number) => void;

  onResize?: (width: number, height: number) => void;

  dispose: () => void;
};

export type ThreeSceneContext = {
  renderer: THREE.WebGLRenderer;
  container: HTMLDivElement;
  reducedMotion: boolean;

  invalidate: () => void;
};

export function useThreeScene(
  containerRef: React.RefObject<HTMLDivElement>,
  build: (ctx: ThreeSceneContext) => ThreeSceneHandle,
  onFirstFrame?: () => void,
): boolean {
  const [ready, setReady] = useState(false);
  const buildRef = useRef(build);
  buildRef.current = build;
  const onFirstFrameRef = useRef(onFirstFrame);
  onFirstFrameRef.current = onFirstFrame;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clock = new THREE.Clock();
    let frameId = 0;
    let inView = true;
    let firstFrameRendered = false;

    const renderFrame = () => {
      handle.update?.(clock.getElapsedTime());
      renderer.render(handle.scene, handle.camera);
      if (!firstFrameRendered) {
        firstFrameRendered = true;
        setReady(true);
        onFirstFrameRef.current?.();
      }
    };

    const running = () => inView && !document.hidden && !reducedMotion;

    const animate = () => {
      renderFrame();
      frameId = requestAnimationFrame(animate);
    };

    const syncLoop = () => {
      cancelAnimationFrame(frameId);
      if (running()) frameId = requestAnimationFrame(animate);
    };

    const handle = buildRef.current({
      renderer,
      container,
      reducedMotion,
      invalidate: () => {
        if (!running()) renderFrame();
      },
    });

    const handleVisibilityChange = () => syncLoop();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncLoop();
    });
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      if (handle.onResize) {
        handle.onResize(clientWidth, clientHeight);
      } else if (handle.camera instanceof THREE.PerspectiveCamera) {
        handle.camera.aspect = clientWidth / clientHeight;
        handle.camera.updateProjectionMatrix();
      }
      if (!running()) renderFrame();
    });
    resizeObserver.observe(container);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (reducedMotion) renderFrame();
    syncLoop();

    return () => {
      cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      handle.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [containerRef]);

  return ready;
}
