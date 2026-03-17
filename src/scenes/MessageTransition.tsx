import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";

export const MessageTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [10, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade
  const exitOpacity = interpolate(frame, [45, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1E3A5F 0%, #0F172A 70%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <ParticleBackground color="#3B82F6" count={15} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            fontSize: 90,
            transform: `scale(${Math.max(0, shieldScale)})`,
          }}
        >
          🔐
        </div>

        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily:
              "'Pretendard', 'Noto Sans KR', sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#93C5FD",
              marginBottom: 12,
            }}
          >
            소중한 회사 정보자산을 지키기 위한
          </div>
          <div style={{ fontSize: 56, color: "#FFFFFF", fontWeight: 800 }}>
            정보보안 5대 수칙
          </div>
        </div>

        {/* 5 dots preview */}
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          {["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"].map(
            (c, i) => {
              const dotScale = spring({
                frame: Math.max(0, frame - 25 - i * 3),
                fps,
                config: { damping: 12, stiffness: 150 },
              });
              return (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: c,
                    transform: `scale(${dotScale})`,
                    boxShadow: `0 0 10px ${c}80`,
                  }}
                />
              );
            }
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
