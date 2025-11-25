import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Button, Card, CardContent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import ReviewButton from '../../../components/review-button/Review-button';
import Line from '../../../components/line/Line';

export const Route = createFileRoute('/create-report/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Logo />
      <div className={styles.content}>
        <div className={styles['card-left']}>
          <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
            <CardContent>
              <CreateReview />
            </CardContent>
          </Card>
        </div>
        <div className={styles['card-right']}>
          <Card sx={{ bgcolor: 'primary.main', color: 'background.default' }}>
            <CardContent className={styles['card-right-content']}>
              <div className={styles['card-right-content']}>
                {/* FIXME: Set done condition dependent on filled out content */}
                <ReviewButton title="Bygning / inventar" done={false} />
                <ReviewButton title="Kontorarbejdspladser" done={false} />
                <ReviewButton title="Beredskab og førstehjælp" done={true} />
                <ReviewButton title="Kemikalier" done={false} />
                <ReviewButton
                  title="Udeområde, Brandgårde, Øvelsesareal"
                  done={false}
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
                      Du kan ikke uploade runderingen før alle dele er
                      gennemgået.
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
        </div>
      </div>
    </>
  );
}
