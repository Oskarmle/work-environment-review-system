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
import { Field, Form, Formik } from 'formik';
import type { SectionFieldAnswer } from '../../app/routes/create-report';

type ReviewSectionProps = {
  selectedReview: string | null;
  setSelectedReview: (review: string | null) => void;
  answers: Record<string, SectionFieldAnswer>;
  onAnswerChange: (sectionFieldId: string, answer: SectionFieldAnswer) => void;
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
}: ReviewSectionProps) => {
  const { data: sectionFields, isLoading, isError } = useGetSectionsFields();

  const accordionItems = selectedReview
    ? sectionFields?.filter((field) => field.section.id === selectedReview) ||
      []
    : [];

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
                sectionFieldId: sectionField.id,
                isOkay: false,
                comments: '',
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
                            comments: checked ? '' : currentAnswer.comments,
                            image: checked ? null : currentAnswer.image,
                          });
                        }}
                        disabled={currentAnswer.isNotRelevant}
                      />
                    </div>
                    <Formik
                      initialValues={{
                        comments: currentAnswer.comments,
                        isNotRelevant: currentAnswer.isNotRelevant,
                        image: currentAnswer.image,
                      }}
                      enableReinitialize
                      onSubmit={async (values) => {
                        console.log(values);
                      }}
                    >
                      <Form>
                        <div>
                          <h5>Bemærkninger</h5>
                          <Field
                            as="textarea"
                            name="comments"
                            disabled={currentAnswer.isOkay}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => {
                              onAnswerChange(sectionField.id, {
                                ...currentAnswer,
                                comments: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <h5>Billede</h5>
                          <Field
                            type="file"
                            name="image"
                            disabled={
                              currentAnswer.isOkay ||
                              currentAnswer.isNotRelevant
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              const file = e.target.files?.[0] || null;
                              onAnswerChange(sectionField.id, {
                                ...currentAnswer,
                                image: file,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <h5>Skal ikke tjekkes</h5>
                          <Field
                            type="checkbox"
                            name="isNotRelevant"
                            disabled={
                              currentAnswer.isOkay ||
                              currentAnswer.isNotRelevant
                            }
                          />
                        </div>
                      </Form>
                    </Formik>
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
                          comments: checked ? '' : currentAnswer.comments,
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
