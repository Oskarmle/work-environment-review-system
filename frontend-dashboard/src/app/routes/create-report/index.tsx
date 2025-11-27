import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import { useState, useMemo } from 'react';
import ReviewSection from '../../../components/review-section/Review-section';
import ReviewSectionOverview from '../../../components/review-section-overview/Review-section-overview';
import { useGetSectionsFields } from '../../../hooks/useGetSectionFields';

export type SectionFieldAnswer = {
  sectionFieldId: string;
  isOkay: boolean;
  comments: string;
  image: File | null;
  isNotRelevant: boolean;
};

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [sectionFieldAnswers, setSectionFieldAnswers] = useState<
    Record<string, SectionFieldAnswer>
  >({});
  const { data: sectionFields } = useGetSectionsFields();

  // Derive section relevant status from field answers
  const sectionRelevantStatus = useMemo(() => {
    const status: Record<string, boolean> = {};

    if (sectionFields) {
      // Group fields by section
      const sectionGroups = sectionFields.reduce(
        (acc, field) => {
          const sectionId = field.section.id;
          if (!acc[sectionId]) acc[sectionId] = [];
          acc[sectionId].push(field.id);
          return acc;
        },
        {} as Record<string, string[]>,
      );

      // Check if all fields in a section are completed
      // A field is completed if: isOkay OR isNotRelevant OR has comments
      Object.entries(sectionGroups).forEach(([sectionId, fieldIds]) => {
        const allFieldsCompleted = fieldIds.every((fieldId) => {
          const answer = sectionFieldAnswers[fieldId];
          if (!answer) return false;

          return (
            answer.isOkay ||
            answer.isNotRelevant ||
            (answer.comments && answer.comments.trim().length > 0)
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
    answer: SectionFieldAnswer,
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
      const updates: Record<string, SectionFieldAnswer> = {};
      sectionFieldIds.forEach((fieldId) => {
        updates[fieldId] = {
          sectionFieldId: fieldId,
          isOkay: false,
          comments: '',
          image: null,
          isNotRelevant: isNotRelevant,
        };
      });
      return { ...prev, ...updates };
    });
  };

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
              <CreateReview />
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
