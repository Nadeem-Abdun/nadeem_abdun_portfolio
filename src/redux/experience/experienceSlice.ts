import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Experience {
  _id?: string;
  joiningDate?: string;
  relievingDate?: string;
  jobTitle?: string;
  organizationName?: string;
  responsibilities?: string[];
  skillsInvolved?: string[];
  experienceStatus?: string;
}

export interface ExperienceState {
  experiences?: Experience[];
  loading?: boolean;
  success?: boolean | null;
}

const initialState: ExperienceState = {
  experiences: [
    {
      _id: '',
      joiningDate: '2023-02-06',
      relievingDate: '2024-09-30',
      jobTitle:
        'Development Engineer Consultant for JPMorgan Chase (Asia-Pacific Region)',
      organizationName: 'Bluepal Solutions Pvt. Ltd.',
      responsibilities: [
        'Worked as a consultant on behalf of BluePal for JP Morgan Chase Bank, contributing to both consumer-facing and internal applications.',
        'Key projects:',
        '1. Story by J.P. Morgan: Collaborated with a team to develop a full-scale rent management application for consumers, implementing features and improving usability and performance.',
        '2. Line of Business: Contributed to the development of a streamlined bank-to-bank transactions platform within JP Morgan Chase, enhancing operational efficiency.',
        '3. Connected Archive: Worked as part of a team to build an error-tracking system, enabling admin users to resolve failed transactions and monitor and diagnose system errors efficiently.',
        'Collaborated with cross-functional teams across the Asia-Pacific region to deliver scalable solutions.',
      ],
      skillsInvolved: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Material UI',
        'Story Design System (SDS) UI',
        'React Testing Library',
        'Jest',
      ],
      experienceStatus: 'Active',
    },
    {
      _id: '',
      joiningDate: '2024-10-01',
      relievingDate: '2025-05-15',
      jobTitle: 'Frontend Developer Consultant for Kernex Microsystems',
      organizationName: 'Bluepal Solutions Pvt. Ltd.',
      responsibilities: [
        'Worked as a consultant frontend developer for Kernex Microsystems, building a locomotive tracking and route planning application that integrated real-time data from centralized Kavach railway safety systems for the Indian Railways.',
        'Designed and developed interactive, data-rich UI components for tracking, scheduling, and operational insights.',
      ],
      skillsInvolved: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Material UI',
        'React Flow',
        'React Testing Library',
        'Jest',
      ],
      experienceStatus: 'Active',
    },
    {
      _id: '',
      joiningDate: '2025-05-16',
      relievingDate: '',
      jobTitle: 'Frontend Engineer Consultant for ArangoDB',
      organizationName: 'Bluepal Solutions Pvt. Ltd.',
      responsibilities: [
        'Contributing to the development and improvement of the database UI layer and platform utilities.',
        'Building end-to-end test suites using Playwright across multiple applications, covering UI behavior, user flows, API integration, cross-browser compatibility, and identifying and resolving application vulnerabilities.',
      ],
      skillsInvolved: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Chakra UI',
        'Cytoscape',
        'TanStack',
        'Playwright',
        'Formik',
        'Zustand',
        'Vite',
        'Vitest',
      ],
      experienceStatus: 'Active',
    },
  ],
  loading: false,
  success: null,
};

export const experienceSlice = createSlice({
  name: 'Experience',
  initialState,
  reducers: {
    loadData: () => {},
    // Create Experience Actions
    submitCreateExperienceForm: state => {
      state.loading = true;
      state.success = null;
    },
    createExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
      state.loading = false;
      state.success = true;
      if (state.experiences) {
        const existingIndex = state.experiences.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.experiences[existingIndex] = action.payload;
        } else {
          state.experiences.push(action.payload);
        }
      }
    },
    createExperienceFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetCreateExperienceForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Get Experience Actions
    submitGetExperienceForm: state => {
      state.loading = true;
      state.success = null;
    },
    getExperienceFormSuccess: (state, action: PayloadAction<Experience[]>) => {
      state.loading = false;
      state.success = true;
      state.experiences = action.payload;
    },
    getExperienceFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetGetExperienceForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Update Experience Actions
    submitUpdateExperienceForm: state => {
      state.loading = true;
      state.success = null;
    },
    updateExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
      state.loading = false;
      state.success = true;
      if (state.experiences) {
        const existingIndex = state.experiences.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.experiences[existingIndex] = action.payload;
        } else {
          state.experiences.push(action.payload);
        }
      }
    },
    updateExperienceFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetUpdateExperienceForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Delete Experience Actions
    submitDeleteExperienceForm: state => {
      state.loading = true;
      state.success = null;
    },
    deleteExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
      state.loading = false;
      state.success = true;
      if (state.experiences) {
        const existingIndex = state.experiences.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.experiences.splice(existingIndex, 1);
        }
      }
    },
    deleteExperienceFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetDeleteExperienceForm: state => {
      state.loading = false;
      state.success = null;
    },
  },
});

// Generating actions against each reducer function
export const {
  loadData,
  submitCreateExperienceForm,
  createExperienceFormSuccess,
  createExperienceFormFailure,
  resetCreateExperienceForm,
  submitGetExperienceForm,
  getExperienceFormSuccess,
  getExperienceFormFailure,
  resetGetExperienceForm,
  submitUpdateExperienceForm,
  updateExperienceFormSuccess,
  updateExperienceFormFailure,
  resetUpdateExperienceForm,
  submitDeleteExperienceForm,
  deleteExperienceFormSuccess,
  deleteExperienceFormFailure,
  resetDeleteExperienceForm,
} = experienceSlice.actions;

export default experienceSlice.reducer;
