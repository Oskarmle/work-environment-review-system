import { createFileRoute } from '@tanstack/react-router';
import styles from './dashboard.module.css';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent } from '@mui/material';
import InitialCheckDashboardList from '../../../components/initial-check-dashboard-list/Initial-check-dashboard-list';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleDelete = (id: string) => {
    console.log('Delete item', id);
  };

  return (
    <div>
      <Logo />
      <div className={styles.dashboard}>
        <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
          <CardContent className={styles['card-content']}>
            <div>
              <h3>Egenindsats punkter</h3>
            </div>
            <div>
              <InitialCheckDashboardList handleDelete={handleDelete} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
