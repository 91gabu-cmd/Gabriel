import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const AnimatedText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = "#FFFFFF",
  fontWeight = 700,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const y = interpolate(translateY, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize,
        color,
        fontWeight,
        fontFamily:
          "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.4,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const TypewriterText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  speed?: number;
}> = ({ text, delay = 0, fontSize = 36, color = "#CBD5E1", speed = 2 }) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(Math.max(0, (frame - delay) / speed));
  const displayText = text.slice(0, chars);

  const cursorOpacity = Math.round(frame / 10) % 2 === 0 ? 1 : 0;

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily:
          "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 400,
        lineHeight: 1.6,
      }}
    >
      {displayText}
      {chars < text.length && (
        <span style={{ opacity: cursorOpacity, color: "#60A5FA" }}>|</span>
      )}
    </div>
  );
};
