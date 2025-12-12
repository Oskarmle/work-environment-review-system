import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { User } from '../types/user';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

const fetchUnfinishedReports = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/report?isCompleted=false`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetUnfinishedReports = () => {
  return useQuery({
    queryKey: ['unfinishedReports'],
    queryFn: fetchUnfinishedReports,
  });
};
