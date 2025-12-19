import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';

const API_URL = import.meta.env.VITE_API_URL;

const fetchReportAsPdf = async (reportId: string) => {
  const response = await axios.get(
    `${API_URL}/pdf/generate/${reportId}`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
      responseType: 'blob',
    },
  );
  return response.data;
};

export const useGetPdfReport = (reportId: string) => {
  return useQuery({
    queryKey: ['pdf-report', reportId],
    queryFn: () => fetchReportAsPdf(reportId),
    enabled: !!reportId,
  });
};
