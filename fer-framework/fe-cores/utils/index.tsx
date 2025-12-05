export function htmlToText(htmlString: string) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
}

export function extractAndParseJSON(str: string) {
  if (!str) {
    console.warn("⚠️ Không có nội dung text từ Gemini để parse");
    return null;
  }

  try {
    const match = str.match(/\{[\s\S]*\}/);
    if (!match) {
      console.warn("⚠️ Không tìm thấy JSON trong chuỗi:", str);
      return null;
    }

    const jsonString = match[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("❌ Không thể parse JSON:", error, "\nNội dung:", str);
    return null;
  }
}

export function formatDate(value: any) {
  if (!value) return "";

  const date = new Date(value);
  if (isNaN(date.getTime())) return ""; // tránh Invalid time value

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
}
