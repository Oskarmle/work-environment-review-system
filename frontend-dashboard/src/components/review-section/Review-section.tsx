import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import styles from './review-section.module.css';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useGetSectionsFields } from '../../hooks/useGetSectionFields';

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
                    borderRadius: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <h4>{sectionFields.whatToCheck}</h4>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'background.default',
                  }}
                >
                  <div className={styles['accordion-content-prefill']}>
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
