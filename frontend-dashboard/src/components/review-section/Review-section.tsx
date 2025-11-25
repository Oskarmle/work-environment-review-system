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
import { reviewSectionData } from '../../utils/mock-data';

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

type AccordionResponseProps = {
  comment?: string | null;
  image?: File[] | null;
  isCompleted: boolean;
  isRelevant?: boolean;
  isOkay?: boolean;
};

const ReviewSection = ({
  selectedReview,
  setSelectedReview,
}: ReviewSectionProps) => {
  const accordionItems = selectedReview
    ? reviewSectionData[selectedReview] || []
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
          <h3>{selectedReview}</h3>
          <div className={styles.accordions}>
            {accordionItems.map((prefill, idx) => (
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
                  <h4>{prefill.whatToCheck}</h4>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'background.default',
                  }}
                >
                  <div className={styles['accordion-content-prefill']}>
                    <div>
                      <h5>Lovpligtig eftersyn</h5>
                      <p>{prefill.lawInspection}</p>
                    </div>
                    <div>
                      <h5>Intern kontrol</h5>
                      <p>{prefill.internalControl}</p>
                    </div>
                    <div>
                      <h5>Hvordan/hvor tjekkes? (Mærkat/mappe)</h5>
                      <p>{prefill.howToCheck}</p>
                    </div>
                    <div>
                      <h5>Ansvar</h5>
                      <p>{prefill.responsible}</p>
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
