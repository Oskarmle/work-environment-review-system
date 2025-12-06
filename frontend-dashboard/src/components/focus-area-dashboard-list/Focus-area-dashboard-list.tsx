import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import styles from './focus-area-dashboard-list.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetAllFocusAreas } from '../../hooks/useGetAllFocusAreas';
import { useSetActiveFocusArea } from '../../hooks/useSetActiveFocusArea';

type FocusAreaDashboardListProps = {
  handleDelete: (id: string) => void;
};

const FocusAreaDashboardList = ({
  handleDelete,
}: FocusAreaDashboardListProps) => {
  const setActiveFocusArea = useSetActiveFocusArea();

  const handleToggle = (value: string) => () => {
    setActiveFocusArea.mutate(value);
  };

  const { data } = useGetAllFocusAreas();

  const sortedData = data?.slice().sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className={styles.focusAreaDashboardList}>
      <List className={styles.list}>
        {sortedData?.map((focusArea) => (
          <ListItem
            key={focusArea.id}
            className={styles.listItem}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                disabled={focusArea.isActive === true}
                onClick={() => handleDelete(focusArea.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={handleToggle(focusArea.id)}
              sx={{ padding: 0, flex: '0 0 auto' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Checkbox edge="start" checked={focusArea.isActive === true} />
              </ListItemIcon>
            </ListItemButton>
            <ListItemText
              primary={focusArea.title}
              secondary={focusArea.year}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FocusAreaDashboardList;
