import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { AnimatedText } from "../components/AnimatedText";

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield animation
  const shieldScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const shieldGlow = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.4, 1]
  );

  // Checkmarks appearing one by one
  const checks = [
    { delay: 15, color: "#3B82F6" },
    { delay: 20, color: "#10B981" },
    { delay: 25, color: "#F59E0B" },
    { delay: 30, color: "#EF4444" },
    { delay: 35, color: "#8B5CF6" },
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1E3A5F 0%, #0F172A 70%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticleBackground color="#60A5FA" count={25} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {/* Shield with glow */}
        <div
          style={{
            fontSize: 100,
            transform: `scale(${Math.max(0, shieldScale)})`,
            filter: `drop-shadow(0 0 ${20 * shieldGlow}px #3B82F680)`,
          }}
        >
          🛡️
        </div>

        {/* Checkmarks */}
        <div style={{ display: "flex", gap: 18, marginBottom: 10 }}>
          {checks.map((c, i) => {
            const scale = spring({
              frame: Math.max(0, frame - c.delay),
              fps,
              config: { damping: 10, stiffness: 150 },
            });
            return (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: c.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `scale(${Math.max(0, scale)})`,
                  boxShadow: `0 0 15px ${c.color}60`,
                  fontSize: 20,
                  color: "#FFF",
                }}
              >
                ✓
              </div>
            );
          })}
        </div>

        <AnimatedText
          text="정보보안은 작은 실천에서 시작됩니다."
          fontSize={48}
          fontWeight={800}
          delay={10}
        />

        <AnimatedText
          text="여러분의 실천이 회사의 정보를 지킵니다."
          fontSize={38}
          color="#93C5FD"
          fontWeight={500}
          delay={20}
        />

        {/* Animated line separator */}
        <div
          style={{
            width: interpolate(frame, [30, 60], [0, 500], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #3B82F6, transparent)",
            marginTop: 15,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(frame, [50, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontSize: 24,
            color: "#64748B",
            fontFamily:
              "'Pretendard', 'Noto Sans KR', sans-serif",
            marginTop: 10,
          }}
        >
          Information Security Team
        </div>
      </div>
    </AbsoluteFill>
  );
};
