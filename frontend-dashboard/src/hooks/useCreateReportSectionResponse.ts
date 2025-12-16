import { useMutation } from '@tanstack/react-query';
import type { ReportResponse } from '../types/report-response';
import axios from 'axios';
import keycloak from '../utils/keycloak';

export const useCreateSectionFieldResponse = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async ({
      reportData,
      isUpdate = false,
    }: {
      reportData: ReportResponse[];
      isUpdate?: boolean;
    }) => {
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

      const method = isUpdate ? 'put' : 'post';
      const response = await axios[method](
        `${API_URL}/section-field-response`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${keycloak.token}`,
          },
        },
      );

      return response.data;
    },
  });
};
