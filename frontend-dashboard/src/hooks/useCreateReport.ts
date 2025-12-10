import { useMutation } from '@tanstack/react-query';
import type { CreateReport } from '../types/report';
import axios from 'axios';
import keycloak from '../utils/keycloak';

export const useCreateReport = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (reportData: CreateReport) => {
      const response = await axios.post(`${API_URL}/report`, reportData, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      return response.data;
    },
  });
};
