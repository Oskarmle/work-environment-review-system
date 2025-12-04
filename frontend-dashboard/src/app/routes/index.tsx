import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '../../components/login-form/Login-form';
import { Card, CardContent } from '@mui/material';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='login-page'>
      <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
        <CardContent>
          <h2>Arbejdsmiljørundering</h2>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
