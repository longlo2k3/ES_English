// hooks/useGemini.ts
import { useState, useCallback } from "react";
import { callGemini } from "./callGeminiAI";
// Đảm bảo đường dẫn import chính xác tới file chứa hàm callGemini

interface GeminiData {
  score: number;
  comment: string;
  isCorrect: boolean;
}

interface UseGeminiState {
  data: GeminiData;
  isLoading: boolean;
  error: Error | null;
}

export const useHookGemini = () => {
  const [data, setData] = useState<GeminiData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const callGeminiApi = useCallback(
    async (promptText: string, audioFile?: string) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await callGemini(promptText, audioFile);

        setData(response);
        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Đã xảy ra lỗi không xác định")
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { callGeminiApi, data, isLoading, error };
};
