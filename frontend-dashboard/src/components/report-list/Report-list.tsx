import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import styles from './report-list.module.css';
import { useGetFinishedReports } from '../../hooks/useGetFinishedReports';
import type { Report } from '../../types/report';
import { useGetPdfReport } from '../../hooks/useGetPdfReport';
import { useEffect, useState } from 'react';

const ReportList = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const { data: finishedReports } = useGetFinishedReports();
  const { data: pdfReport } = useGetPdfReport(selectedReportId || '');

  const handleReportClick = (report: Report) => {
    setSelectedReportId(report.id);
  };

  useEffect(() => {
    if (pdfReport) {
      const blob = new Blob([pdfReport], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      setSelectedReportId(null);
    }
  }, [pdfReport]);

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
