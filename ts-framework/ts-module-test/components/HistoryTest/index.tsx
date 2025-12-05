import AModal from "@/fer-framework/fe-component/web/AModal";
import { Alert, Button, Flex, List, Space, Typography } from "antd";
import React from "react";
import { useFetchHistoryTest } from "../../utils";

interface HistoryTestProps {
  open: boolean;
  onCancel: () => void;
  attempt_id: string;
}

const { Text, Title } = Typography;

function HistoryTest(props: HistoryTestProps) {
  const { open, onCancel, attempt_id } = props;

  const { data, loading } = useFetchHistoryTest(attempt_id);

  const answerColor = (option: any, answerChoice: any) => {
    // Chọn sai → danger
    if (option?.label === answerChoice && option?.is_correct !== true) {
      return "danger";
    }

    // Chọn đúng → success
    if (option?.label === answerChoice && option?.is_correct === true) {
      return "success";
    }

    // Đáp án đúng (nhưng không chọn) → success
    if (option?.is_correct === true) {
      return "success";
    }

    // Mặc định (không màu)
    return undefined;
  };

  return (
    <AModal
      title="Lịch sử bài test"
      open={open}
      onCancel={onCancel}
      width={800}
      destroyOnHidden
      fullHeight
      footer={[
        <Button key="close" onClick={() => onCancel()}>
          Đóng
        </Button>,
      ]}>
      <Alert
        message="Lưu ý"
        description={
          <Text>
            <Text type="success">Màu xanh lá</Text>: Hiển thị đáp án đúng của
            câu hỏi. <br />
            <Text type="danger">Màu đỏ</Text>: Hiển thị đáp án mà bạn đã chọn
            nhưng sai. <br />
            Nếu bạn trả lời đúng → chỉ đáp án đúng được tô{" "}
            <Text type="success">màu xanh</Text>. <br />
            Nếu bạn trả lời sai → đáp án bạn chọn sẽ{" "}
            <Text type="danger">màu đỏ</Text>, và đáp án đúng sẽ{" "}
            <Text type="success">màu xanh</Text>.
          </Text>
        }
        type="warning"
        showIcon
        closable
      />
      <List
        size="large"
        dataSource={data?.answers ?? []}
        loading={loading}
        renderItem={(item: any, index: number) => (
          <List.Item key={item._id} style={{ width: "100%" }}>
            <Space direction="vertical" size="small" style={{ width: "80%" }}>
              <Title level={5}>
                {index + 1}. {item?.bank_question_id?.question_text}
              </Title>
              <Flex justify="space-between" align="center">
                <Space direction="vertical" size="small">
                  {item?.bank_question_id?.options?.map(
                    (option: any, index: number) => (
                      <Text
                        type={answerColor(option, item?.chosen_option_label)}
                        key={index}
                        style={{ fontSize: "16px" }}>
                        {option?.label}. {option?.option_text}
                      </Text>
                    )
                  )}
                </Space>

                <Text>Đáp án của bạn: {item?.chosen_option_label}</Text>
              </Flex>
            </Space>
          </List.Item>
        )}
      />
    </AModal>
  );
}

export default HistoryTest;
