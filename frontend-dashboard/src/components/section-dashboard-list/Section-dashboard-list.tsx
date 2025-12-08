import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import styles from './section-dashboard-list.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetSections } from '../../hooks/useGetSections';

type sectionDashboardListProps = {
  handleDelete: (id: string) => void;
};

const SectionDashboardList = ({ handleDelete }: sectionDashboardListProps) => {
  const { data } = useGetSections();
  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {data?.map((section) => (
          <ListItem
            key={section.id}
            className={styles.listItem}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(section.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SectionDashboardList;
