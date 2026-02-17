// src/utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:80", // ✅ API 기본 URL
  timeout: 5000, // 5초 타임아웃
});

api.interceptors.response.use(
  <T>(res: AxiosResponse<ApiResponse<T>>) => {
    const { code, data } = res.data;

    if (code !== 200) {
      return Promise.reject(res.data);
    }

    return data;
  },
  (err) => Promise.reject(err),
);

// GET 요청
export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  api.get<T>(url, config);

// POST 요청
export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => api.post<ApiResponse<T>>(url, data, config);

// POST 요청
export const postForm = <T>(
  url: string,
  data?: FormData,
  config?: AxiosRequestConfig,
): Promise<T> => api.postForm(url, data, config);

// DELETE 요청
export const deleteData = <T>(url: string, config?: AxiosRequestConfig) =>
  api.delete<T>(url, config);

export default api;
