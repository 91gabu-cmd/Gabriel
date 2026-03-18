"""
로컬 PC에서 실행하세요:

1. pip install openai
2. export OPENAI_API_KEY="sk-proj-DPO76t..."
3. python scripts/whisper_stt.py

결과가 stt_result.json으로 저장됩니다.
"""
import openai
import json
import os

client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

with open("public/Voice.mp3", "rb") as audio_file:
    result = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        language="ko",
        response_format="verbose_json",
        timestamp_granularities=["word", "segment"]
    )

data = result.model_dump()
with open("stt_result.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("=== Full Text ===")
print(data["text"])
print(f"\n=== {len(data.get('segments', []))} segments, {len(data.get('words', []))} words ===")
print("Saved to stt_result.json")
