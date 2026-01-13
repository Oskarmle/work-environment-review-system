import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent, type SelectChangeEvent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import { useState, useMemo, useEffect } from 'react';
import ReviewSection from '../../../components/review-section/Review-section';
import ReviewSectionOverview from '../../../components/review-section-overview/Review-section-overview';
import { useGetSectionsFields } from '../../../hooks/useGetSectionFields';
import type {
  ReportResponse,
  SerializableReportResponse,
} from '../../../types/report-response';
import { useGetActiveFocusArea } from '../../../hooks/useGetActiveFocusArea';
import {
  fileToSerializable,
  serializableToFile,
} from '../../../utils/fileHelpers';
import { useCreateReport } from '../../../hooks/useCreateReport';
import type { Dayjs } from 'dayjs';
import { useCheckAuthentication } from '../../../hooks/useCheckAuthentication';
import { useCompleteReport } from '../../../hooks/useCompleteReport';
import keycloak from '../../../utils/keycloak';
import { useGetSectionFieldResponse } from '../../../hooks/useGetSectionFieldResponse';
import { useCreateSectionFieldResponse } from '../../../hooks/useCreateReportSectionResponse';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setAnswer,
  setMultipleAnswers,
  removeMultipleAnswers,
  resetAnswers,
} from '../../features/reviewFormSlice';

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

  const dispatch = useAppDispatch();
  const sectionFieldAnswers = useAppSelector(
    (state) => state.reviewForm.sectionFieldAnswers,
  );

  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const { data: sectionFields } = useGetSectionsFields();

  const [user, setUser] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [station, setStation] = useState<string>('');
  const [stationId, setStationId] = useState<string>('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [initialChecks, setInitialChecks] = useState<Record<string, boolean>>(
    {},
  );
  const [focusAreaChecked, setFocusAreaChecked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [reportId, setReportId] = useState<string | null>(
    existingReportId || null,
  );

  const { data: existingResponses } = useGetSectionFieldResponse(
    existingReportId || '',
  );

  useEffect(() => {
    const loadExistingResponses = async () => {
      if (
        existingResponses &&
        existingResponses.length > 0 &&
        existingReportId
      ) {
        const prefilledAnswers: Record<string, SerializableReportResponse> =
          {};

        const promises = existingResponses.map(async (response) => {
          const sectionFieldId =
            typeof response.sectionFieldId === 'string'
              ? response.sectionFieldId
              : (response as any).sectionField?.id;

          if (!sectionFieldId) {
            console.warn('Missing sectionFieldId for response:', response);
            return;
          }

          let imageFile: File | null = null;
          if (
            response.imageData &&
            response.imageFileName &&
            response.imageMimeType
          ) {
            try {
              let base64Data = response.imageData;

              if (
                typeof base64Data !== 'string' &&
                (response.imageData as any).type === 'Buffer'
              ) {
                const uint8Array = new Uint8Array(
                  (response.imageData as any).data,
                );
                base64Data = btoa(String.fromCharCode(...uint8Array));
              }

              const byteCharacters = atob(base64Data as string);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], {
                type: response.imageMimeType,
              });
              imageFile = new File([blob], response.imageFileName, {
                type: response.imageMimeType,
              });
            } catch (error) {
              console.error('Error converting image data:', error);
            }
          }

          let serializableImage = null;
          if (imageFile) {
            serializableImage = await fileToSerializable(imageFile);
          }

          prefilledAnswers[sectionFieldId] = {
            sectionFieldId: sectionFieldId,
            reportId: existingReportId,
            isOkay: response.isOkay,
            isNotRelevant: response.isNotRelevant,
            comment: response.comment || '',
            image: serializableImage,
          };
        });

        await Promise.all(promises);
        dispatch(setMultipleAnswers(prefilledAnswers));
      }
    };

    loadExistingResponses();
  }, [existingResponses, existingReportId, dispatch]);

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

  const handleAnswerChange = async (
    sectionFieldId: string,
    answer: ReportResponse,
  ) => {
    // Convert File to serializable format for Redux
    let serializableImage = null;
    if (answer.image) {
      serializableImage = await fileToSerializable(answer.image);
      console.log('Image converted to serializable:', {
        name: serializableImage.name,
        size: serializableImage.size,
        dataUrlLength: serializableImage.dataUrl.length,
      });
    }

    const serializableAnswer: SerializableReportResponse = {
      ...answer,
      image: serializableImage,
    };

    console.log('Storing answer in Redux:', {
      sectionFieldId,
      hasImage: !!serializableImage,
    });

    dispatch(setAnswer({ sectionFieldId, answer: serializableAnswer }));
  };

  const handleSectionNotRelevant = (
    sectionFieldIds: string[],
    isNotRelevant: boolean,
  ) => {
    if (isNotRelevant) {
      const updates: Record<string, SerializableReportResponse> = {};
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
      dispatch(setMultipleAnswers(updates));
    } else {
      dispatch(removeMultipleAnswers(sectionFieldIds));
    }
  };

  const { data: focusAreaData } = useGetActiveFocusArea();

  const handleBeginReview = () => {
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
      notificationEmails: emails,
    };

    createReportMutation.mutate(reportData, {
      onSuccess: (data) => {
        const createdReportId = data.id;
        setReportId(createdReportId);

        setDate(null);
        setUser([]);
        setEmails([]);
        setInitialChecks({});
        setFocusAreaChecked(false);
        setComment('');
        setStation('');
        setStationId('');
        dispatch(resetAnswers());
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

  const handleStationChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setStation(value);
    setStationId(value);
  };

  const createReportMutation = useCreateReport();

  const createSectionFieldResponseMutation = useCreateSectionFieldResponse();

  const handleSaveProgress = () => {
    // Convert SerializableReportResponse back to ReportResponse
    const sectionFieldResponseArray: ReportResponse[] = Object.values(
      sectionFieldAnswers,
    ).map((answer) => ({
      ...answer,
      image: answer.image ? serializableToFile(answer.image) : null,
    }));

    if (sectionFieldResponseArray.length > 0) {
      const isUpdating = !!existingReportId;
      createSectionFieldResponseMutation.mutate(
        { reportData: sectionFieldResponseArray, isUpdate: isUpdating },
        {
          onSuccess: () => {
            alert('Fremdrift gemt!');
            navigate({ to: '/frontpage' });
          },
        },
      );
    } else {
      alert('Ingen svar at gemme endnu');
    }
  };

  const completeReportMutation = useCompleteReport();

  const handleSubmitReport = () => {
    // Convert SerializableReportResponse back to ReportResponse
    const sectionFieldResponseArray: ReportResponse[] = Object.values(
      sectionFieldAnswers,
    ).map((answer) => ({
      ...answer,
      image: answer.image ? serializableToFile(answer.image) : null,
    }));

    if (sectionFieldResponseArray.length !== sectionFields?.length) {
      console.warn(
        'Not all section fields have been answered. Please complete all fields before saving progress.',
      );
      return;
    }

    const isUpdating = !!existingReportId;
    createSectionFieldResponseMutation.mutate(
      { reportData: sectionFieldResponseArray, isUpdate: isUpdating },
      {
        onSuccess: () => {
          completeReportMutation.mutate(reportId ?? '', {
            onSuccess: () => {
              alert('Rapport indsendt!');
              navigate({ to: '/frontpage' });
            },
          });
        },
        onError: (error) => {
          console.error('Error saving section field responses:', error);
          alert('Fejl ved indsendelse af rapport. Prøv igen.');
        },
      },
    );
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
                  emails={emails}
                  setEmails={setEmails}
                  station={station}
                  handleStationChange={handleStationChange}
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
              answers={(() => {
                const convertedAnswers = Object.fromEntries(
                  Object.entries(sectionFieldAnswers).map(([key, value]) => {
                    const converted = {
                      ...value,
                      image: value.image
                        ? serializableToFile(value.image)
                        : null,
                    } as ReportResponse;
                    if (converted.image) {
                      console.log('Converting back to File for display:', {
                        key,
                        fileName: converted.image.name,
                        fileSize: converted.image.size,
                      });
                    }
                    return [key, converted];
                  }),
                );
                console.log(
                  'Total answers with images:',
                  Object.values(convertedAnswers).filter((a) => a.image)
                    .length,
                );
                return convertedAnswers;
              })()}
              onAnswerChange={handleAnswerChange}
              reportId={reportId ?? ''}
            />
          )}
        </div>
      </div>
    </>
  );
}
