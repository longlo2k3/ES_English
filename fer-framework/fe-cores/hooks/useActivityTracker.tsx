import { useEffect, useRef } from "react";
import { getToken } from "@/fer-framework/fe-base/uils/getToken";

export const useHeartbeat = ({ intervalMs }: { intervalMs: number }) => {
  const durationRef = useRef(0);
  const token = getToken();

  // Tạo key lưu trữ (giữ nguyên logic)
  const getStorageKey = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return `tracking_time_${today}`;
  };

  // 1. KHÔI PHỤC THỜI GIAN TỪ LOCAL STORAGE (Giữ nguyên logic)
  // Mục đích: Nếu user reload trang giữa chừng khi chưa đến thời gian gửi,
  // ta khôi phục lại số giây lẻ đó để tính tiếp.
  useEffect(() => {
    const key = getStorageKey();
    const savedTime = localStorage.getItem(key);
    if (savedTime) {
      durationRef.current = parseInt(savedTime, 10);
      console.log("Đã khôi phục thời gian chờ gửi:", durationRef.current);
    }
  }, []);

  // 2. BỘ ĐẾM THỜI GIAN (Giữ nguyên logic)
  useEffect(() => {
    const countTimer = setInterval(() => {
      if (document.visibilityState === "visible") {
        durationRef.current += 1;
        localStorage.setItem(getStorageKey(), durationRef.current.toString());
      }
    }, 1000);

    return () => clearInterval(countTimer);
  }, []);

  // 3. GỬI API VÀ RESET (Đã sửa đổi)
  useEffect(() => {
    if (!token) return;

    const sendHeartbeat = async () => {
      // Nếu tab đang ẩn hoặc không có thời gian mới để gửi thì bỏ qua
      if (document.visibilityState === "hidden" || durationRef.current === 0)
        return;

      const dateStr = new Date().toLocaleDateString("en-CA");

      // --- LOGIC QUAN TRỌNG: SNAPSHOT & RESET ---

      // 1. Lấy giá trị tích lũy hiện tại để gửi đi
      const durationToSend = durationRef.current;

      // 2. Reset bộ đếm về 0 ngay lập tức để bắt đầu chu kỳ mới
      durationRef.current = 0;

      // 3. Reset cả LocalStorage để khớp với bộ nhớ
      localStorage.setItem(getStorageKey(), "0");

      // ------------------------------------------

      try {
        await fetch(`${process.env.NEXT_PUBLIC_URL_API_SERVER}/time`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: dateStr,
            duration: durationToSend, // Gửi lượng thời gian của chunk này (ví dụ: 30s)
          }),
        });
        console.log(`Đã gửi ${durationToSend}s và reset bộ đếm.`);
      } catch (error) {
        console.error("Heartbeat failed", error);
        // Lưu ý: Nếu API lỗi, số giây `durationToSend` này sẽ bị mất.
        // Nếu muốn an toàn tuyệt đối, bạn cần logic cộng lại `durationToSend` vào `durationRef` ở đây.
      }
    };

    // Không gọi sendHeartbeat() ngay lập tức nữa, mà chỉ đợi hết interval đầu tiên
    const intervalId = setInterval(sendHeartbeat, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, token]); // Thêm token vào dependency để an toàn
};
