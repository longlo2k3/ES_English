import React from "react";
import { Card } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTheme } from "@/fer-framework/fe-global/themes";

interface IProps {
  backgroundColor: string;
  titleColor: string;
  descColor: string;
  icon: React.ReactNode;
  url?: string;
  onClick?: () => void;
  title: string;
  description: string;
}

const LevelCard = (props: IProps) => {
  const {
    backgroundColor,
    titleColor,
    descColor,
    icon,
    url,
    onClick,
    title,
    description,
  } = props;

  const { mode } = useTheme();

  return (
    <div
      style={{
        padding: 8,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        background: mode === "dark" ? "rgb(49 49 49)" : "#fff",
      }}>
      <Card
        style={{
          background: backgroundColor,
          borderRadius: "12px",
          border: "none",
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
        }}
        onClick={() => {
          if (onClick) onClick();
        }}
        hoverable>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {icon}

          <div>
            <div
              style={{
                fontWeight: 600,
                color: titleColor,
                fontSize: "16px",
                marginBottom: "4px",
              }}>
              {title}
            </div>
            <div style={{ color: descColor, fontSize: "14px" }}>
              {description}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LevelCard;
