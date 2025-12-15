import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import keycloak from '../utils/keycloak';
import type { SectionFieldResponseForReport } from '../types/report-response';

const API_URL = import.meta.env.VITE_API_URL;

const fetchSectionFieldResponses = async (
  reportId: string,
): Promise<SectionFieldResponseForReport[]> => {
  const response = await axios.get<SectionFieldResponseForReport[]>(
    `${API_URL}/section-field-response/${reportId}`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    },
  );
  return response.data;
};

export const useGetSectionFieldResponse = (reportId: string) => {
  return useQuery({
    queryKey: ['sectionFieldResponses', reportId],
    queryFn: () => fetchSectionFieldResponses(reportId),
    enabled: !!reportId,
  });
};
