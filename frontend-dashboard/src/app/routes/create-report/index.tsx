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
import { useGetActiveFocusArea } from '../../../hooks/useGetFocusArea';
import { useCreateReport } from '../../../hooks/useCreateReport';
import type { Dayjs } from 'dayjs';

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
});

function RouteComponent() {
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
      const updates: Record<string, ReportResponse> = {};
      sectionFieldIds.forEach((fieldId) => {
        updates[fieldId] = {
          sectionFieldId: fieldId,
          isOkay: false,
          comment: '',
          imageUrl: null,
          isNotRelevant: isNotRelevant,
        };
      });
      return { ...prev, ...updates };
    });
  };

  const {
    data: focusAreaData,
    // isLoading: focusAreaLoading,
    // isError: focusAreaError,
  } = useGetActiveFocusArea();

  const handleBeginReview = () => {
    if (!date || !focusAreaData || !focusAreaChecked || !initialChecks) {
      console.error('Missing required fields');
      return;
    }

    // FIXME: Replace with actual user and station IDs from user data
    const userId = '4dd4691c-d882-4830-8573-d812c29dae43';
    const stationId = '3a83fd64-c801-47a3-b0b3-fbb3d9240a13';

    const reportData = {
      isCompleted: false,
      focusAreaId: focusAreaData.id,
      stationId: stationId,
      comment: comment,
      reportBeganAt: date.format('YYYY-MM-DD'),
      userId: userId,
    };

    mutation.mutate(reportData, {
      onSuccess: (data) => {
        console.log('Report created successfully');
        const createdReportId = data.id;
        setReportId(createdReportId);

        // TODO: Now send sectionFieldResponses with createdReportId
        console.log('Created report ID:', createdReportId);

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

  const mutation = useCreateReport();

  const handleSaveProgress = () => {
    console.log('All section field answers:', sectionFieldAnswers);
    // FIXME: Save progress with isCompleted = false
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
        </div>
        <div className={styles['card-right']}>
          {!selectedReview ? (
            <ReviewSectionOverview
              onReviewClick={handleReviewClick}
              onSaveProgress={handleSaveProgress}
              onSectionNotRelevant={handleSectionNotRelevant}
              sectionRelevantStatus={sectionRelevantStatus}
              onSubmitReport={handleSubmitReport}
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
