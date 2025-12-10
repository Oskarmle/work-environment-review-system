import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

export const useSetActiveFocusArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.patch(
        `${API_URL}/focus-area/activate`,
        { id },
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
