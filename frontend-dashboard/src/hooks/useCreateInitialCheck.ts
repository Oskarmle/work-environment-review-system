import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateInitialCheck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkName: string) => {
      const response = await axios.post(`${API_URL}/initial-check`, {
        checkName,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initialCheck'] });
    },
  });
};
