import styles from './create-review.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
  type SelectChangeEvent,
} from '@mui/material';
import CustomCard from '../custom-card/Custom-card';
import { useGetAllInitialChecks } from '../../hooks/useGetInitialChecks';
import type { InitialCheck } from '../../types/initial-check';
import { useGetActiveFocusArea } from '../../hooks/useGetFocusArea';
import { useGetUsers } from '../../hooks/useGetUsers';
import type { Dayjs } from 'dayjs';

type CreateReviewProps = {
  handleBeginReview: () => void;
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
  user: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  initialChecks: Record<string, boolean>;
  setInitialChecks: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  focusAreaChecked: boolean;
  setFocusAreaChecked: (value: boolean) => void;
  comment: string;
  setComment: (value: string) => void;
};

const CreateReview = ({
  handleBeginReview,
  date,
  setDate,
  user,
  handleChange,
  initialChecks,
  setInitialChecks,
  focusAreaChecked,
  setFocusAreaChecked,
  comment,
  setComment,
}: CreateReviewProps) => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsers();

  const {
    data: initialChecksData,
    isLoading: initialChecksLoading,
    isError: initialChecksError,
  } = useGetAllInitialChecks();

  const {
    data: focusAreaData,
    isLoading: focusAreaLoading,
    isError: focusAreaError,
  } = useGetActiveFocusArea();

  return (
    <div className={styles.createReview}>
      <div>
        <h3>Ny arbejdsmiljørundering</h3>
        {/* FIXME: Add station based on user data from db */}
        <p>Station Dragør</p>
      </div>
      <div className={styles.addDateAndUser}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Vælg dato" value={date} onChange={setDate} />
        </LocalizationProvider>
        <FormControl>
          <InputLabel>Vælg deltagere</InputLabel>
          <Select
            labelId="select-users-label"
            id="select-users"
            multiple
            value={user}
            onChange={handleChange}
            input={<OutlinedInput label="Vælg deltagere" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {usersLoading && <MenuItem disabled>Loading...</MenuItem>}
            {usersError && <MenuItem disabled>Error loading users</MenuItem>}
            {users?.map((u) => (
              <MenuItem key={u.id} value={u.firstName + ' ' + u.lastName}>
                <Checkbox
                  checked={user.includes(u.firstName + ' ' + u.lastName)}
                />
                <ListItemText primary={u.firstName + ' ' + u.lastName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <CustomCard title="Indledningsvist: Tjek af egenindsatsen">
        <FormGroup className={styles.initialChecks}>
          {/* FIXME: Add better error handling and error components */}
          {initialChecksLoading && <p>Loading...</p>}
          {initialChecksError && <p>Error loading checks</p>}
          {initialChecksData?.map((check: InitialCheck) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={initialChecks[check.id] || false}
                  onChange={(e) =>
                    setInitialChecks((prev) => ({
                      ...prev,
                      [check.id]: e.target.checked,
                    }))
                  }
                />
              }
              key={check.id}
              label={check.checkName}
              labelPlacement="start"
              className={styles.checkbox}
            />
          ))}
        </FormGroup>
      </CustomCard>
      <CustomCard title={'Fokus ' + (focusAreaData?.year || '')}>
        <FormGroup className={styles.initialChecks}>
          {focusAreaLoading && <p>Loading...</p>}
          {focusAreaError && <p>Error loading focus area</p>}
          {focusAreaData && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={focusAreaChecked}
                  onChange={(e) => setFocusAreaChecked(e.target.checked)}
                />
              }
              label={focusAreaData.title}
              labelPlacement="start"
              className={styles.checkbox}
            />
          )}
        </FormGroup>
      </CustomCard>
      <TextareaAutosize
        minRows={4}
        placeholder="Evt. bemærkninger til runderingen"
        className={styles.textarea}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={handleBeginReview}
      >
        Begynd rundering
      </Button>
    </div>
  );
};

export default CreateReview;
