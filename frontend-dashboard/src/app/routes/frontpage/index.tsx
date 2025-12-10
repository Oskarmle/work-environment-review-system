import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Button, Card, CardContent } from '@mui/material';
import styles from './frontpage.module.css';
import { useCheckAuthentication } from '../../../hooks/useCheckAuthentication';

export const Route = createFileRoute('/frontpage/')({
  component: RouteComponent,
});

function RouteComponent() {
  useCheckAuthentication();

  return (
    <div className={styles.card}>
      <Logo />
      <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
        <CardContent className={styles['card-content']}>
          <div>
            <h3>Ny rundering</h3>
            {/* FIXME: Set station from user instead of static */}
            <p>Station Dragør</p>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={styles.button}
            href="/create-report"
          >
            Begynd ny rundering
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
