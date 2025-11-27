import styles from './create-review.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
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
import type { CreateReport } from '../../types/report';
import type { InitialCheck } from '../../types/initial-check';
import { useGetActiveFocusArea } from '../../hooks/useGetFocusArea';
import { useGetUsers } from '../../hooks/useGetUsers';
import type { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const CreateReview = () => {
  const [user, setUser] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [initialChecks, setInitialChecks] = useState<Record<string, boolean>>(
    {},
  );
  const [focusAreaChecked, setFocusAreaChecked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsers();

  const handleChange = (event: SelectChangeEvent<typeof user>) => {
    const {
      target: { value },
    } = event;
    setUser(typeof value === 'string' ? value.split(',') : value);
  };

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

  const API_URL = import.meta.env.VITE_API_URL;

  const mutation = useMutation({
    mutationFn: async (reportData: CreateReport) => {
      const response = await axios.post(`${API_URL}/report`, reportData);

      return response.data;
    },
    onSuccess: () => {
      console.log('Report created successfully');
      setDate(null);
      setUser([]);
      setInitialChecks({});
      setFocusAreaChecked(false);
      setComment('');
      alert('Rundering startet!');
    },
  });

  const handleBeginReview = () => {
    if (!date || !focusAreaData || !focusAreaChecked || !initialChecks) {
      console.error('Missing required fields');
      return;
    }

    // FIXME: Replace with actual user and station IDs from user data
    const userId = '4dd4691c-d882-4830-8573-d812c29dae43';
    const stationId = '3a83fd64-c801-47a3-b0b3-fbb3d9240a13';

    const reportData = {
      isCompleted: false,
      focusAreaId: focusAreaData.id,
      stationId: stationId,
      comment: comment,
      reportBeganAt: date.format('YYYY-MM-DD'),
      userId: userId,
    };

    mutation.mutate(reportData);
  };

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
