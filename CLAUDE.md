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

## 영상 제작 스킬 프로세스

사용자가 음성 파일 또는 텍스트를 제공하면 아래 프로세스를 따른다.

### 입력 분기

- **음성 파일 입력** → TTS 건너뛰고 Step 1부터 시작
- **텍스트 입력** → Step 0(TTS)부터 시작

### Step 0. TTS (텍스트 입력 시에만)

- 로컬 Qwen3-TTS 서버 (Gradio API): `http://127.0.0.1:7860/`
- 텍스트를 음성 파일로 변환
- 생성된 음성 파일을 `public/` 폴더에 저장

### Step 1. STT (음성 → 텍스트 + 타임스탬프)

- OpenAI Whisper API로 음성 파일 처리
- **word-level 타임스탬프** 추출

### Step 2. 의미 단위 그룹핑 + 표현 방식 판단

- word-level 타임스탬프를 의미 단위로 그룹핑 (3~8초 사이)
- 각 구간의 표현 방식을 문맥 기반으로 판단:
  - **텍스트 애니메이션 구간**: 핵심 메시지, 강조 포인트, 숫자/키워드 등
  - **GIF 구간**: 감정, 반응, 비유, 상황 묘사 등

### Step 3. 구간별 소스 확보

- **텍스트 구간** → Remotion 텍스트 애니메이션 컴포넌트 생성
- **GIF 구간** → Klipy API로 **영어 키워드** 검색하여 GIF URL 확보
  - GIF 키워드는 반드시 영어로 추출 (검색 품질 보장)

### Step 4. Remotion 영상 합성

- 텍스트 구간 → 텍스트 애니메이션 컴포넌트 배치
- GIF 구간 → GIF를 타임라인에 배치
- 배경에 원본 음성 파일 깔기
- `npx remotion studio`로 브라우저 미리보기 먼저 띄우기
- 사용자 확인 후 mp4로 렌더링

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
