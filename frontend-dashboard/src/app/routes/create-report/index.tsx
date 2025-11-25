import { createFileRoute } from '@tanstack/react-router'
import Logo from '../../../components/logo/Logo';
import { Card, CardContent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={styles.card}>
      <Logo />
      <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
        <CardContent>
          <CreateReview />
        </CardContent>
      </Card>
    </div>
  );
}
