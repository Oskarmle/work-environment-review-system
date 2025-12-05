import { createFileRoute } from '@tanstack/react-router';
import styles from './dashboard.module.css';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent, Fab } from '@mui/material';
import InitialCheckDashboardList from '../../../components/initial-check-dashboard-list/Initial-check-dashboard-list';
import { useDeleteInitialCheck } from '../../../hooks/useRemoveInitialCheck';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateInitialCheckModal from '../../../components/create-initial-check-modal/Create-initial-check-modal';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteInitialCheck = useDeleteInitialCheck();

  const handleDelete = (id: string) => {
    deleteInitialCheck.mutate(id);
  };

  return (
    <div>
      <Logo />
      <div className={styles.dashboard}>
        <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
          <CardContent className={styles['card-content']}>
            <div className={styles.header}>
              <h3>Egenindsats punkter</h3>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={handleOpen}
              >
                <AddIcon />
              </Fab>
            </div>
            <div>
              <InitialCheckDashboardList handleDelete={handleDelete} />
            </div>
          </CardContent>
        </Card>
      </div>
      <CreateInitialCheckModal open={open} handleClose={handleClose} />
    </div>
  );
}
