import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const ParticleBackground: React.FC<{
  count?: number;
  color?: string;
}> = ({ count = 30, color = "#60A5FA" }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random using index
      const seed = (i * 7919 + 1) % 997;
      result.push({
        x: (seed * 13) % 100,
        y: (seed * 17) % 100,
        size: 2 + (seed % 4),
        speed: 0.2 + (seed % 10) / 20,
        opacity: 0.1 + (seed % 5) / 15,
      });
    }
    return result;
  }, [count]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const yPos = (p.y + frame * p.speed * 0.3) % 110 - 5;
        const xOffset = Math.sin((frame * 0.02 + i) * 0.5) * 20;
        const pulse = interpolate(
          Math.sin(frame * 0.05 + i),
          [-1, 1],
          [0.5, 1]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + xOffset * 0.1}%`,
              top: `${yPos}%`,
              width: p.size * pulse,
              height: p.size * pulse,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: p.opacity * pulse,
              filter: `blur(${p.size > 3 ? 1 : 0}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
