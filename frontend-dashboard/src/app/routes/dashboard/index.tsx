import { createFileRoute } from '@tanstack/react-router';
import styles from './dashboard.module.css';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent, Fab } from '@mui/material';
import InitialCheckDashboardList from '../../../components/initial-check-dashboard-list/Initial-check-dashboard-list';
import { useDeleteInitialCheck } from '../../../hooks/useRemoveInitialCheck';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreateInitialCheckModal from '../../../components/create-initial-check-modal/Create-initial-check-modal';
import FocusAreaDashboardList from '../../../components/focus-area-dashboard-list/Focus-area-dashboard-list';
import { useDeleteFocusArea } from '../../../hooks/useRemoveFocusArea';
import CreateFocusAreaModal from '../../../components/create-focus-area-modal/Create-focus-area-modal';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [openInitialCheck, setOpenInitialCheck] = useState(false);
  const handleOpenInitialCheck = () => setOpenInitialCheck(true);
  const handleCloseInitialCheck = () => setOpenInitialCheck(false);
  const deleteInitialCheck = useDeleteInitialCheck();

  const [openFocusArea, setOpenFocusArea] = useState(false);
  const handleOpenFocusArea = () => setOpenFocusArea(true);
  const handleCloseFocusArea = () => setOpenFocusArea(false);
  const deleteFocusArea = useDeleteFocusArea();

  const handleDeleteInitialCheck = (id: string) => {
    deleteInitialCheck.mutate(id);
  };

  const handleDeleteFocusArea = (id: string) => {
    deleteFocusArea.mutate(id);
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
                onClick={handleOpenInitialCheck}
              >
                <AddIcon />
              </Fab>
            </div>
            <div>
              <InitialCheckDashboardList
                handleDelete={handleDeleteInitialCheck}
              />
            </div>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
          <CardContent className={styles['card-content']}>
            <div className={styles.header}>
              <h3>Fokus punkt</h3>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={handleOpenFocusArea}
              >
                <AddIcon />
              </Fab>
            </div>
            <div>
              <FocusAreaDashboardList handleDelete={handleDeleteFocusArea} />
            </div>
          </CardContent>
        </Card>
      </div>
      <CreateInitialCheckModal
        open={openInitialCheck}
        handleClose={handleCloseInitialCheck}
      />
      <CreateFocusAreaModal
        open={openFocusArea}
        handleClose={handleCloseFocusArea}
      />
    </div>
  );
}
