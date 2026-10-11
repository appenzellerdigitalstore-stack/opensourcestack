// Real React Three Fiber hero scene. Two stacks of rounded boxes that rotate
// with pointer position, plus three torus rings drifting in the background.
// Honors `prefers-reduced-motion`. Token-based colors (oklch tokens in CSS
// are resolved to sRGB before passing to WebGL since WebGL does not parse
// oklch strings natively).
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function Stack({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const [colors, setColors] = useState<{ primary: string; soft: string; border: string }>({ primary: "", soft: "", border: "" });

  useEffect(() => {
    const resolve = (name: string) => {
      const el = document.createElement("span");
      el.style.color = `var(${name})`;
      document.body.appendChild(el);
      const value = getComputedStyle(el).color;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = value;
        context.fillRect(0, 0, 1, 1);
        const pixel = context.getImageData(0, 0, 1, 1).data;
        el.remove();
        return pixel ? `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` : value;
      }
      el.remove();
      return value;
    };
    setColors({
      primary: resolve("--primary"),
      soft: resolve("--violet-soft"),
      border: resolve("--border"),
    });
  }, []);

  useFrame(({ pointer, clock }, rawDelta) => {
    if (!group.current || reduced) return;
    const dt = Math.min(rawDelta, 0.05);
    group.current.rotation.y += (pointer.x * 0.035 - group.current.rotation.y) * (1 - Math.exp(-2 * dt));
    group.current.rotation.z += (pointer.y * 0.015 - group.current.rotation.z) * (1 - Math.exp(-2 * dt));
    group.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.07;
  });

  if (!colors.primary) return null;
  return <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[4, 5, 6]} intensity={3} color={colors.soft} />
    <Environment resolution={64}>
      <Lightformer position={[0, 5, 0]} intensity={3} scale={[10, 10, 1]} />
      <Lightformer position={[-5, 0, 3]} intensity={3} color={colors.soft} scale={[5, 10, 1]} />
    </Environment>
    <group ref={group}>
      {[-1, 1].map(side => <group key={side} position={[side * 7.4, -0.4, -3]} rotation={[0.6, side * 0.45, side * 0.22]}>
        {[0, 1, 2, 3].map(i => <RoundedBox key={i} args={[1.9, 0.16, 1.9]} radius={0.06} smoothness={2} position={[0, i * 0.42, 0]}>
          <meshStandardMaterial color={i === 3 ? colors.soft : colors.primary} metalness={0.7} roughness={0.25} wireframe={i === 0} transparent opacity={i === 0 ? 0.5 : 0.75} />
        </RoundedBox>)}
      </group>)}
      <group rotation={[0.4, 0.3, -0.22]} position={[0, 0, -9]}>
        {[0, 1, 2].map(i => <mesh key={i} position={[0, i * 0.5 - 0.5, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[3.3 + i * 0.2, 0.006, 4, 96]} />
          <meshBasicMaterial color={colors.border} transparent opacity={0.6} />
        </mesh>)}
      </group>
    </group>
  </>;
}

export function StackScene() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return <Canvas dpr={1} camera={{ position: [0, 0, 9], fov: 42 }} gl={{ alpha: true, antialias: true }}><Stack reduced={reduced} /></Canvas>;
}
