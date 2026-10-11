import { useEffect, useRef } from "react";
import * as THREE from "three";

// Lightweight three.js scene: a small floating stack of glowing cards.
// Used as a decorative element behind the home hero. Honors reduced motion.
export function StackScene() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    function resize() {
      if (!canvas) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    const stack = new THREE.Group();
    const tones = [
      new THREE.Color("oklch(0.78 0.18 295)"),
      new THREE.Color("oklch(0.72 0.18 230)"),
      new THREE.Color("oklch(0.78 0.16 80)"),
    ];
    for (let i = 0; i < 3; i++) {
      const g = new THREE.PlaneGeometry(1.7, 1);
      const m = new THREE.MeshBasicMaterial({ color: tones[i], transparent: true, opacity: 0.18 - i * 0.04, side: THREE.DoubleSide });
      const card = new THREE.Mesh(g, m);
      card.position.z = -i * 0.04;
      card.position.x = (i - 1) * 0.08;
      card.rotation.x = -0.2;
      card.rotation.y = 0.18;
      stack.add(card);
    }
    scene.add(stack);

    let raf = 0;
    function tick() {
      stack.rotation.y += 0.003;
      stack.position.y = Math.sin(performance.now() * 0.0006) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);

  return <canvas ref={ref} className="stack-scene" aria-hidden />;
}
