import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { SectionField } from '../types/section-field';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

const fetchSectionsFields = async (): Promise<SectionField[]> => {
  const response = await axios.get(`${API_URL}/section-field`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  });
  return response.data;
};

export const useGetSectionsFields = () => {
  return useQuery({
    queryKey: ['section-field'],
    queryFn: fetchSectionsFields,
  });
};
