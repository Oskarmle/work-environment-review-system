import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useGetAllInitialChecks } from '../../hooks/useGetInitialChecks';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './initial-check-dashboard-list.module.css';

type InitialCheckDashboardListProps = {
  handleDelete: (id: string) => void;
};

const InitialCheckDashboardList = ({
  handleDelete,
}: InitialCheckDashboardListProps) => {
  const { data } = useGetAllInitialChecks();
  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {data?.map((initialCheck) => (
          <ListItem
            key={initialCheck.id}
            className={styles.listItem}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(initialCheck.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={initialCheck.checkName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default InitialCheckDashboardList;
