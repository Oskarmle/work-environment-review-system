import { createFileRoute } from '@tanstack/react-router';
import Logo from '../../../components/logo/Logo';
import { Card, CardContent } from '@mui/material';
import CreateReview from '../../../components/create-review/Create-review';
import styles from './create-report.module.css';
import ReviewButton from '../../../components/review-button/Review-button';

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
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
