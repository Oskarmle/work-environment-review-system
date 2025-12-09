import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

type FocusAreaData = {
  title: string;
  year: number;
  isActive: boolean;
};

export const useCreateFocusArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (focusAreaData: FocusAreaData) => {
      const response = await axios.post(
        `${API_URL}/focus-area`,
        focusAreaData,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        },
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFocusAreas'] });
    },
  });
};
