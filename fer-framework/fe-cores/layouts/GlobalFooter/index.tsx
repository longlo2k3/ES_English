import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  BookOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Link, Text } = Typography;

const responsiveColProps = {
  xs: 24,
  sm: 12,
  md: 6,
};

const footerStyle = {
  background: "#001529",
  color: "rgba(255, 255, 255, 0.65)",
  padding: "40px 50px",
};

const titleStyle = {
  color: "#fff",
  marginBottom: "16px",
};

const linkStyle = {
  color: "rgba(255, 255, 255, 0.85)", // Màu link sáng hơn text
  display: "block",
  marginBottom: "8px",
};

const iconStyle = {
  fontSize: "24px",
  color: "rgba(255, 255, 255, 0.85)",
};

const copyrightStyle = {
  textAlign: "center",
  color: "rgba(255, 255, 255, 0.45)",
  paddingTop: "24px",
};

const GlobalFooter = () => {
  return (
    <Footer style={footerStyle}>
      <Row gutter={[16, 24]}>
        {/* CỘT 1: THƯƠNG HIỆU & MẠNG XÃ HỘI */}
        <Col {...responsiveColProps}>
          <Space direction="vertical" size="middle">
            <Title level={3} style={{ ...titleStyle, margin: 0 }}>
              <BookOutlined /> ES English
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.65)" }}>
              Nền tảng học tiếng Anh toàn diện cho mọi cấp độ.
            </Text>
            <Space size="large">
              <Link
                href="https://facebook.com"
                target="_blank"
                style={linkStyle}>
                <FacebookOutlined style={iconStyle} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                style={linkStyle}>
                <YoutubeOutlined style={iconStyle} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                style={linkStyle}>
                <TwitterOutlined style={iconStyle} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                style={linkStyle}>
                <LinkedinOutlined style={iconStyle} />
              </Link>
            </Space>
          </Space>
        </Col>

        {/* CỘT 2: HỌC TẬP */}
        <Col {...responsiveColProps}>
          <Title level={5} style={titleStyle}>
            Học tập
          </Title>
          <Link href="/courses" style={linkStyle}>
            Các khóa học
          </Link>
          <Link href="/topics" style={linkStyle}>
            Chủ đề từ vựng
          </Link>
          <Link href="/grammar" style={linkStyle}>
            Ngữ pháp
          </Link>
          <Link href="/test-prep" style={linkStyle}>
            Luyện thi (IELTS, TOEIC)
          </Link>
        </Col>

        {/* CỘT 3: VỀ ES ENGLISH */}
        <Col {...responsiveColProps}>
          <Title level={5} style={titleStyle}>
            Về ES English
          </Title>
          <Link href="/about" style={linkStyle}>
            Giới thiệu
          </Link>
          <Link href="/blog" style={linkStyle}>
            Blog chia sẻ
          </Link>
          <Link href="/careers" style={linkStyle}>
            Tuyển dụng
          </Link>
          <Link href="/contact" style={linkStyle}>
            Liên hệ
          </Link>
        </Col>

        {/* CỘT 4: PHÁP LÝ */}
        <Col {...responsiveColProps}>
          <Title level={5} style={titleStyle}>
            Pháp lý
          </Title>
          <Link href="/terms" style={linkStyle}>
            Điều khoản dịch vụ
          </Link>
          <Link href="/privacy" style={linkStyle}>
            Chính sách bảo mật
          </Link>
          <Link href="/faq" style={linkStyle}>
            Câu hỏi thường gặp (FAQ)
          </Link>
        </Col>
      </Row>

      {/* DÒNG COPYRIGHT */}
      <Divider
        style={{ background: "rgba(255, 255, 255, 0.25)", margin: "24px 0 0" }}
      />
      <Text>
        <CopyrightOutlined /> {new Date().getFullYear()} ES English. Đã đăng ký
        bản quyền.
      </Text>
    </Footer>
  );
};

export default GlobalFooter;
