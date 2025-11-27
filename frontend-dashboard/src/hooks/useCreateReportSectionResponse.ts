import { useMutation } from '@tanstack/react-query';
import type { ReportResponse } from '../types/report-response';
import axios from 'axios';

export const useCreateESectionFieldResponse = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (reportData: ReportResponse[]) => {
      const response = await axios.post(`${API_URL}/section-field-response`, reportData);

      return response.data;
    },
  });
};
