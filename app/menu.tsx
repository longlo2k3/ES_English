import {
  BookOutlined,
  FileTextOutlined,
  HomeOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { MenuItem } from "@/fer-framework/fe-cores/constants";

export const items: MenuItem[] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "menu.home",
    link: "/home",
  },
  {
    key: "progress",
    icon: <LineChartOutlined />,
    label: "menu.progress",
    link: "/progress",
  },
  {
    key: "skills",
    icon: <UserOutlined />,
    label: "menu.skills",
    link: "/skills",
    children: [
      { key: "listening", label: "menu.listening", link: "/skills/listening" },
      { key: "speaking", label: "menu.speaking", link: "/skills/speaking" },
      { key: "reading", label: "menu.reading", link: "/skills/reading" },
      { key: "writing", label: "menu.writing", link: "/skills/writing" },
    ],
  },
  {
    key: "flashcard",
    icon: <BookOutlined />,
    label: "menu.flashcard",
    link: "/flashcard",
  },
  {
    key: "test",
    icon: <FileTextOutlined />,
    label: "menu.test",
    link: "/test",
  },
];
