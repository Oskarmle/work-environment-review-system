import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Section } from '../types/section';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

const fetchSections = async (): Promise<Section[]> => {
  await keycloak.updateToken(5);
  const response = await axios.get(`${API_URL}/section`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetSections = () => {
  return useQuery({
    queryKey: ['section'],
    queryFn: fetchSections,
  });
};
