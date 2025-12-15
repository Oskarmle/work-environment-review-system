import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { Report } from '../types/report';

const API_URL = import.meta.env.VITE_API_URL;

const fetchUnfinishedReports = async (): Promise<Report | null> => {
  const response = await axios.get<Report[]>(
    `${API_URL}/report?isCompleted=false`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    },
  );
  return response.data[0] || null;
};

export const useGetUnfinishedReports = () => {
  return useQuery({
    queryKey: ['unfinishedReports'],
    queryFn: fetchUnfinishedReports,
  });
};
