import { apiClient } from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const UserService = {
  getUsers: async () => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  createUser: async (userData: Omit<User, 'id'>) => {
    const response = await apiClient.post<User>('/users', userData);
    return response.data;
  },
};