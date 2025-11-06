import { baseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const selectedApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    selectSkill: getBaseApi("/admin/catalog/Skills", builder, {
      keepUnusedDataFor: 0,
    }),

    selectLevel: getBaseApi("/admin/catalog/Levels", builder, {
      keepUnusedDataFor: 0,
    }),

    getTopicBySkillAndLevel: getBaseApi<{
      skill_id: number;
      level_id: number;
    }>("/admin/catalog/topics", builder, {
      keepUnusedDataFor: 0,
    }),

    getTopicBySkill: getBaseApi<{ skill_id: string }>(
      "/admin/catalog/topics",
      builder,
      {
        keepUnusedDataFor: 0,
      }
    ),

    getContentByTopic: getBaseApi<{
      topic_id: string;
      type: string;
    }>("/admin/content", builder, {
      keepUnusedDataFor: 0,
    }),

    getTopicByType: getBaseApi<{ type: string }>("/admin/content", builder, {
      keepUnusedDataFor: 0,
    }),

    startQuestion: postBaseApi<{
      skill_id: string;
      level_id: string;
      topic_id: string;
      content_item_id: string;
      attempt_scope: string;
    }>("/attempts/start", builder),

    answerQuestion: postBaseApi<{
      attempt_id: string;
      question_id: string;
      chosen_option_id: string | null;
      answer_text: string | null;
    }>("/attempts/answer", builder),

    submitQuestion: postBaseApi<{
      attempt_id: string;
    }>("/attempts/submit", builder),

    resultsQuestion: postBaseApi<{
      topic_id: string;
      score: number;
      band_score: number;
      feedback: string;
    }>("/results", builder),
  }),
});

export const {
  useSelectSkillQuery,
  useSelectLevelQuery,
  useGetTopicBySkillAndLevelQuery,
  useGetContentByTopicQuery,
  useGetTopicByTypeQuery,

  // luong answer
  useStartQuestionMutation,
  useAnswerQuestionMutation,
  useSubmitQuestionMutation,

  // luong result
  useResultsQuestionMutation,
  useGetTopicBySkillQuery,
} = selectedApis;
