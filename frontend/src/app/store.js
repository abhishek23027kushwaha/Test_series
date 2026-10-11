import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import questionReducer from '../features/questions/questionSlice';
import subjectReducer from '../features/subjects/subjectSlice';
import mockTestReducer from '../features/mocktest/mockTestSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    questions: questionReducer,
    subjects: subjectReducer,
    mockTest: mockTestReducer,
    profile: profileReducer,
  },
});
