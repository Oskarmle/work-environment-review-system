import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SerializableReportResponse } from '../../types/report-response';

interface ReviewFormState {
  sectionFieldAnswers: Record<string, SerializableReportResponse>;
}

const initialState: ReviewFormState = {
  sectionFieldAnswers: {},
};

export const reviewFormSlice = createSlice({
  name: 'reviewForm',
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{
        sectionFieldId: string;
        answer: SerializableReportResponse;
      }>,
    ) => {
      const { sectionFieldId, answer } = action.payload;
      state.sectionFieldAnswers[sectionFieldId] = answer;
    },
    setMultipleAnswers: (
      state,
      action: PayloadAction<Record<string, SerializableReportResponse>>,
    ) => {
      state.sectionFieldAnswers = {
        ...state.sectionFieldAnswers,
        ...action.payload,
      };
    },
    removeAnswer: (state, action: PayloadAction<string>) => {
      delete state.sectionFieldAnswers[action.payload];
    },
    removeMultipleAnswers: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((fieldId) => {
        delete state.sectionFieldAnswers[fieldId];
      });
    },
    resetAnswers: (state) => {
      state.sectionFieldAnswers = {};
    },
    bulkUpdateSectionFields: (
      state,
      action: PayloadAction<{
        fieldIds: string[];
        updates: Partial<SerializableReportResponse>;
      }>,
    ) => {
      const { fieldIds, updates } = action.payload;
      fieldIds.forEach((fieldId) => {
        if (state.sectionFieldAnswers[fieldId]) {
          state.sectionFieldAnswers[fieldId] = {
            ...state.sectionFieldAnswers[fieldId],
            ...updates,
          };
        }
      });
    },
  },
});

export const {
  setAnswer,
  setMultipleAnswers,
  removeAnswer,
  removeMultipleAnswers,
  resetAnswers,
  bulkUpdateSectionFields,
} = reviewFormSlice.actions;

export default reviewFormSlice.reducer;
