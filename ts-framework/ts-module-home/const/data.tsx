import {
  CustomerServiceOutlined,
  EditOutlined,
  ProfileOutlined,
  ReadOutlined,
  SnippetsOutlined,
  SoundOutlined,
} from "@ant-design/icons";

export const SKILLS = [
  {
    icon: (
      <CustomerServiceOutlined style={{ fontSize: 28, color: "#5066FF" }} />
    ),
    title: "home.skills.listening.title",
    desc: "home.skills.listening.desc",
    link: "/skills/listening",
  },
  {
    icon: <SoundOutlined style={{ fontSize: 28, color: "#5066FF" }} />,
    title: "home.skills.speaking.title",
    desc: "home.skills.speaking.desc",
    link: "/skills/speaking",
  },
  {
    icon: <ReadOutlined style={{ fontSize: 28, color: "#5066FF" }} />,
    title: "home.skills.reading.title",
    desc: "home.skills.reading.desc",
    link: "/skills/reading",
  },
  {
    icon: <EditOutlined style={{ fontSize: 28, color: "#5066FF" }} />,
    title: "home.skills.writing.title",
    desc: "home.skills.writing.desc",
    link: "/skills/writing",
  },
  {
    icon: <SnippetsOutlined style={{ fontSize: 28, color: "#5066FF" }} />,
    title: "home.skills.vocabulary.title",
    desc: "home.skills.vocabulary.desc",
    link: "/flashcard",
  },
  {
    icon: <ProfileOutlined style={{ fontSize: 28, color: "#5066FF" }} />,
    title: "home.skills.exam.title",
    desc: "home.skills.exam.desc",
    link: "/test",
  },
];
