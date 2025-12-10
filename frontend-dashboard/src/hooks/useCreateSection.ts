import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const response = await axios.post(`${API_URL}/section`, {
        title,
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['section'] });
    },
  });
};
