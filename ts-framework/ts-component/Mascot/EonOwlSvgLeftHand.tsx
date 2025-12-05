import React from "react";
import "./index.scss";

function EonOwlSvgLeftHand() {
  return (
    <div className="mascot-container idle">
      <svg
        className="mascot"
        viewBox="0 0 100 100"
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

          {/* Cánh trái (hạ thấp và nhỏ lại) */}
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
    </div>
  );
}

export default EonOwlSvgLeftHand;
