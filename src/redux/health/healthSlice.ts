import { createSlice } from '@reduxjs/toolkit';

export interface HealthState {
  serverHealthy?: boolean;
  loading?: boolean;
  success?: boolean | null;
}

const initialState: HealthState = {
  serverHealthy: false,
  loading: false,
  success: null,
};

export const healthSlice = createSlice({
  name: 'Health',
  initialState,
  reducers: {
    submitCheckServerHealth: state => {
      state.loading = true;
      state.success = null;
      state.serverHealthy = false;
    },
    checkServerHealthSuccess: state => {
      state.loading = false;
      state.success = true;
      state.serverHealthy = true;
    },
    checkServerHealthFailure: state => {
      state.loading = false;
      state.success = false;
      state.serverHealthy = false;
    },
    resetCheckServerHealth: state => {
      state.loading = false;
      state.success = null;
      state.serverHealthy = false;
    },
  },
});

export const {
  submitCheckServerHealth,
  checkServerHealthSuccess,
  checkServerHealthFailure,
  resetCheckServerHealth,
} = healthSlice.actions;
export default healthSlice.reducer;
