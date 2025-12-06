import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { FocusArea } from '../types/focus-area';

const API_URL = import.meta.env.VITE_API_URL;

const fetchAllFocusAreas = async (): Promise<FocusArea[]> => {
  const response = await axios.get(`${API_URL}/focus-area`);
  return response.data;
};

export const useGetAllFocusAreas = () => {
  return useQuery({
    queryKey: ['allFocusAreas'],
    queryFn: fetchAllFocusAreas,
  });
};
