import styles from './review-button.module.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Checkbox, FormControlLabel } from '@mui/material';

type ReviewButtonProps = {
  title: string;
  onClick?: () => void;
  isNotRelevant: boolean;
  onRelevantChange: (isNotRelevant: boolean) => void;
};

const ReviewButton = ({ title, onClick, isNotRelevant, onRelevantChange }: ReviewButtonProps) => {
  return (
    <div className={styles.reviewButton}>
      <div className={styles.intro} onClick={onClick}>
        <h4>{title}</h4>
        {!isNotRelevant ? (
          <CancelOutlinedIcon color="error" />
        ) : (
          <CheckCircleOutlineOutlinedIcon color="success" />
        )}
      </div>
      <div className={styles.relevance}>
        <FormControlLabel
          control={<Checkbox />}
          label="Ikke relevant at gennemgå"
          labelPlacement="start"
          className={styles.checkbox}
          checked={isNotRelevant}
          onChange={(_, checked) => onRelevantChange(checked)}
        />
      </div>
    </div>
  );
};

export default ReviewButton;
