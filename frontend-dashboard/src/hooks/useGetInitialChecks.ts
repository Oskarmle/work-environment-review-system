import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { InitialCheck } from '../types/initial-check';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

const fetchAllInitialChecks = async (): Promise<InitialCheck[]> => {
  const response = await axios.get(`${API_URL}/initial-check`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetAllInitialChecks = () => {
  return useQuery({
    queryKey: ['initialCheck'],
    queryFn: fetchAllInitialChecks,
  });
};
