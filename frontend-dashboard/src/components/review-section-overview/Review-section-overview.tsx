import { Button, Card, CardContent } from '@mui/material';
import ReviewButton from '../review-button/Review-button';
import Line from '../line/Line';
import styles from './review-section-overview.module.css';
import { useGetSections } from '../../hooks/useGetSections';
import { useState } from 'react';

type ReviewSectionOverviewProps = {
  onReviewClick: (title: string) => void;
};

const ReviewSectionOverview = ({
  onReviewClick,
}: ReviewSectionOverviewProps) => {
  const [relevantStatus, setRelevantStatus] = useState<Record<string, boolean>>(
    {},
  );
  const { data, isLoading, isError } = useGetSections();

  const handleRelevantStatusChange = (sectionId: string, status: boolean) => {
    setRelevantStatus((prev) => ({ ...prev, [sectionId]: status }));
  };

  const incompleteSections = data?.filter(
    (section) => !relevantStatus[section.id],
  );

  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
      <CardContent className={styles['card-right-content']}>
        <div className={styles['card-right-content']}>
          {/* FIXME: Set done condition dependent on filled out content or not relevant = true */}
          {isLoading && <p>Loading sections...</p>}
          {isError && <p>Error loading sections.</p>}
          {data?.map((section) => (
            <ReviewButton
              key={section.id}
              title={section.title}
              onClick={() => onReviewClick(section.title)}
              isNotRelevant={relevantStatus[section.id] || false}
              onRelevantChange={(status) =>
                handleRelevantStatusChange(section.id, status)
              }
            />
          ))}
        </div>
        <Line />
        <div className={styles['card-right-button-group']}>
          {/* FIXME: Add logic to buttons */}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={styles.button}
            disabled={incompleteSections && incompleteSections.length > 0}
          >
            Upload rundering
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            className={styles.button}
            onClick={() =>
              console.log('Gem og fortsæt senere clicked', incompleteSections)
            }
          >
            Gem og fortsæt senere
          </Button>
        </div>
        {incompleteSections && incompleteSections.length > 0 && (
          <Card
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
            }}
          >
            <CardContent>
              <div>
                <h4>
                  Du kan ikke uploade runderingen før alle dele er gennemgået.
                </h4>
                <h4>Du mangler stadig at gennemgå</h4>
              </div>
              <ul className={styles['card-right-warning-list']}>
                {incompleteSections.map((section) => (
                  <li key={section.id}>{section.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSectionOverview;
