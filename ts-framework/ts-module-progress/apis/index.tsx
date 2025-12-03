import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const progressApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: getBaseApi("/attempts/me/progress", builder, {
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetProgressQuery } = progressApis;
