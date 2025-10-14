import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { getToken } from "../uils/getToken";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.URL_SERVER,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("Content-Type", "application/json");
    const state = getState();
    const token = getToken(state);
    if (!!token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // headers.set("accept-language", "vi");
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: JSON.parse(process.env.TAG_TYPES || "[]"),
});

// Hàm `getBaseApi` nhận vào `builder` và định nghĩa một endpoint `query`
export const getBaseApi = <TParams extends Record<string, any>>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.query<any, TParams>({
    query: (params: TParams) => ({
      url,
      method: "GET",
      ...(params ? { params } : {}),
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
  });

// Hàm `postBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const postBaseApi = <TBody,>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<any, TBody>({
    query: (body: TBody) => ({
      url,
      method: "POST",
      body,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
    transformErrorResponse: (baseQueryReturnValue: any, meta, arg) =>
      baseQueryReturnValue.data,
  });

// Hàm `putBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const putBaseApi = <TBody, TParams>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<any, { body: TBody; params?: TParams }>({
    query: ({ body, params }) => ({
      url,
      method: "PUT",
      body,
      ...(params ? { params } : {}),
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
    transformErrorResponse: (baseQueryReturnValue: any, meta, arg) =>
      baseQueryReturnValue.data,
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const patchBaseApi = <TBody, TParams>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.mutation>>
) =>
  builder.mutation<any, { body: TBody; params?: TParams }>({
    query: ({ body, params }) => ({
      url,
      method: "PATCH",
      body,
      ...(params ? { params } : {}),
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
    transformErrorResponse: (baseQueryReturnValue: any, meta, arg) =>
      baseQueryReturnValue.data,
  });

// Hàm `patchBaseApi` nhận vào `builder` và định nghĩa một endpoint `mutation`
export const deleteBaseApi = <DeleteParams,>(
  url: string,
  builder: EndpointBuilder<BaseQueryFn, any, any>,
  partial?: Partial<ReturnType<typeof builder.query>>
) =>
  builder.mutation<any, DeleteParams>({
    query: (params: DeleteParams) => ({
      url,
      method: "DELETE",
      params,
    }),
    transformResponse: (response: { data: any }, meta, arg) => response.data,
    ...((partial ?? {}) as any),
    transformErrorResponse: (baseQueryReturnValue: any, meta, arg) =>
      baseQueryReturnValue.data,
  });
