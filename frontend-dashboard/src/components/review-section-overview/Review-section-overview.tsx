import { Button, Card, CardContent } from '@mui/material';
import ReviewButton from '../review-button/Review-button';
import Line from '../line/Line';
import styles from './review-section-overview.module.css';

type ReviewSectionOverviewProps = {
  onReviewClick: (title: string) => void;
};

const ReviewSectionOverview = ({
  onReviewClick,
}: ReviewSectionOverviewProps) => {
  return (
    <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
      <CardContent className={styles['card-right-content']}>
        <div className={styles['card-right-content']}>
          {/* FIXME: Set done condition dependent on filled out content */}
          <ReviewButton
            title="Bygning / inventar"
            done={false}
            onClick={() => onReviewClick('Bygning / inventar')}
          />
          <ReviewButton
            title="Kontorarbejdspladser"
            done={false}
            onClick={() => onReviewClick('Kontorarbejdspladser')}
          />
          <ReviewButton
            title="Beredskab og førstehjælp"
            done={true}
            onClick={() => onReviewClick('Beredskab og førstehjælp')}
          />
          <ReviewButton
            title="Kemikalier"
            done={false}
            onClick={() => onReviewClick('Kemikalier')}
          />
          <ReviewButton
            title="Udeområde, Brandgårde, Øvelsesareal"
            done={false}
            onClick={() =>
              onReviewClick('Udeområde, Brandgårde, Øvelsesareal')
            }
          />
        </div>
        <Line />
        <div className={styles['card-right-button-group']}>
          {/* FIXME: Add logic to buttons */}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={styles.button}
          >
            Upload rundering
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            className={styles.button}
          >
            Gem og fortsæt senere
          </Button>
        </div>
        <Card
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
          }}
        >
          <CardContent>
            <div>
              <h4>
                Du kan ikke uploade runderingen før alle dele er gennemgået.
              </h4>
              <h4>Du mangler stadig at gennemgå</h4>
            </div>
            {/* FIXME: Set the list items dynamically based on review status for each part */}
            <ul className={styles['card-right-warning-list']}>
              <li>Bygning / inventar</li>
              <li>Kontorarbejdspladser</li>
              <li>Kemikalier</li>
              <li>Udeområde, Brandgårde, Øvelsesareal</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ReviewSectionOverview;
