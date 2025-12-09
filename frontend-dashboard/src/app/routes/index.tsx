import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import keycloak from '../../utils/keycloak';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      navigate({ to: '/frontpage' });
    }
  }, [navigate]);

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
            onClick={() => keycloak.login()}
          >
            Log ind
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
