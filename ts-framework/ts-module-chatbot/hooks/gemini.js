import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyDv3xG_iEMxOFB--BJFymWteGdAhQXHNvI";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function callGeminiAPI(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi gặp lỗi khi kết nối với Gemini!";
  }
}
