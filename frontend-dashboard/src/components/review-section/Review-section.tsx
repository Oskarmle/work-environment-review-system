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
import { useState } from 'react';

type ReviewSectionProps = {
  selectedReview: string | null;
  setSelectedReview: (review: string | null) => void;
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
}: ReviewSectionProps) => {
  const [isOkay, setIsOkay] = useState(false);
  const [isRelevant, setIsRelevant] = useState(false);

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
            {accordionItems.map((sectionFields, idx) => (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`panel-${idx}-content`}
                  id={`panel-${idx}-header`}
                  sx={{
                    backgroundColor: 'background.default',
                  }}
                >
                  <h4>{sectionFields.whatToCheck}</h4>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'background.default',
                  }}
                >
                  <div className={styles['section-fields']}>
                    <div>
                      <h5>Lovpligtig eftersyn</h5>
                      <p>{sectionFields.lawInspection ? 'Ja.' : 'Nej.'}</p>
                    </div>
                    <div>
                      <h5>Intern kontrol</h5>
                      <p>{sectionFields.internalControl ? 'Ja.' : 'Nej.'}</p>
                    </div>
                    <div>
                      <h5>Hvordan/hvor tjekkes? (Mærkat/mappe)</h5>
                      <p>{sectionFields.howToCheck}</p>
                    </div>
                    <div>
                      <h5>Ansvar</h5>
                      <p>{sectionFields.responsibility}</p>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Alt er okay"
                      labelPlacement="start"
                      className={styles.checkbox}
                      checked={isOkay}
                      onChange={(_, checked) => setIsOkay(checked)}
                      disabled={isRelevant}
                    />
                  </div>
                  <Formik
                    initialValues={{
                      comments: '',
                      isRelevant: false,
                      image: null,
                    }}
                    onSubmit={async (values) => {
                      console.log(values);
                    }}
                  >
                    {/* FIXME: save all data to db, and add saving feature */}
                    <Form>
                      <div>
                        <h5>Bemærkninger</h5>
                        <Field
                          as="textarea"
                          name="comments"
                          disabled={isOkay}
                        />
                      </div>
                      <div>
                        <h5>Billede</h5>
                        <Field
                          type="file"
                          name="image"
                          disabled={isOkay || isRelevant}
                        />
                      </div>
                      <div>
                        <h5>Skal ikke tjekkes</h5>
                        <Field
                          type="checkbox"
                          name="isRelevant"
                          disabled={isOkay || isRelevant}
                        />
                      </div>
                    </Form>
                  </Formik>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Skal ikke tjekkes"
                    labelPlacement="start"
                    className={styles.checkbox}
                    checked={isRelevant}
                    onChange={(_, checked) => setIsRelevant(checked)}
                    disabled={isOkay}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
