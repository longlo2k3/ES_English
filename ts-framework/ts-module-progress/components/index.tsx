import React from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  List,
  Tag,
  Typography,
  Avatar,
  Space,
  Tabs,
  Calendar,
  Collapse,
  Table,
  Tooltip,
} from "antd";
import {
  TrophyOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
  CustomerServiceOutlined,
  ReadOutlined,
  EditOutlined,
  MessageOutlined,
  BookOutlined,
  RiseOutlined,
} from "@ant-design/icons";
// Import biểu đồ Radar
import { Radar } from "@ant-design/charts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import OverViewTab from "./OverViewTab";
import RoadmapTab from "./RoadmapTab";
import HistoryTab from "./HistoryTab";
import { useGetProgressQuery } from "../apis";
import { useSelector } from "react-redux";
import { authSelectors } from "@/fer-framework/fe-module-auth/reducers";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// --- DỮ LIỆU GIẢ LẬP CHI TIẾT ---

// 1. Bảng tra cứu (Lookup tables) cho các ObjectId
const skillLookup = {
  "68ed254ce5c75afc72ea3c2a": {
    name: "Kỹ năng Nghe",
    icon: <CustomerServiceOutlined />,
  },
  skill_reading: { name: "Kỹ năng Đọc", icon: <ReadOutlined /> },
  skill_writing: { name: "Kỹ năng Viết", icon: <EditOutlined /> },
  skill_speaking: { name: "Kỹ năng Nói", icon: <MessageOutlined /> },
};

const levelLookup = {
  "68ed254ce5c75afc72ea3c31": {
    name: "Cấp độ Cơ bản",
    description: "Các bài học cho người mới bắt đầu.",
  },
  level_intermediate: {
    name: "Cấp độ Trung cấp",
    description: "Nâng cao vốn từ và ngữ pháp.",
  },
};

const topicLookup = {
  "6908dc758211721f01c8b8ff": { name: "Bài 1: Từ vựng Gia đình" },
  topic_2: { name: "Bài 2: Ngữ pháp Thì hiện tại đơn" },
  topic_3: { name: "Bài 3: Hội thoại nhà hàng" },
  topic_4: { name: "Bài 4: Viết Email cơ bản" },
};

// 2. Dữ liệu thô (Raw Data) - Một mảng các bản ghi như bạn cung cấp
const allActivityData = [
  // Đây là bản ghi của bạn
  {
    _id: "690a1771a9073f3af287d6a1",
    topic_id: "6908dc758211721f01c8b8ff",
    skill_id: "68ed254ce5c75afc72ea3c2a",
    level_id: "68ed254ce5c75afc72ea3c31",
    correct_count: 2,
    createdAt: "2025-11-04T15:10:38.517+00:00",
    last_activity_at: "2025-11-04T15:58:23.555+00:00",
    total_attempts: 2,
    total_score: 16,
  },
  {
    _id: "record_2",
    topic_id: "topic_2",
    skill_id: "skill_reading",
    level_id: "68ed254ce5c75afc72ea3c31",
    correct_count: 8,
    createdAt: "2025-11-03T10:30:00.000+00:00",
    last_activity_at: "2025-11-03T10:35:00.000+00:00",
    total_attempts: 10,
    total_score: 80,
  },
  {
    _id: "record_3",
    topic_id: "topic_3",
    skill_id: "68ed254ce5c75afc72ea3c2a",
    level_id: "level_intermediate",
    correct_count: 5,
    createdAt: "2025-11-03T18:00:00.000+00:00",
    last_activity_at: "2025-11-03T18:15:00.000+00:00",
    total_attempts: 5,
    total_score: 50,
  },
  {
    _id: "record_4",
    topic_id: "topic_4",
    skill_id: "skill_writing",
    level_id: "level_intermediate",
    correct_count: 7,
    createdAt: "2025-11-02T11:00:00.000+00:00",
    last_activity_at: "2025-11-02T11:20:00.000+00:00",
    total_attempts: 10,
    total_score: 70,
  },
];

// --- HÀM XỬ LÝ DỮ LIỆU ---

// 1. Tính toán dữ liệu cho Biểu đồ Radar (tổng điểm theo skill_id)
const getRadarData = (data: any, skillMap: any) => {
  const skillScores = {};

  // Khởi tạo điểm cho tất cả kỹ năng
  Object.keys(skillMap).forEach((id) => {
    (skillScores as any)[id] = 0;
  });

  // Cộng dồn total_score
  data.forEach((record: any) => {
    if ((skillScores as any)[record.skill_id] !== undefined) {
      (skillScores as any)[record.skill_id] += record.total_score;
    }
  });

  // Chuyển đổi sang định dạng của Ant Charts
  return Object.keys(skillScores).map((id) => ({
    skill: skillMap[id].name,
    score: (skillScores as any)[id],
  }));
};

// 2. Nhóm dữ liệu theo Lộ trình (level_id -> skill_id -> topic_id)
const getPathData = (
  data: any,
  levelMap: any,
  skillMap: any,
  topicMap: any
) => {
  const paths = {};

  data.forEach((record: any) => {
    const level = levelMap[record.level_id];
    const skill = skillMap[record.skill_id];
    const topic = topicMap[record.topic_id];

    if (!level || !skill || !topic) return;

    if (!(paths as any)[level.name]) {
      (paths as any)[level.name] = {
        skills: {},
        description: level.description,
      };
    }
    if (!(paths as any)[level.name].skills[skill.name]) {
      (paths as any)[level.name].skills[skill.name] = {
        icon: skill.icon,
        topics: [],
      };
    }

    // Thêm topic vào, tránh trùng lặp nếu làm nhiều lần
    if (
      !(paths as any)[level.name].skills[skill.name].topics.find(
        (t: any) => t.id === topic.name
      )
    ) {
      (paths as any)[level.name].skills[skill.name].topics.push({
        id: topic.name,
        // Lấy kết quả mới nhất cho topic này (giả sử data đã sắp xếp)
        score: record.total_score,
        accuracy: (record.correct_count / record.total_attempts) * 100,
      });
    }
  });
  return paths;
};

// 3. Render dữ liệu cho Lịch

// --- COMPONENT GIAO DIỆN ---
export const DetailedProgressDashboard = () => {
  // --- Xử lý dữ liệu ---
  const radarData = getRadarData(allActivityData, skillLookup);
  const pathData = getPathData(
    allActivityData,
    levelLookup,
    skillLookup,
    topicLookup
  );

  // Tính toán thống kê tổng
  const totalScore = allActivityData.reduce((sum, r) => sum + r.total_score, 0);
  const totalCorrect = allActivityData.reduce(
    (sum, r) => sum + r.correct_count,
    0
  );
  const totalAttempts = allActivityData.reduce(
    (sum, r) => sum + r.total_attempts,
    0
  );
  const overallAccuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const userInfor = useSelector((state: any) => authSelectors.getUser(state));

  const { data } = useGetProgressQuery({});

  console.log("data>>", data);

  const items = [
    {
      key: "1",
      label: "Tổng quan",
      children: (
        <OverViewTab
          totalScore={totalScore}
          overallAccuracy={overallAccuracy}
          allActivityData={allActivityData}
          radarData={radarData}
        />
      ),
    },
    {
      key: "2",
      label: "Lộ trình học",
      children: <RoadmapTab pathData={pathData} />,
    },
    {
      key: "3",
      label: "Lịch sử chi tiết",
      children: (
        <HistoryTab
          allActivityData={allActivityData}
          topicLookup={topicLookup}
          skillLookup={skillLookup}
        />
      ),
    },
  ];

  return (
    <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <Content>
        <Title level={2} style={{ marginBottom: "24px" }}>
          Tiến Độ Học Tập
        </Title>

        <Tabs defaultActiveKey="1" type="card" items={items} />
      </Content>
    </Layout>
  );
};

export default DetailedProgressDashboard;
