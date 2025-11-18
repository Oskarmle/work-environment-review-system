import { createFileRoute } from '@tanstack/react-router';
import Card from '../../components/card/Card';
import LoginForm from '../../components/login-form/Login-form';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Card title="Arbejdsmiljørundering">
        <LoginForm />
      </Card>
    </div>
  );
}
