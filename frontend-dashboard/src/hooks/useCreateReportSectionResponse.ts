import { useMutation } from '@tanstack/react-query';
import type { ReportResponse } from '../types/report-response';
import axios from 'axios';

export const useCreateESectionFieldResponse = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (reportData: ReportResponse[]) => {
      const formData = new FormData();

      const responsesWithoutImages = reportData.map((response) => {
        const { image, ...rest } = response;
        return rest;
      });

      formData.append('responses', JSON.stringify(responsesWithoutImages));

      reportData.forEach((response) => {
        if (response.image) {
          formData.append('images', response.image);
        } else {
          formData.append('images', new Blob());
        }
      });

      const response = await axios.post(
        `${API_URL}/section-field-response`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    },
  });
};
