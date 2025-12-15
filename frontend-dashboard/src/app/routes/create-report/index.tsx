import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent, type SelectChangeEvent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import { useState, useMemo, useEffect } from 'react';
import ReviewSection from '../../../components/review-section/Review-section';
import ReviewSectionOverview from '../../../components/review-section-overview/Review-section-overview';
import { useGetSectionsFields } from '../../../hooks/useGetSectionFields';
import type { ReportResponse } from '../../../types/report-response';
import { useGetActiveFocusArea } from '../../../hooks/useGetActiveFocusArea';
import { useCreateReport } from '../../../hooks/useCreateReport';
import type { Dayjs } from 'dayjs';
import { useCreateESectionFieldResponse } from '../../../hooks/useCreateReportSectionResponse';
import { useCheckAuthentication } from '../../../hooks/useCheckAuthentication';
import { useCompleteReport } from '../../../hooks/useCompleteReport';
import keycloak from '../../../utils/keycloak';
import { useGetSectionFieldResponse } from '../../../hooks/useGetSectionFieldResponse';

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { reportId?: string } => {
    return {
      reportId: search.reportId as string | undefined,
    };
  },
});

function RouteComponent() {
  useCheckAuthentication();
  const navigate = useNavigate();
  const { reportId: existingReportId } = Route.useSearch();

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
  const [reportId, setReportId] = useState<string | null>(existingReportId || null);

  // Fetch existing section field responses if we have an existing report
  const { data: existingResponses, isLoading: isLoadingResponses } = useGetSectionFieldResponse(
    existingReportId || ''
  );

  // Debug logging
  useEffect(() => {
    console.log('existingReportId:', existingReportId);
    console.log('existingResponses:', existingResponses);
    console.log('isLoadingResponses:', isLoadingResponses);
  }, [existingReportId, existingResponses, isLoadingResponses]);

  // Prefill answers when existing responses are loaded
  useEffect(() => {
    if (existingResponses && existingResponses.length > 0 && existingReportId) {
      console.log('Starting to prefill answers with', existingResponses.length, 'responses');
      const prefilledAnswers: Record<string, ReportResponse> = {};
      
      existingResponses.forEach((response) => {
        // Extract sectionFieldId from the response
        // The backend returns a sectionField object with an id property
        const sectionFieldId = typeof response.sectionFieldId === 'string' 
          ? response.sectionFieldId 
          : (response as any).sectionField?.id;

        if (!sectionFieldId) {
          console.warn('Missing sectionFieldId for response:', response);
          return;
        }

        // Convert image data back to File if it exists
        let imageFile: File | null = null;
        if (response.imageData && response.imageFileName && response.imageMimeType) {
          try {
            // imageData comes as Buffer from backend, need to handle it properly
            let base64Data = response.imageData;
            
            // If it's a Buffer object, convert it to base64 string
            if (typeof base64Data !== 'string' && (response.imageData as any).type === 'Buffer') {
              const uint8Array = new Uint8Array((response.imageData as any).data);
              base64Data = btoa(String.fromCharCode(...uint8Array));
            }
            
            // Convert base64 to blob
            const byteCharacters = atob(base64Data as string);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: response.imageMimeType });
            imageFile = new File([blob], response.imageFileName, { 
              type: response.imageMimeType 
            });
          } catch (error) {
            console.error('Error converting image data:', error);
          }
        }

        prefilledAnswers[sectionFieldId] = {
          sectionFieldId: sectionFieldId,
          reportId: existingReportId,
          isOkay: response.isOkay,
          isNotRelevant: response.isNotRelevant,
          comment: response.comment || '',
          image: imageFile,
        };
      });

      setSectionFieldAnswers(prefilledAnswers);
      console.log('Successfully prefilled answers:', prefilledAnswers);
    } else {
      console.log('Not prefilling - existingResponses:', existingResponses, 'existingReportId:', existingReportId);
    }
  }, [existingResponses, existingReportId]);

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
    // FIXME: Replace with actual user and station IDs from user data
    // const userId = '2e0809aa-5e16-49c9-bd4a-4005cf862b45';
    const stationId = 'b27cd2c1-4fae-4cc5-8675-8c7331aa99a1';
    const userId = keycloak.tokenParsed?.sub;

    if (
      !date ||
      !focusAreaData ||
      !focusAreaChecked ||
      !initialChecks ||
      !userId
    ) {
      console.error('Missing required fields');
      return;
    }

    const reportData = {
      isCompleted: false,
      focusAreaId: focusAreaData.id,
      stationId: stationId,
      comment: comment,
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
    console.log('Section field answers:', sectionFieldAnswers);
    console.log('report id', reportId);

    const sectionFieldResponseArray = Object.values(sectionFieldAnswers);

    if (sectionFieldResponseArray.length === sectionFields?.length) {
      const isUpdating = !!existingReportId;
      createSectionFieldResponseMutation.mutate(
        { reportData: sectionFieldResponseArray, isUpdate: isUpdating },
        {
          onSuccess: () => {
            console.log('Section field responses saved successfully');
            alert('Fremdrift gemt!');
          },
        },
      );
    }
  };

  const completeReportMutation = useCompleteReport();

  const handleSubmitReport = () => {
    console.log('All section field answers:', sectionFieldAnswers);
    console.log('report id', reportId);

    const sectionFieldResponseArray = Object.values(sectionFieldAnswers);

    if (sectionFieldResponseArray.length !== sectionFields?.length) {
      console.warn(
        'Not all section fields have been answered. Please complete all fields before saving progress.',
      );
      return;
    }
    completeReportMutation.mutate(reportId ?? '', {
      onSuccess: () => {
        alert('Rapport indsendt!');
        navigate({ to: '/frontpage' });
      },
    });
    console.log('Submitting report with answers:', sectionFieldAnswers);
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
