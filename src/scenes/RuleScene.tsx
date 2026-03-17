import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { GlowingBorder } from "../components/GlowingBorder";

export const RuleScene: React.FC<{
  number: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  durationInFrames: number;
}> = ({ number, icon, title, description, color, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animations
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const numberScale = spring({
    frame: frame - 3,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const contentOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentY = interpolate(frame, [8, 22], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descY = interpolate(frame, [20, 35], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Progress bar for this rule
  const progressWidth = interpolate(
    frame,
    [0, durationInFrames - 15],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle background grid animation
  const gridOffset = frame * 0.5;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 50%, ${color}15 0%, #0F172A 70%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <ParticleBackground color={color} count={15} />

      {/* Background grid */}
      <AbsoluteFill
        style={{
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: `${gridOffset}px ${gridOffset}px`,
        }}
      />

      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "50%",
          transform: `translateY(-50%) scale(${Math.max(0, numberScale)})`,
          fontSize: 400,
          fontWeight: 900,
          color: `${color}08`,
          fontFamily: "monospace",
          lineHeight: 1,
        }}
      >
        {number}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          padding: "0 160px",
          textAlign: "center",
          transform: `translateX(${interpolate(enterProgress, [0, 1], [-100, 0])}px)`,
        }}
      >
        {/* Number badge + icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "monospace",
              transform: `scale(${Math.max(0, numberScale)})`,
              boxShadow: `0 0 30px ${color}60`,
            }}
          >
            {number}
          </div>
          <div
            style={{
              fontSize: 60,
              transform: `scale(${Math.max(0, numberScale)})`,
            }}
          >
            {icon}
          </div>
        </div>

        <GlowingBorder color={color}>
          <div
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentY}px)`,
            }}
          >
            <div
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily:
                  "'Pretendard', 'Noto Sans KR', sans-serif",
                marginBottom: 20,
              }}
            >
              {title}
            </div>
            <div
              style={{
                opacity: descOpacity,
                transform: `translateY(${descY}px)`,
                fontSize: 32,
                color: "#CBD5E1",
                fontFamily:
                  "'Pretendard', 'Noto Sans KR', sans-serif",
                fontWeight: 400,
              }}
            >
              {description}
            </div>
          </div>
        </GlowingBorder>

        {/* Step indicators */}
        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              style={{
                width: n === number ? 40 : 12,
                height: 12,
                borderRadius: 6,
                backgroundColor:
                  n === number ? color : n < number ? `${color}80` : "#334155",
                transition: "all 0.3s",
                boxShadow:
                  n === number ? `0 0 10px ${color}80` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "#1E293B",
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}40, ${color})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
