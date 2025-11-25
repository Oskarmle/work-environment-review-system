import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import styles from './review-section.module.css';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';

type ReviewSectionProps = {
  selectedReview: string | null;
  setSelectedReview: (review: string | null) => void;
  accordionItemProps?: AccordionItemProps[];
};

type AccordionPreFillProps = {
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

type AccordionItemProps = {
  preFill: AccordionPreFillProps;
  response: AccordionResponseProps;
};

const dummyAccordionItem: AccordionPreFillProps[] = [
  {
    whatToCheck: 'Porte',
    lawInspection: 'Ja.',
    internalControl: 'Nej.',
    howToCheck: 'Virker nødstop osv. Tjek datoen på mærkat',
    responsible:
      'Stationen står selv for service og små reperationer. Portene efterses af ekstern leverandør',
  },
  {
    whatToCheck: 'Rumudsugning',
    lawInspection: 'Ja.',
    internalControl: 'Nej.',
    howToCheck: 'Tjek datoen på mærkat',
    responsible:
      'Stationen står selv for service og små reperationer. Ventilationsanlæg efterses af ekstern leverandør',
  },
  {
    whatToCheck: 'Stiger',
    lawInspection: 'Ja.',
    internalControl: 'Ja.',
    howToCheck:
      'Alle stiger skal tjekkes af særligt uddannet. Tjek datoen på stigerne',
    responsible:
      '12m stiger bliver efterset af værksted og påsætter mærkat. Stationen kontrollere selv stigen er efter ved bytning af køretøj osv.',
  },
  {
    whatToCheck: 'El-værktøj',
    lawInspection: 'Ja.',
    internalControl: 'Ja.',
    howToCheck: 'Alt el-værktøj skal tjekkes af særligt uddannet.',
  },
];

const ReviewSection = ({
  selectedReview,
  setSelectedReview,
}: ReviewSectionProps) => {
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
            {dummyAccordionItem.map((prefill, idx) => (
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
