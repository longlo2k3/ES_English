// NỘI DUNG TỆP: Mascot.jsx
import React, { useState, useEffect } from "react";
import "./index.scss";

// Tách SVG ra thành một component riêng cho sạch sẽ
export const EonOwlSvg = ({ width = 100, height = 100 }) => (
  <svg
    className="mascot"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg">
    <g id="eon-owl">
      {/* Thân */}
      <path
        d="M50 10 C 25 10, 10 40, 10 65 C 10 90, 25 90, 50 90 C 75 90, 90 90, 90 65 C 90 40, 75 10, 50 10 Z"
        fill="#9D81B6"
      />
      {/* Bụng */}
      <path
        d="M50 40 C 35 40, 25 50, 25 65 C 25 80, 40 85, 50 85 C 60 85, 75 80, 75 65 C 75 50, 65 40, 50 40 Z"
        fill="#EADCFB"
      />

      {/* Cánh trái */}
      <path
        id="wing-left"
        d="M25 50 C 10 55, 5 70, 15 80 Q 25 70, 25 50 Z"
        fill="#8665A1"
      />
      {/* Cánh phải */}
      <path
        id="wing-right"
        d="M75 50 C 90 55, 95 70, 85 80 Q 75 70, 75 50 Z"
        fill="#8665A1"
      />

      {/* Mắt (Chứa tất cả các trạng thái) */}
      <g id="eyes">
        <g id="eye-normal">
          <circle id="eye-left" cx="35" cy="35" r="10" fill="#FFF" />
          <circle cx="37" cy="37" r="3" fill="#333" />
          <circle id="eye-right" cx="65" cy="35" r="10" fill="#FFF" />
          <circle cx="67" cy="37" r="3" fill="#333" />
        </g>
        <g id="eye-happy">
          <path
            d="M30 33 Q 35 40 40 33"
            stroke="#333"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />
          <path
            d="M60 33 Q 65 40 70 33"
            stroke="#333"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />
        </g>
        <g id="eye-confused">
          <circle cx="35" cy="35" r="7" fill="#FFF" />
          <circle cx="36" cy="36" r="2" fill="#333" />
          <circle cx="65" cy="35" r="10" fill="#FFF" />
          <circle cx="67" cy="37" r="3" fill="#333" />
        </g>
      </g>

      {/* Mỏ */}
      <path d="M45 45 C 47 50, 53 50, 55 45 L 50 52 Z" fill="#F39C12" />
    </g>
  </svg>
);

/**
 * Component Linh vật Động
 * @param {string} triggerState - Trạng thái được kích hoạt: 'idle', 'correct', 'incorrect', 'speaking'
 * @param {string} message - Thông điệp muốn hiển thị
 */
const Mascot = ({ triggerState = "idle", message = "" }) => {
  // State nội bộ của component
  const [currentState, setCurrentState] = useState("idle");
  const [currentMessage, setCurrentMessage] = useState("");

  // Sử dụng useEffect để xử lý các thay đổi từ props (triggerState, message)
  useEffect(() => {
    // Cập nhật trạng thái và thông điệp ngay lập tức
    setCurrentState(triggerState);
    setCurrentMessage(message);

    let stateTimer = null;
    let messageTimer = null;

    // Nếu là trạng thái 'correct' hoặc 'incorrect' (trạng thái tạm thời)
    if (triggerState === "correct") {
      // Đặt hẹn giờ để quay lại trạng thái 'idle' sau khi animation kết thúc
      stateTimer = setTimeout(() => {
        // Nếu vẫn còn message, thì chuyển sang 'speaking'
        // Nếu không, quay về 'idle'
        setCurrentState(message ? "speaking" : "idle");
        setCurrentMessage(message || "Tuyệt vời quá!");
      }, 200); // 1.5 giây (thời gian animation)
    }

    if (triggerState === "incorrect") {
      // Đặt hẹn giờ để quay lại trạng thái 'idle' sau khi animation kết thúc
      stateTimer = setTimeout(() => {
        // Nếu vẫn còn message, thì chuyển sang 'speaking'
        // Nếu không, quay về 'idle'
        setCurrentState(message ? "speaking" : "idle");
        setCurrentMessage(message || "Tiếc quá! hẹ hẹ");
      }, 200); // 1.5 giây (thời gian animation)
    }

    // Nếu là trạng thái 'speaking' (và không phải 'correct'/'incorrect')
    if (triggerState === "speaking") {
      // Đặt hẹn giờ để tự động ẩn tin nhắn
      messageTimer = setTimeout(() => {
        setCurrentState("idle");
        setCurrentMessage(message || "Cùng nhau làm \n bài nào!");
      }, 0); // 5 giây
    }

    // Nếu là 'idle', đảm bảo không có tin nhắn
    if (triggerState === "idle") {
      setCurrentMessage("");
      setCurrentMessage(message);
    }

    // Hàm dọn dẹp (cleanup)
    return () => {
      if (stateTimer) clearTimeout(stateTimer);
      if (messageTimer) clearTimeout(messageTimer);
    };
  }, [triggerState, message]); // Chạy lại effect khi props thay đổi

  // Tính toán class cho container
  const hasMessage = currentMessage && currentMessage.length > 0;
  const containerClasses = [
    "mascot-container",
    currentState,
    hasMessage ? "speaking" : "",
  ]
    .join(" ")
    .trim(); // Nối các class lại, ví dụ: "mascot-container correct speaking"

  return (
    <div className={containerClasses}>
      <div style={{ whiteSpace: "pre-line" }} className="speech-bubble">
        {currentMessage}
      </div>
      <EonOwlSvg />
    </div>
  );
};

export default Mascot;
