import { MenuProps } from "antd";
import { htmlToText } from "../utils";

/**
 * The layout mode
 *
 * - vertical: the vertical menu in left
 * - horizontal: the horizontal menu in top
 * - vertical-mix: two vertical mixed menus in left
 * - horizontal-mix: the vertical menu in left and horizontal menu in top
 */
export type ThemeLayoutMode =
  | "vertical"
  | "horizontal"
  | "vertical-mix"
  | "horizontal-mix";

export const LAYOUT_MODE_VERTICAL: ThemeLayoutMode = "vertical";
export const LAYOUT_MODE_HORIZONTAL: ThemeLayoutMode = "horizontal";
export const LAYOUT_MODE_VERTICAL_MIX: ThemeLayoutMode = "vertical-mix";
export const LAYOUT_MODE_HORIZONTAL_MIX: ThemeLayoutMode = "horizontal-mix";

/** The global header props */
export interface HeaderProps {
  /** Whether to show the logo */
  showLogo?: boolean;
  /** Whether to show the menu toggler */
  showMenuToggler?: boolean;
  /** Whether to show the menu */
  showMenu?: boolean;
}

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  link: string;
  children?: MenuItem[];
}

export const GLOBAL_HEADER_MENU_ID = "__GLOBAL_HEADER_MENU__";

export const GLOBAL_SIDER_MENU_ID = "__GLOBAL_SIDER_MENU__";

export const GLOBAL_PAGE_TAB_ID = "GLOBAL_PAGE_TAB_ID";

export const LOGO_HEIGHT = 32;
export const HEADER_HEIGHT = 64;
export const PAGE_TAB_HEIGHT = 44;
export const SIDER_WIDTH = 280;
export const SIDER_COLLAPSED_WIDTH = 80;

export const promptNoEmpty = (values: any) => {
  return `
Bạn là một hệ thống chấm điểm tiếng Anh tự động.

Với câu hỏi: "${values.content}"
và câu trả lời của học viên: "${htmlToText(values.chosen_option_id)}"

Yêu cầu:
1. Nếu câu hỏi là dạng "điền vào chỗ trống" hoặc "trắc nghiệm":
   - Hãy xác định xem câu trả lời có đúng hay không.
   - Nếu đúng, score = 10.
   - Nếu sai, score = 0.
   - Trả về nhận xét ngắn gọn (comment) giải thích lý do đúng/sai.

2. Nếu câu hỏi là dạng "viết câu" hoặc "viết đoạn văn":
   - Hãy chấm điểm trên thang 10, dựa trên độ chính xác ngữ pháp, từ vựng và ý nghĩa.
   - Viết nhận xét cụ thể, nêu rõ điểm mạnh và điểm cần cải thiện.
   - Nếu có thể, đề xuất cách sửa hoặc câu văn hay hơn.

3. Kết quả phải trả về đúng **định dạng JSON** sau (chỉ JSON, không thêm văn bản khác):

{
  "score": number, // số điểm từ 0 đến 10
  "comment": string, // nhận xét ngắn gọn
  "isCorrect": boolean // true nếu đúng hoàn toàn, false nếu sai hoặc chỉ đúng một phần
}
`;
};

export const promptEmpty = (questionText: any) => {
  return `
Bạn là hệ thống điền vào chỗ trống tiếng Anh.

Với câu hỏi: "${questionText}"

Hãy xác định từ đúng cần điền vào chỗ trống dựa trên gợi ý trong ngoặc (nếu có). 
Chỉ điền đúng một từ hoặc cụm từ cần thiết để hoàn thành câu đúng ngữ pháp và hợp nghĩa.

Trả về kết quả duy nhất dưới dạng JSON theo đúng cấu trúc sau (không thêm bất kỳ văn bản nào khác ngoài JSON):

{
  "answer": "..."
}
`;
};

export const promptSpeaking = (values: any) => {
  return `Bạn là một giám khảo tiếng Anh chuyên nghiệp. 
Nhiệm vụ của bạn là đánh giá phần trả lời của thí sinh cho một câu hỏi Speaking.

Tôi sẽ cung cấp:
- Chủ đề (topic)
- Phần trả lời của thí sinh (đã được chuyển từ giọng nói sang văn bản)

Bạn cần:
1. Đánh giá độ chính xác và mức độ phù hợp của câu trả lời so với chủ đề.
2. Chấm điểm tổng quát từ 0 đến 10 (score).
3. Nhận xét ngắn gọn (comment) giải thích lý do đúng/sai bằng tiếng việt.
4. Xác định xem câu trả lời có đúng hoàn toàn với chủ đề không (isCorrect):
   - true nếu câu trả lời đúng và phù hợp chủ đề.
   - false nếu sai, không liên quan hoặc chỉ đúng một phần.

⚠️ Quan trọng:
- **Chỉ trả về JSON**, không thêm bất kỳ văn bản nào khác.
- JSON phải đúng **định dạng sau**:

{
  "score": number, 
  "comment": string, 
  "isCorrect": boolean
}

Dữ liệu đầu vào:
Chủ đề: ${values.content}
Phần trả lời: "${values.chosen_option_id}"
`;
};
