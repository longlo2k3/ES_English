import { extractAndParseJSON } from "@/fer-framework/fe-cores/utils";

export async function callGemini(promptText: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return extractAndParseJSON(data.candidates?.[0]?.content?.parts?.[0]?.text);
}
