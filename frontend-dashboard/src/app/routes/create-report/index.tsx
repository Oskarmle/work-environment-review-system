import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent, type SelectChangeEvent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import { useState, useMemo } from 'react';
import ReviewSection from '../../../components/review-section/Review-section';
import ReviewSectionOverview from '../../../components/review-section-overview/Review-section-overview';
import { useGetSectionsFields } from '../../../hooks/useGetSectionFields';
import type { ReportResponse } from '../../../types/report-response';
import { useGetActiveFocusArea } from '../../../hooks/useGetActiveFocusArea';
import { useCreateReport } from '../../../hooks/useCreateReport';
import type { Dayjs } from 'dayjs';
import { useCreateESectionFieldResponse } from '../../../hooks/useCreateReportSectionResponse';
import { authenticated } from '../../../utils/checkAuthentication';

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
});

function RouteComponent() {
  authenticated();

  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [sectionFieldAnswers, setSectionFieldAnswers] = useState<
    Record<string, ReportResponse>
  >({});
  const { data: sectionFields } = useGetSectionsFields();

  const [user, setUser] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [initialChecks, setInitialChecks] = useState<Record<string, boolean>>(
    {},
  );
  const [focusAreaChecked, setFocusAreaChecked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [reportId, setReportId] = useState<string | null>(null);

  const sectionRelevantStatus = useMemo(() => {
    const status: Record<string, boolean> = {};

    if (sectionFields) {
      const sectionGroups = sectionFields.reduce(
        (acc, field) => {
          const sectionId = field.section.id;
          if (!acc[sectionId]) acc[sectionId] = [];
          acc[sectionId].push(field.id);
          return acc;
        },
        {} as Record<string, string[]>,
      );

      Object.entries(sectionGroups).forEach(([sectionId, fieldIds]) => {
        const allFieldsCompleted = fieldIds.every((fieldId) => {
          const answer = sectionFieldAnswers[fieldId];
          if (!answer) return false;

          return (
            answer.isOkay ||
            answer.isNotRelevant ||
            (answer.comment && answer.comment.trim().length > 0)
          );
        });
        status[sectionId] = allFieldsCompleted && fieldIds.length > 0;
      });
    }

    return status;
  }, [sectionFieldAnswers, sectionFields]);

  const handleReviewClick = (sectionId: string) => {
    setSelectedReview(sectionId);
  };

  const handleAnswerChange = (
    sectionFieldId: string,
    answer: ReportResponse,
  ) => {
    setSectionFieldAnswers((prev) => ({
      ...prev,
      [sectionFieldId]: answer,
    }));
  };

  const handleSectionNotRelevant = (
    sectionFieldIds: string[],
    isNotRelevant: boolean,
  ) => {
    setSectionFieldAnswers((prev) => {
      if (isNotRelevant) {
        const updates: Record<string, ReportResponse> = {};
        sectionFieldIds.forEach((fieldId) => {
          updates[fieldId] = {
            sectionFieldId: fieldId,
            isOkay: false,
            comment: '',
            image: null,
            isNotRelevant: true,
            reportId: reportId ?? '',
          };
        });
        return { ...prev, ...updates };
      } else {
        const newAnswers = { ...prev };
        sectionFieldIds.forEach((fieldId) => {
          delete newAnswers[fieldId];
        });
        return newAnswers;
      }
    });
  };

  const { data: focusAreaData } = useGetActiveFocusArea();

  const handleBeginReview = () => {
    if (!date || !focusAreaData || !focusAreaChecked || !initialChecks) {
      console.error('Missing required fields');
      return;
    }

    // FIXME: Replace with actual user and station IDs from user data
    const userId = '2e0809aa-5e16-49c9-bd4a-4005cf862b45';
    const stationId = 'b27cd2c1-4fae-4cc5-8675-8c7331aa99a1';

    const reportData = {
      isCompleted: false,
      focusAreaId: focusAreaData.id,
      stationId: stationId,
      comment: comment,
      reportBeganAt: date.format('YYYY-MM-DD'),
      userId: userId,
    };

    createReportMutation.mutate(reportData, {
      onSuccess: (data) => {
        const createdReportId = data.id;
        setReportId(createdReportId);

        setDate(null);
        setUser([]);
        setInitialChecks({});
        setFocusAreaChecked(false);
        setComment('');
        alert('Rundering startet!');
      },
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof user>) => {
    const {
      target: { value },
    } = event;
    setUser(typeof value === 'string' ? value.split(',') : value);
  };

  const createReportMutation = useCreateReport();

  const createSectionFieldResponseMutation = useCreateESectionFieldResponse();

  const handleSaveProgress = () => {
    console.log('All section field answers:', sectionFieldAnswers);
    console.log('report id', reportId);

    const sectionFieldResponseArray = Object.values(sectionFieldAnswers);

    createSectionFieldResponseMutation.mutate(sectionFieldResponseArray, {
      onSuccess: () => {
        console.log('Section field responses saved successfully');
        alert('Fremdrift gemt!');
      },
    });
  };

  const handleSubmitReport = () => {
    console.log('Submitting report with answers:', sectionFieldAnswers);
    // FIXME: Save progress with isCompleted = true
  };

  return (
    <>
      <Logo />
      <div className={styles.content}>
        <div className={styles['card-left']}>
          {reportId === null && (
            <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
              <CardContent>
                <CreateReview
                  handleBeginReview={handleBeginReview}
                  date={date}
                  setDate={setDate}
                  user={user}
                  handleChange={handleChange}
                  initialChecks={initialChecks}
                  setInitialChecks={setInitialChecks}
                  focusAreaChecked={focusAreaChecked}
                  setFocusAreaChecked={setFocusAreaChecked}
                  comment={comment}
                  setComment={setComment}
                />
              </CardContent>
            </Card>
          )}
        </div>
        <div className={styles['card-right']}>
          {!selectedReview ? (
            <ReviewSectionOverview
              onReviewClick={handleReviewClick}
              onSaveProgress={handleSaveProgress}
              onSectionNotRelevant={handleSectionNotRelevant}
              sectionRelevantStatus={sectionRelevantStatus}
              onSubmitReport={handleSubmitReport}
              reportId={reportId}
            />
          ) : (
            <ReviewSection
              selectedReview={selectedReview}
              setSelectedReview={setSelectedReview}
              answers={sectionFieldAnswers}
              onAnswerChange={handleAnswerChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
