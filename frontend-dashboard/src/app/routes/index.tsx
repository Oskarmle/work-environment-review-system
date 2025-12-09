import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import keycloak from '../../utils/keycloak';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setAuthenticated(authenticated);
        setLoading(false);
        if (authenticated) {
          console.log('User authenticated:', keycloak.tokenParsed);
          navigate({ to: '/frontpage' });
        }
      })
      .catch((error) => {
        console.error('Keycloak init failed:', error);
        console.error('Keycloak config:', {
          url: import.meta.env.VITE_KEYCLOAK_URL,
          realm: import.meta.env.VITE_KEYCLOAK_REALM,
          clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate({ to: '/frontpage' });
    }
  }, [authenticated, navigate]);

  return (
    <div className="login-page">
      <Card
        sx={{
          bgcolor: 'primary.main',
          color: 'background.default',
        }}
      >
        <CardContent className="intro">
          <h2>Arbejdsmiljørundering</h2>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
            onClick={() => keycloak.login()}
          >
            {loading ? 'Logger ind...' : 'Log ind'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
