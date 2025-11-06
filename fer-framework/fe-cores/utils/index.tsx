import { getToken } from "@/fer-framework/fe-base/uils/getToken";
import { useState, useEffect } from "react";

export const useFetchContentDetail = (questionId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = getToken();

  useEffect(() => {
    if (!questionId || !token) {
      setData(null);
      setLoading(false);
      return; // Không làm gì cả
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/admin/content/${questionId}/detail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Mã lỗi: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Lỗi khi gọi API:", err);
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [questionId]);

  return { data, loading, error };
};

export function htmlToText(htmlString: string) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}

export function extractAndParseJSON(str: string) {
  try {
    // Tìm phần trong dấu ngoặc nhọn ngoài cùng
    const match = str.match(/\{[\s\S]*\}/);
    if (!match) return null; // Không có JSON

    const jsonString = match[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Không thể parse JSON:", error);
    return null;
  }
}
