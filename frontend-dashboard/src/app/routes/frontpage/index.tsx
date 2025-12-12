import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Button, Card, CardContent } from '@mui/material';
import styles from './frontpage.module.css';
import { useCheckAuthentication } from '../../../hooks/useCheckAuthentication';
import { useGetUnfinishedReports } from '../../../hooks/useGetunfinishedReport';

export const Route = createFileRoute('/frontpage/')({
  component: RouteComponent,
});

function RouteComponent() {
  useCheckAuthentication();

  const { data: unfinishedReport } = useGetUnfinishedReports();

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
            disabled={unfinishedReport?.isCompleted === false}
          >
            Begynd ny rundering
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
