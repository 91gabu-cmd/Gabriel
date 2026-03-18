import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Opening } from "./scenes/Opening";
import { MessageTransition } from "./scenes/MessageTransition";
import { RuleScene } from "./scenes/RuleScene";
import { Closing } from "./scenes/Closing";
import { LogoOutro } from "./scenes/LogoOutro";

export const SecurityVideo: React.FC = () => {
  // 30fps × 32.3s = 970 frames total (새 Voice.mp3 길이에 맞춤)
  // [0–3s]     Opening:        0–90
  // [3–4.5s]   Transition:     90–135
  // [4.5–8.5s] Rule 1:         135–255
  // [8.5–12.5s] Rule 2:        255–375
  // [12.5–16.5s] Rule 3:       375–495
  // [16.5–20.5s] Rule 4:       495–615
  // [20.5–24.5s] Rule 5:       615–735
  // [24.5–28.5s] Closing:      735–855
  // [28.5–32.3s] Logo Outro:   855–970

  const rules = [
    {
      number: 1,
      icon: "🛡️",
      title: "정품 소프트웨어만 사용하기",
      description: "회사 승인 없이 설치한 프로그램은 즉시 삭제하세요.",
      color: "#3B82F6",
    },
    {
      number: 2,
      icon: "🔄",
      title: "백신 프로그램 최신 업데이트 유지",
      description:
        "백신 업데이트가 되지 않으면 시스템관리팀에 문의하세요.",
      color: "#10B981",
    },
    {
      number: 3,
      icon: "✉️",
      title: "의심스러운 이메일과 링크 클릭 금지",
      description: "출처가 불분명한 메일은 즉시 삭제하세요.",
      color: "#F59E0B",
    },
    {
      number: 4,
      icon: "🚫",
      title: "Torrent·P2P 파일 공유 사이트 사용 금지",
      description: "악성코드 감염 위험이 매우 높습니다.",
      color: "#EF4444",
    },
    {
      number: 5,
      icon: "💾",
      title: "중요 자료는 반드시 백업",
      description:
        "회사 PC Backup 시스템으로 데이터를 보호하세요.",
      color: "#8B5CF6",
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A" }}>
      <Audio src={staticFile("Voice.mp3")} />

      <Sequence from={0} durationInFrames={90}>
        <Opening />
      </Sequence>

      <Sequence from={90} durationInFrames={45}>
        <MessageTransition />
      </Sequence>

      {rules.map((rule, i) => {
        const starts = [135, 255, 375, 495, 615];
        const durations = [120, 120, 120, 120, 120];
        return (
          <Sequence
            key={rule.number}
            from={starts[i]}
            durationInFrames={durations[i]}
          >
            <RuleScene
              number={rule.number}
              icon={rule.icon}
              title={rule.title}
              description={rule.description}
              color={rule.color}
              durationInFrames={durations[i]}
            />
          </Sequence>
        );
      })}

      <Sequence from={735} durationInFrames={120}>
        <Closing />
      </Sequence>

      <Sequence from={855} durationInFrames={115}>
        <LogoOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
