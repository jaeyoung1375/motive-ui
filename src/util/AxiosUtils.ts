// src/utils/api.ts
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:80', // ✅ API 기본 URL
  timeout: 5000, // 5초 타임아웃
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET 요청
export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.get<T>(url, config);
  return response.data;
};

// POST 요청
export const post = async <T>(
  url: string,
  data?: unknown,
  config?: ApiResponse<T>
) => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

// DELETE 요청
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export default api;
