import router from '~/router'
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

// Axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor - 모든 API 요청에 자동으로 토큰이 포함되도록
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // localStorage에 저장된 토큰
    const token = localStorage.getItem('token')

    // Authorization 헤더에 Bearer {token} 추가
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.resolve(error)
  },
)

// Response Interceptor
instance.interceptors.response.use(
  // 정상일 경우
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  // 에러가 있을 경우
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      console.log('401')
    }
    return Promise.resolve(error)
  },
)

export default instance
