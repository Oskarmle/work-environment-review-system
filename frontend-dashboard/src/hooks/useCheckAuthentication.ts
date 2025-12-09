import { useEffect } from 'react';
import keycloak from '../utils/keycloak';
import { useNavigate } from '@tanstack/react-router';

export const useCheckAuthentication = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!keycloak.authenticated) {
      navigate({ to: '/' });
    }
  }, [navigate]);
};