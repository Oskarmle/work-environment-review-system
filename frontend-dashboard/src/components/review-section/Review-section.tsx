import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import styles from './review-section.module.css';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useGetSectionsFields } from '../../hooks/useGetSectionFields';
import type { ReportResponse } from '../../types/report-response';
import { useEffect, useMemo } from 'react';

type ReviewSectionProps = {
  selectedReview: string | null;
  setSelectedReview: (review: string | null) => void;
  answers: Record<string, ReportResponse>;
  onAnswerChange: (sectionFieldId: string, answer: ReportResponse) => void;
  reportId: string;
};

export type AccordionPreFillProps = {
  whatToCheck: string;
  lawInspection: string;
  internalControl: string;
  howToCheck: string;
  responsible?: string;
};

const ReviewSection = ({
  selectedReview,
  setSelectedReview,
  answers,
  onAnswerChange,
  reportId,
}: ReviewSectionProps) => {
  const { data: sectionFields, isLoading, isError } = useGetSectionsFields();

  const accordionItems = selectedReview
    ? sectionFields?.filter((field) => field.section.id === selectedReview) ||
      []
    : [];

  // Create object URLs for images and clean them up
  const imageUrls = useMemo(() => {
    const urls: Record<string, string> = {};
    Object.entries(answers).forEach(([key, answer]) => {
      if (answer.image) {
        urls[key] = URL.createObjectURL(answer.image);
      }
    });
    return urls;
  }, [answers]);

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
      <CardContent>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSelectedReview(null)}
        >
          Tilbage
        </Button>
        <div className={styles.content}>
          <h3>{accordionItems[0]?.section.title}</h3>
          <div className={styles.accordions}>
            {isLoading && <p>Loading section fields...</p>}
            {isError && <p>Error loading section fields.</p>}
            {accordionItems.map((sectionField, idx) => {
              const currentAnswer = answers[sectionField.id] || {
                reportId: reportId,
                sectionFieldId: sectionField.id,
                isOkay: false,
                comment: '',
                image: null,
                isNotRelevant: false,
              };

              return (
                <Accordion key={idx}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`panel-${idx}-content`}
                    id={`panel-${idx}-header`}
                    sx={{
                      backgroundColor: 'background.default',
                    }}
                  >
                    <h4>{sectionField.whatToCheck}</h4>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: 'background.default',
                    }}
                  >
                    <div className={styles['section-fields']}>
                      <div>
                        <h5>Lovpligtig eftersyn</h5>
                        <p>{sectionField.lawInspection ? 'Ja.' : 'Nej.'}</p>
                      </div>
                      <div>
                        <h5>Intern kontrol</h5>
                        <p>{sectionField.internalControl ? 'Ja.' : 'Nej.'}</p>
                      </div>
                      <div>
                        <h5>Hvordan/hvor tjekkes? (Mærkat/mappe)</h5>
                        <p>{sectionField.howToCheck}</p>
                      </div>
                      <div>
                        <h5>Ansvar</h5>
                        <p>{sectionField.responsibility}</p>
                      </div>
                    </div>
                    <div>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Alt er okay"
                        labelPlacement="start"
                        className={styles.checkbox}
                        checked={currentAnswer.isOkay}
                        onChange={(_, checked) => {
                          onAnswerChange(sectionField.id, {
                            ...currentAnswer,
                            isOkay: checked,
                            comment: checked ? '' : currentAnswer.comment,
                            image: checked ? null : currentAnswer.image,
                          });
                        }}
                        disabled={currentAnswer.isNotRelevant}
                      />
                    </div>
                    <div>
                      <h5>Bemærkninger</h5>
                      <textarea
                        disabled={currentAnswer.isOkay}
                        value={currentAnswer.comment}
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                          onAnswerChange(sectionField.id, {
                            ...currentAnswer,
                            comment: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <h5>Billede</h5>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        disabled={
                          currentAnswer.isOkay ||
                          currentAnswer.isNotRelevant
                        }
                        onClick={(e) => {
                          // Reset value to ensure onChange fires on iOS/iPad
                          const target = e.target as HTMLInputElement;
                          target.value = '';
                        }}
                        onChange={(
                          e: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const file = e.target.files?.[0] || null;
                          if (file) {
                            onAnswerChange(sectionField.id, {
                              ...currentAnswer,
                              image: file,
                            });
                          }
                        }}
                      />
                      {currentAnswer.image && (
                        <div style={{ marginTop: '10px' }}>
                          <img
                            src={imageUrls[sectionField.id] || ''}
                            alt="Selected"
                            style={{
                              maxWidth: '200px',
                              maxHeight: '200px',
                              objectFit: 'contain',
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              onAnswerChange(sectionField.id, {
                                ...currentAnswer,
                                image: null,
                              });
                            }}
                            style={{
                              marginLeft: '10px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                            }}
                          >
                            Fjern billede
                          </button>
                        </div>
                      )}
                    </div>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Skal ikke tjekkes"
                      labelPlacement="start"
                      className={styles.checkbox}
                      checked={currentAnswer.isNotRelevant}
                      onChange={(_, checked) => {
                        onAnswerChange(sectionField.id, {
                          ...currentAnswer,
                          isNotRelevant: checked,
                          comment: checked ? '' : currentAnswer.comment,
                          image: checked ? null : currentAnswer.image,
                        });
                      }}
                      disabled={currentAnswer.isOkay}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
