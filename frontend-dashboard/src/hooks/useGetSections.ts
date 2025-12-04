import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Section } from '../types/section';

const API_URL = import.meta.env.VITE_API_URL;

const fetchSections = async (): Promise<Section[]> => {
  const response = await axios.get(`${API_URL}/section`);
  return response.data;
};

export const useGetSections = () => {
  return useQuery({
    queryKey: ['section'],
    queryFn: fetchSections,
  });
};
