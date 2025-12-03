import React from "react";
import { Layout, Row, Button, Typography, Alert } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { useParams } from "next/navigation";
import { useTestExam } from "../../hook/useTestExam";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import Questions from "./Questions";
import Actions from "./Actions";
import MenuQuestion from "./MenuQuestion";
import { useFetchTestDetail } from "../../utils";
import TestResult from "../TestResult";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const TestDetail = () => {
  const { _id } = useParams();
  const { data, loading, error } = useFetchTestDetail(_id as string);

  const {
    currentQuestion,
    currentQ,
    totalQuestions,
    userAnswers,
    flagged,
    deadline,
    answeredCount,
    result,
    handleAnswerChange,
    goToQuestion,
    toggleFlag,
    showSubmitConfirm,
    onFinish,
    onReset,
  } = useTestExam({
    data: data as any,
    _id: _id as string,
  });

  if (loading) {
    return <SpinLoading isLoading={loading} />;
  }

  if (error) {
    return <div>Có lỗi xảy ra</div>;
  }

  return (
    <>
      {result?.attempt_id !== "" ? (
        <TestResult data={result} onReset={onReset} />
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #f0f0f0",
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Title level={4} style={{ margin: 0 }}>
              Bài thi thử - 30 Phút
            </Title>
            <Button
              type="primary"
              danger
              icon={<CheckOutlined />}
              onClick={showSubmitConfirm}>
              Nộp bài
            </Button>
          </Header>

          <Layout>
            <Content style={{ padding: "24px" }}>
              <Alert
                message="Hướng dẫn"
                description="Chọn đáp án đúng cho mỗi câu hỏi. Bạn có thể dùng Bảng câu hỏi bên phải để chuyển đến bất kỳ câu nào."
                type="info"
                showIcon
                closable
                style={{ marginBottom: "24px" }}
              />

              <Questions
                currentQuestion={currentQuestion}
                currentQ={currentQ}
                totalQuestions={totalQuestions}
                flagged={flagged}
                userAnswers={userAnswers as any}
                handleAnswerChange={handleAnswerChange}
                toggleFlag={toggleFlag}
              />

              <Row justify="space-between" style={{ marginTop: "24px" }}>
                <Actions
                  currentQuestion={currentQuestion}
                  totalQuestions={totalQuestions}
                  goToQuestion={goToQuestion}
                />
              </Row>
            </Content>

            <Sider
              width={300}
              theme="light"
              style={{
                padding: "24px",
                borderLeft: "1px solid #f0f0f0",
                overflowY: "auto",
              }}>
              <MenuQuestion
                {...{
                  deadline,
                  totalQuestions,
                  currentQuestion,
                  answeredCount,
                  userAnswers: userAnswers as any,
                  flagged,
                  goToQuestion,
                  onFinish,
                }}
              />
            </Sider>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default TestDetail;
