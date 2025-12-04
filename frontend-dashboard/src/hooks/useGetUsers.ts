import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
