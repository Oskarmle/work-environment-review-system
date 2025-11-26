import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchAllInitialChecks = async () => {
  const response = await axios.get(`${API_URL}/initial-checks`);
  return response.data;
};

export const useGetAllInitialChecks = () => {
  return useQuery({
    queryKey: ['initialChecks'],
    queryFn: fetchAllInitialChecks,
  });
};
