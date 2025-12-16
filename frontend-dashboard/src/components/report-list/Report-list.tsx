import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from './report-list.module.css';
import { useGetFinishedReports } from '../../hooks/useGetFinishedReports';
import type { Report } from '../../types/report';

const ReportList = () => {
  const { data: finishedReports } = useGetFinishedReports();

  const handleReportClick = (report: Report) => {
    console.log('Report clicked:', report);
  };

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {finishedReports?.map((report) => (
          <ListItem key={report.id} className={styles.listItem}>
            <ListItemButton onClick={() => handleReportClick(report)}>
              <ListItemText
                primary={report.station?.stationName || 'Unknown Station'}
                secondary={new Date(report.createdAt).toLocaleDateString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReportList;
