import { configureStore } from '@reduxjs/toolkit';
import reviewFormReducer from '../features/reviewFormSlice';

export const store = configureStore({
  reducer: {
    reviewForm: reviewFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
