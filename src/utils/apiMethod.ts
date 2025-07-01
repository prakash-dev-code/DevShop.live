// src/utils/api-method.ts
import axiosInstance from '@/lib/axios';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const apiMethod = async <T>(
  url: string,
  method: Method,
  data: any = {},
  sendToken: boolean = false
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};

    // Auto-attach token if needed
    if (sendToken && typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Auto-detect FormData
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    if (isFormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    const response = await axiosInstance({
      url,
      method,
      data: method !== 'get' ? data : undefined,
      params: method === 'get' ? data : undefined,
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
};
