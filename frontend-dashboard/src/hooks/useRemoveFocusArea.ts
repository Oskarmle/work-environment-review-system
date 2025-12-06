import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteFocusArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_URL}/focus-area/${id}`);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allFocusAreas'] });
    },
  });
};
