from faster_whisper import WhisperModel

model = WhisperModel("base")

segments, info = model.transcribe("sample.wav")

for segment in segments:
    print(segment.text)