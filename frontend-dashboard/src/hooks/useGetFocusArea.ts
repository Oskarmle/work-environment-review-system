import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { FocusArea } from '../types/focus-area';

const API_URL = import.meta.env.VITE_API_URL;

const fetchActiveFocusArea = async (): Promise<FocusArea> => {
  const response = await axios.get(`${API_URL}/focus-area/active`);
  return response.data;
};

export const useGetActiveFocusArea = () => {
  return useQuery({
    queryKey: ['focusArea'],
    queryFn: fetchActiveFocusArea,
  });
};
