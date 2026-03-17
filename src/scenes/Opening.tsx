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

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Warning icon animation
  const iconScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const iconRotate = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [-5, 5]
  );

  // Red alert pulse
  const alertPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.1, 0.25]
  );

  // Scan line effect
  const scanLineY = (frame * 4) % 1080;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #1E293B 0%, #0F172A 70%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticleBackground color="#EF4444" count={20} />

      {/* Red vignette alert */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(239,68,68,${alertPulse}) 100%)`,
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          top: scanLineY,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          padding: "0 120px",
          textAlign: "center",
        }}
      >
        {/* Warning icon */}
        <div
          style={{
            fontSize: 80,
            transform: `scale(${iconScale}) rotate(${iconRotate}deg)`,
          }}
        >
          ⚠️
        </div>

        <AnimatedText
          text="악성코드와 바이러스 변종으로 인해"
          fontSize={42}
          color="#F87171"
          delay={10}
        />
        <AnimatedText
          text="기업 정보 유출과 데이터 삭제 위험이 증가하고 있습니다."
          fontSize={46}
          fontWeight={800}
          color="#FFFFFF"
          delay={20}
        />

        {/* Animated underline */}
        <div
          style={{
            width: interpolate(frame, [25, 50], [0, 600], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #EF4444, transparent)",
            marginTop: 10,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
