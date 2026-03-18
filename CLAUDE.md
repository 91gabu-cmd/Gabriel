# Project Guidelines for Claude

## Video Creation

- **Framework**: Remotion (React 기반 영상 제작)
- 영상 제작 요청 시 반드시 Remotion을 사용할 것
- 정적 에셋(이미지, 폰트 등)은 `public/` 폴더에 배치하고 `staticFile()`로 참조
- 이미지는 반드시 Remotion의 `<Img>` 컴포넌트 사용 (HTML `<img>` 사용 금지)
- 애니메이션은 `useCurrentFrame()` + `interpolate()` / `spring()` 기반으로 구현
- CSS 애니메이션, Tailwind 애니메이션 클래스 사용 금지
- 렌더링 명령어:
  ```bash
  npx remotion render src/index.ts SecurityGuidelines out/video.mp4 \
    --browser-executable=/root/.cache/ms-playwright/chromium_headless_shell-1194/chrome-linux/headless_shell
  ```

## Skills & Services

| Skill / Service | 용도 | 비고 |
|---|---|---|
| remotion-best-practices | Remotion 영상 제작 베스트 프랙티스 | 활성화됨 |

## Project Structure

```
Gabriel/
├── src/
│   ├── Root.tsx                  # Composition 등록
│   ├── SecurityVideo.tsx         # 메인 영상 타임라인
│   ├── components/               # 재사용 컴포넌트
│   └── scenes/                   # 개별 씬
├── public/                       # 정적 에셋 (이미지, 폰트 등)
├── out/                          # 렌더링 결과물
└── CLAUDE.md                     # 이 파일
```

## Notes

- 한국어 콘텐츠 프로젝트 (폰트: Pretendard, Noto Sans KR)
- 해상도: 1920x1080 / 30fps
