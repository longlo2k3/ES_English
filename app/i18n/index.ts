import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import vi from "./locales/vn.json";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "vi",
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Thứ tự ưu tiên i18next sẽ tìm ngôn ngữ:
      order: [
        "cookie", // 1. Ưu tiên tìm trong cookie
        "localStorage", // 2. Nếu không có, tìm trong localStorage
        "querystring", // 3. Nếu không có, tìm trong URL (ví dụ: ?lng=vi)
        "navigator", // 4. Cuối cùng, lấy ngôn ngữ của trình duyệt
      ],

      // Tên của cookie
      lookupCookie: "i18next",

      // Nơi detector sẽ TỰ ĐỘNG lưu ngôn ngữ khi thay đổi
      // Khi bạn gọi i18n.changeLanguage(), nó sẽ lưu vào cả 2 nơi này
      caches: ["cookie", "localStorage"],

      // Tùy chọn thêm cho cookie (ví dụ: hết hạn sau 30 ngày)
      cookieOptions: {
        path: "/", // Áp dụng cho toàn bộ domain
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
        sameSite: "strict",
      },
    },
  });

export default i18n;
