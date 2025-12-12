import axios from 'axios';
import keycloak from '../utils/keycloak';
import { useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const useCompleteReport = () => {
  return useMutation({
    mutationFn: (reportId: string) => {
      return axios.patch(`${API_URL}/report/${reportId}/complete`, null, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
    },
  });
};
