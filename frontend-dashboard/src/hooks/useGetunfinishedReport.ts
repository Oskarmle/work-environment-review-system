import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { Report } from '../types/report';

const API_URL = import.meta.env.VITE_API_URL;

const fetchUnfinishedReports = async (): Promise<Report | undefined> => {
  const response = await axios.get<Report[]>(
    `${API_URL}/report?isCompleted=false`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    },
  );
  return response.data[0];
};

export const useGetUnfinishedReports = () => {
  return useQuery({
    queryKey: ['unfinishedReports'],
    queryFn: fetchUnfinishedReports,
  });
};
