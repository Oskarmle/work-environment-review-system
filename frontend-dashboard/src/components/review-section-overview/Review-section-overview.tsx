import { Button, Card, CardContent } from '@mui/material';
import ReviewButton from '../review-button/Review-button';
import Line from '../line/Line';
import styles from './review-section-overview.module.css';
import { useGetSections } from '../../hooks/useGetSections';
import { useGetSectionsFields } from '../../hooks/useGetSectionFields';

type ReviewSectionOverviewProps = {
  onReviewClick: (sectionId: string) => void;
  onSaveProgress: () => void;
  onSubmitReport: () => void;
  onSectionNotRelevant: (
    sectionFieldIds: string[],
    isNotRelevant: boolean,
  ) => void;
  sectionRelevantStatus: Record<string, boolean>;
  reportId?: string | null;
};

const ReviewSectionOverview = ({
  onReviewClick,
  onSaveProgress,
  onSubmitReport,
  onSectionNotRelevant,
  sectionRelevantStatus,
  reportId,
}: ReviewSectionOverviewProps) => {
  const { data, isLoading, isError } = useGetSections();
  const { data: sectionFields } = useGetSectionsFields();

  const handleRelevantStatusChange = (sectionId: string, status: boolean) => {
    const fieldIds =
      sectionFields
        ?.filter((field) => field.section.id === sectionId)
        .map((field) => field.id) || [];

    onSectionNotRelevant(fieldIds, status);
  };

  const incompleteSections = data?.filter(
    (section) => !sectionRelevantStatus[section.id],
  );

  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
      <CardContent className={styles['card-right-content']}>
        <div className={styles['card-right-content']}>
          {isLoading && <p>Loading sections...</p>}
          {isError && <p>Error loading sections.</p>}
          {data?.map((section) => (
            <ReviewButton
              key={section.id}
              title={section.title}
              onClick={() => onReviewClick(section.id)}
              isNotRelevant={sectionRelevantStatus[section.id] || false}
              onRelevantChange={(status) =>
                handleRelevantStatusChange(section.id, status)
              }
            />
          ))}
        </div>
        <Line />
        <div className={styles['card-right-button-group']}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={styles.button}
            disabled={
              incompleteSections && incompleteSections.length > 0 && !reportId
            }
            onClick={onSubmitReport}
          >
            Upload rundering
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            className={styles.button}
            onClick={onSaveProgress}
            disabled={!reportId}
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
