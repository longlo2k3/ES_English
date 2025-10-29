import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopicFlashCard: getBaseApi<{ type: string }>(
      "/admin/catalog/topics",
      builder,
      {
        keepUnusedDataFor: 0,
      }
    ),

    getFlasCardByTopic: getBaseApi<{ topic_id: string }>(
      "/vocab/flashcards",
      builder,
      {
        keepUnusedDataFor: 0,
      }
    ),

    postSaveFlashCard: postBaseApi<{ flashcard_id: string }>(
      "vocab/saved-words/toggle",
      builder
    ),

    getSavedFlashCard: getBaseApi("/vocab/saved-words", builder, {
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetTopicFlashCardQuery,
  useGetFlasCardByTopicQuery,
  usePostSaveFlashCardMutation,
  useGetSavedFlashCardQuery,
} = authApis;
