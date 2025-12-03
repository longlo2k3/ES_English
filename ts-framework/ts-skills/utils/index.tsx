import { getToken } from "@/fer-framework/fe-base/uils/getToken";
import { useEffect, useState } from "react";

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
          `${process.env.NEXT_PUBLIC_URL_API_SERVER}/admin/content/${questionId}/detail`,
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
