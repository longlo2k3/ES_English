import { extractAndParseJSON } from "@/fer-framework/fe-cores/utils";

export async function callGemini(promptText: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const parsed = extractAndParseJSON(text);

    return (
      parsed || {
        score: 0,
        comment: "Không thể phân tích phản hồi từ AI.",
        isCorrect: false,
      }
    );
  } catch (error) {
    console.error("Lỗi khi gọi Gemini:", error);
    return {
      score: 0,
      comment: "Lỗi khi gọi Gemini API.",
      isCorrect: false,
    };
  }
}

export async function callGeminiToText(promptText: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return text;
  } catch (error) {
    console.error("Lỗi khi gọi Gemini:", error);
    return;
  }
}
