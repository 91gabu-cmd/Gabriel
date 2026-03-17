import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const GlowingBorder: React.FC<{
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ color = "#3B82F6", children, style = {} }) => {
  const frame = useCurrentFrame();
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: 20,
        padding: "40px 50px",
        boxShadow: `0 0 ${30 * glowIntensity}px ${color}40, inset 0 0 ${20 * glowIntensity}px ${color}10`,
        backdropFilter: "blur(10px)",
        backgroundColor: `${color}08`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
