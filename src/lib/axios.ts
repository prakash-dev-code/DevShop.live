import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ApiResponse<T = unknown> {
  data?: T;
  status: number;
  message?: string;
  error?: string;
  code?: string;
}

export interface ApiError {
  status: number;
  message: string;
  error?: string;
  code?: string;
}

export interface RequestConfig extends AxiosRequestConfig {
  suppressStatusCode?: number[];
}

const createAxiosInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || BASE_URL,
    timeout: 30_000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token here if needed
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => handleResponse(response),
    (error: AxiosError) => handleError(error),
  );

  const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => ({
    data: response.data,
    status: response.status,
  });

  const handleError = (error: AxiosError<ApiError>): Promise<ApiError> => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.message || error.message;
      
      // Handle specific status codes
      if (status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - redirect to login');
      }

      return Promise.reject({
        status,
        message: errorMessage,
        error: data?.error,
        code: data?.code,
      });
    }

    return Promise.reject({
      status: 500,
      message: error.message || 'Network Error',
    });
  };

  return instance;
};

const axiosInstance = createAxiosInstance();

export const createApiClient = (config?: RequestConfig) => ({
  get: <T>(url: string, params?: unknown) =>
    axiosInstance.get<T, ApiResponse<T>>(url, { ...config, params }),
  post: <T>(url: string, data?: unknown) =>
    axiosInstance.post<T, ApiResponse<T>>(url, data, config),
  put: <T>(url: string, data?: unknown) =>
    axiosInstance.put<T, ApiResponse<T>>(url, data, config),
  patch: <T>(url: string, data?: unknown) =>
    axiosInstance.patch<T, ApiResponse<T>>(url, data, config),
  delete: <T>(url: string) =>
    axiosInstance.delete<T, ApiResponse<T>>(url, config),
});

export const apiClient = createApiClient();

// For server-side requests (SSR)
export const createServerApiClient = (ctx?: any) => {
  // Add logic to handle server-side headers/cookies if needed
  return createAxiosInstance(BASE_URL);
};