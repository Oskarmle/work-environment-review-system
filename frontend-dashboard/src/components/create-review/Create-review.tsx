import styles from './create-review.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateReview = () => {
  return (
    <div className={styles.createReview}>
      <div>
        <h3>Ny arbejdsmiljørundering</h3>
        {/* FIXME: Add station based on user data from db */}
        <p>Station Dragør</p>
      </div>
      <div className={styles.addDateAndUser}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Vælg dato" />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default CreateReview;
