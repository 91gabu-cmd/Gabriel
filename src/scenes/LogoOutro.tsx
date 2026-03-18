import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

export const LogoOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo fade-in: 0 ~ 1s (shorter outro: 70 frames = 2.3s)
  const logoOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [0, fps], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Full screen fade-out to black: last 1 second
  const fadeOutStart = 40;
  const fadeOutEnd = 70;
  const blackOverlay = interpolate(frame, [fadeOutStart, fadeOutEnd], [0, 1], {
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
      }}
    >
      {/* Logo */}
      <Img
        src={staticFile("SIMMTECH_Log.png")}
        style={{
          maxWidth: 600,
          maxHeight: 300,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      />

      {/* Black fade-out overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000000",
          opacity: blackOverlay,
        }}
      />
    </AbsoluteFill>
  );
};
