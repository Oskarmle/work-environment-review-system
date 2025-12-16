import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { Report } from '../types/report';

const API_URL = import.meta.env.VITE_API_URL;

const fetchFinishedReports = async (): Promise<Report[]> => {
  const response = await axios.get<Report[]>(
    `${API_URL}/report/user/${keycloak.tokenParsed?.sub}?isCompleted=true`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    },
  );
  return response.data;
};

export const useGetFinishedReports = () => {
  return useQuery({
    queryKey: ['finishedReports'],
    queryFn: fetchFinishedReports,
  });
};
