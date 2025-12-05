export function evaluateSpeech(reference: any, spoken: any, durationSec: any) {
  const refWords = reference.toLowerCase().split(" ");
  const spokenWords = spoken.toLowerCase().split(" ");

  // 1️⃣ Pronunciation: dựa vào mức độ khớp từ
  const matched = spokenWords.filter((w: any) => refWords.includes(w)).length;
  const pronunciationScore = (matched / refWords.length) * 10;

  // 2️⃣ Fluency: dựa vào tốc độ nói (số từ / giây)
  const wordsPerSec = spokenWords.length / durationSec;
  let fluencyScore = 0;
  if (wordsPerSec >= 1.5 && wordsPerSec <= 3) fluencyScore = 10;
  else if (wordsPerSec > 3) fluencyScore = 8;
  else fluencyScore = wordsPerSec * 4; // < 1.5 thì thấp

  // 3️⃣ Tổng hợp
  // const finalScore = (pronunciationScore * 0.6 + fluencyScore * 0.4).toFixed(1);

  return {
    pronunciation: pronunciationScore.toFixed(1),
    fluency: fluencyScore.toFixed(1),
    // total: finalScore,
  };
}

export function startSpeakingRecognition(referenceText: string) {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const startTime = performance.now();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const endTime = performance.now();
    const duration = (endTime - startTime) / 1000;

    console.log("Speech result:", transcript);
    const score = evaluateSpeech(referenceText, transcript, duration);
  };

  recognition.start();
}
