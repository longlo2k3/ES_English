import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export interface AnswerItem {
  bank_question_id: string;
  chosen_option_label: "A" | "B" | "C" | "D" | string;
}

export interface AttemptResponse {
  attempt_id: string;
  answers: AnswerItem[];
}

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMockTest: getBaseApi("admin/tests", builder, {
      keepUnusedDataFor: 0,
    }),

    postAnswerExam: postBaseApi<AttemptResponse>(
      "admin/tests/answer-multi",
      builder
    ),

    postSubmitExam: postBaseApi<{ attempt_id: string }>(
      "admin/tests/submit",
      builder
    ),
  }),
});

export const {
  useGetMockTestQuery,
  usePostAnswerExamMutation,
  usePostSubmitExamMutation,
} = authApis;
