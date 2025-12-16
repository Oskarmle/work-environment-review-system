import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { KeyCloakUser } from '../types/keycloak-user';

const API_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async (): Promise<KeyCloakUser[]> => {
  const response = await axios.get(`${API_URL}/keycloak/users`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
