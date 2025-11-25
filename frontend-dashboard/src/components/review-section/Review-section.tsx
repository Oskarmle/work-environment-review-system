import { Button, Card, CardContent } from '@mui/material';
import styles from './review-section.module.css';

type ReviewSectionProps = {
  selectedReview: string | null;
  setSelectedReview: (review: string | null) => void;
};

const ReviewSection = ({ selectedReview, setSelectedReview }: ReviewSectionProps) => {
  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
      <CardContent>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSelectedReview(null)}
          sx={{ mb: 2 }}
        >
          Tilbage
        </Button>
        <h2>{selectedReview}</h2>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
