import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteInitialCheck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_URL}/initial-check/${id}`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initialCheck'] });
    },
  });
};
