import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from './report-list.module.css';
import { useGetFinishedReports } from '../../hooks/useGetFinishedReports';

const ReportList = () => {
  const { data: finishedReports } = useGetFinishedReports();

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {finishedReports?.map((report) => (
          <ListItem key={report.id} className={styles.listItem}>
            <ListItemButton onClick={() => console.log(report)}>
              <ListItemText primary={report.id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReportList;
