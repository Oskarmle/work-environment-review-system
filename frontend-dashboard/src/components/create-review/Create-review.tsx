import styles from './create-review.module.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type { User } from '../../types/user';

const users: User[] = [
  {
    id: 'd352e8b2-5c6d-4f01-8346-fd8429f5bdce',
    firstName: 'Omar',
    lastName: 'Lee',
    email: 'omar.lee@example.com',
    roleId: 'role-1234',
    stationId: 'station-5678',
  },
  {
    id: 'a123b456-c789-0def-1234-56789abcdef0',
    firstName: 'Anna',
    lastName: 'Hansen',
    email: 'anna.hansen@example.com',
    roleId: 'role-2345',
    stationId: 'station-6789',
  },
  {
    id: 'b234c567-d890-1ef2-3456-789abcdef012',
    firstName: 'Peter',
    lastName: 'Jensen',
    email: 'peter.jensen@example.com',
    roleId: 'role-3456',
    stationId: 'station-7890',
  },
  {
    id: 'c345d678-e901-2f34-5678-90abcdef1234',
    firstName: 'Mette',
    lastName: 'Nielsen',
    email: 'mette.nielsen@example.com',
    roleId: 'role-4567',
    stationId: 'station-8901',
  },
];

const CreateReview = () => {
  const [user, setUser] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof user>) => {
    const {
      target: { value },
    } = event;
    setUser(typeof value === 'string' ? value.split(',') : value);
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
          <DatePicker label="Vælg dato" />
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
            // MenuProps={MenuProps}
          >
            {users.map((u) => (
              <MenuItem key={u.id} value={u.firstName + ' ' + u.lastName}>
                <Checkbox checked={user.includes(u.firstName + ' ' + u.lastName)} />
                <ListItemText primary={u.firstName + ' ' + u.lastName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CreateReview;
