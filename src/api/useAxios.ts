import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosInstance from './axiosInstance'
// get post postform delete

export const post = <T>(url: string, payload: any, config?: AxiosRequestConfig) => {
  return axiosInstance.post<T>(url, payload, config)
}

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config)
}

export const postForm = <T>(
  url: string,
  payload: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const formData = new URLSearchParams()

  for (const key in payload) {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key])
    }
  }

  return axiosInstance.post<T>(url, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...config,
  })
}

export const put = <T>(
  url: string,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, payload, config)
}

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config)
}
