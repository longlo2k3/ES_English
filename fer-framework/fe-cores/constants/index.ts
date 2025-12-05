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

Yêu cầu chấm điểm:

1. Nếu câu hỏi là dạng "điền vào chỗ trống" hoặc "trắc nghiệm":
   - Xác định xem câu trả lời của học viên có chính xác hay không.
   - Nếu đúng, score = 10.
   - Nếu sai, score = 0.
   - Trả về nhận xét ngắn gọn (comment) giải thích lý do đúng/sai.

2. Nếu câu hỏi là dạng "viết câu" hoặc "viết đoạn văn":
   - Chấm điểm trên thang 10, dựa trên độ chính xác ngữ pháp, từ vựng và ý nghĩa.
   - Viết nhận xét chi tiết, nêu rõ:
     - Điểm mạnh của câu trả lời
     - Điểm cần cải thiện
   - Nếu có thể, đề xuất cách sửa hoặc câu văn hay hơn.

3. **Định dạng trả về bắt buộc phải là JSON** (chỉ JSON, không thêm bất kỳ văn bản nào khác).  
4. **Trường "comment" phải được trả về dưới dạng HTML** với cấu trúc rõ ràng:
   - Tiêu đề: <h4>Nhận xét</h4>
   - Các ý chính: <ul><li>...</li></ul>
   - Mô tả chi tiết: <p>...</p>

Ví dụ định dạng JSON:

{
  "score": number, // số điểm từ 0 đến 10
  "comment": "<h4>Nhận xét</h4><ul><li>Điểm mạnh</li><li>Điểm cần cải thiện</li></ul><p>Gợi ý cách cải thiện hoặc câu trả lời hay hơn.</p>",
  "isCorrect": boolean // true nếu đúng hoàn toàn, false nếu sai hoặc chỉ đúng một phần
}
`;
};

export const promptEmpty = (questionText: any) => {
  return `
Bạn là hệ thống điền vào chỗ trống tiếng Anh.

Với câu hỏi: "${questionText}"

Yêu cầu:
1. Xác định từ hoặc cụm từ đúng cần điền vào chỗ trống, dựa trên gợi ý trong ngoặc (nếu có).  
2. Chỉ điền đúng một từ hoặc cụm từ cần thiết để hoàn thành câu đúng ngữ pháp và hợp nghĩa.  
3. **Trường "answer" phải được trả về dưới dạng HTML** với cấu trúc rõ ràng:
   - Tiêu đề: <h4>Nhận xét</h4>
   - Các ý chính: <ul><li>...</li></ul>
   - Mô tả chi tiết: <p>...</p>
4. Trả về kết quả **duy nhất dưới dạng JSON** theo đúng cấu trúc sau, không thêm bất kỳ văn bản nào khác ngoài JSON:

{
  "answer": "<h4>Nhận xét</h4><ul><li>Đúng từ/cụm từ cần điền: ...</li><li>Lý do chọn đáp án này: ...</li></ul><p>Gợi ý hoặc cách diễn đạt khác nếu có.</p>"
}
`;
};

export const promptSpeaking = (values: any) => {
  return `
Bạn là một giám khảo tiếng Anh chuyên nghiệp. Nhiệm vụ của bạn là đánh giá phần trả lời Speaking của thí sinh.

Dữ liệu đầu vào:
- Chủ đề: "${values.content}"
- Phần trả lời của thí sinh: "${values.chosen_option_id}"
- Điểm số hiện có:
  {
    pronunciation: ${values?.result?.pronunciation},
    fluency: ${values?.result?.fluency}
  }

Hướng dẫn chấm điểm:

1. Đánh giá câu trả lời của thí sinh dựa trên mức độ:
   - Phù hợp chủ đề
   - Độ chính xác, ngữ pháp, từ vựng
   - Mức độ trôi chảy và phát âm
2. Chấm điểm tổng quát từ 0 đến 10 (score).
3. Viết nhận xét (comment) bằng **tiếng Việt**, **trả về dưới dạng HTML** với cấu trúc:
   - Tiêu đề: <h4>Nhận xét</h4>
   - Các ý chính: <ul><li>...</li></ul>
   - Mô tả chi tiết: <p>...</p>
4. Xác định "isCorrect":
   - true nếu câu trả lời đúng và hoàn toàn phù hợp chủ đề
   - false nếu câu trả lời sai, không liên quan hoặc chỉ đúng một phần
5. Phân tích chi tiết theo các tiêu chí:
   - Pronunciation (Phát âm): /10
   - Fluency & Coherence (Độ trôi chảy & Mạch lạc): /10
   - Lexical Resource (Từ vựng): /10
   - Grammatical Range & Accuracy (Ngữ pháp): /10
   - Overall (Tổng quan): /10

⚠️ Lưu ý quan trọng:
- **Chỉ trả về JSON**, không thêm bất kỳ văn bản nào khác.
- JSON phải đúng định dạng:

{
  "score": number,
  "comment": "<h4>Nhận xét</h4><ul><li>Điểm mạnh</li><li>Điểm cần cải thiện</li></ul><p>Gợi ý hoặc nhận xét chi tiết.</p>",
  "isCorrect": boolean
}

- Nếu phần trả lời là trống, trả về comment HTML:
"<h4>Nhận xét</h4><p>Chưa có câu trả lời từ thí sinh.</p>"
`;
};

export const illustrationPrompt = (item: any) => {
  return `
Bạn hãy đóng vai một chuyên gia phân tích học tập.

Dữ liệu tiến độ học tập của người dùng được truyền dưới dạng JSON như sau:

${JSON.stringify(item, null, 2)}

Dựa vào dữ liệu này, hãy phân tích và trả về nội dung theo đúng cấu trúc:

1. **Điểm mạnh – Điểm yếu**
2. **Gợi ý học tập cá nhân hoá trong 7 ngày tới**
3. **KPI đề xuất nên theo dõi**
4. **Kết luận ngắn gọn (3–4 câu)** về điều người dùng nên ưu tiên nhất

❗Yêu cầu quan trọng:
- Không được viết lại JSON.
- Không viết dài dòng. Ưu tiên bullet points, ngắn gọn, dễ đọc.
- Văn phong thân thiện, khích lệ.
- Trả lời bằng tiếng Việt.
- Không dùng markdown tiêu đề quá lớn.
- Chỉ trả về phần nội dung gợi ý, không cần mở đầu hay giới thiệu.

Bắt đầu phân tích dựa trên JSON trên và Trả về nội dung dưới dạng HTML có cấu trúc rõ ràng:
- <h4>
- <ul><li>
- <p>

Không dùng markdown. Không bọc trong <html> hay <body>.
Chỉ trả về thẻ HTML hiển thị nội dung.

`;
};
