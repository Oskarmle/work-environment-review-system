import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { Station } from '../types/station';

const API_URL = import.meta.env.VITE_API_URL;

const fetchStations = async (): Promise<Station[]> => {
  await keycloak.updateToken(5);
  const response = await axios.get(`${API_URL}/station`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetStations = () => {
  return useQuery({
    queryKey: ['station'],
    queryFn: fetchStations,
  });
};
